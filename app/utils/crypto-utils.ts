import CryptoJS from 'crypto-js';
import * as ExpoCrypto from 'expo-crypto';

const generateKey = async (length: number): Promise<string> => {
  try {
    const byteArray = new Uint8Array(length);
    ExpoCrypto.getRandomValues(byteArray);

    return CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create(byteArray));
  } catch (error) {
    console.error('Error generating random key:', error);
    throw new Error('Failed to generate random key');
  }
};

const encryptWithKey = async (
  data: string,
  encryptionKey: string
): Promise<{ encryptionKey: string; encryptedData: string }> => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
    // console.log({ encryptedData });

    return { encryptionKey, encryptedData };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
};

const encryptWithRandomKey = async (
  data: string
): Promise<{ encryptionKey: string; encryptedData: string }> => {
  try {
    const encryptionKey = await generateKey(16);
    const encrypted = await encryptWithKey(data, encryptionKey);

    return encrypted;
  } catch (error) {
    console.error('my Encryption error:', error);
    throw new Error('Encryption failed');
  }
};

const decrypt = async (data: string, key: string): Promise<string> => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, key);
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
};

export const AesUtils = {
  encryptWithKey,
  encryptWithRandomKey,
  decrypt,
};
