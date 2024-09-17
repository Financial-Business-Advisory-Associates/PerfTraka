import * as SecureStore from 'expo-secure-store';
import { AesUtils } from '../utils/crypto-utils';
import { useAppState } from '../zus/store';

interface EncryptedStorage {
  getItemAsync: () => Promise<string | null>;
  setItemAsync: (value: string) => Promise<void>;
  removeItemAsync: () => Promise<void>;
}

export function useEncryptedAsyncStorage(
  key: string,
  useEncryption = false
): EncryptedStorage {
  const getItemAsync = async (): Promise<string | null> => {
    try {
      let aesKey: string | null = null;

      if (useEncryption) {
        aesKey = await SecureStore.getItemAsync(key);
        if (!aesKey) return null;
      }

      const encryptedData = await SecureStore.getItemAsync('encrypted_' + key);
      if (!encryptedData) return null;

      // Decrypt only if useEncryption is true and aesKey is available
      return useEncryption && aesKey
        ? await AesUtils.decrypt(encryptedData, aesKey)
        : encryptedData;
    } catch (error) {
      console.error('Error while getting encrypted item:', error);
      throw new Error('Failed to get encrypted item');
    }
  };

  const setItemAsync = async (value: string): Promise<void> => {
    try {
      let aesKey: string = '';
      if (useEncryption) {
        aesKey = (await SecureStore.getItemAsync(key)) || '';
      }

      if (aesKey) {
        const { encryptionKey, encryptedData } = useEncryption
          ? await AesUtils.encryptWithKey(value, aesKey)
          : await AesUtils.encryptWithRandomKey(value);
        await Promise.all([
          SecureStore.setItemAsync('encrypted_' + key, encryptedData),
          SecureStore.setItemAsync(key, encryptionKey),
        ]);
      } else {
        await Promise.all([
          SecureStore.setItemAsync('encrypted_' + key, value),
          Promise.resolve(),
        ]);
      }
    } catch (error) {
      console.error('Error while setting encrypted item:', error);
      throw new Error('Failed to set encrypted item');
    }
  };

  const removeItemAsync = async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync('encrypted_' + key),
        useEncryption ? SecureStore.deleteItemAsync(key) : Promise.resolve(),
      ]);
    } catch (error) {
      console.error('Error while removing encrypted item:', error);
      throw new Error('Failed to remove encrypted item');
    }
  };

  return {
    getItemAsync,
    setItemAsync,
    removeItemAsync,
  };
}
export async function clearStorageAsync(key: string) {
  // const encryptedDatas = await SecureStore.getItemAsync('encrypted_' + key);
  // console.log({ encryptedDatas });
  useAppState.getState().setToken('');

  await SecureStore.deleteItemAsync('encrypted_' + key);
}
