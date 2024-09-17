import { Alert, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import DefaultModal from './DefaultModal'
import { ThemedButton, ThemedInput, ThemedText, ThemedView } from '../ui'
import Colors from '@/constants/Colors'
import { useAppState } from '@/app/zus/store'
import { LogoutSchema } from '@/app/schema/dashboard.schema';
import { useLogOut } from '@/app/services/mutations'
import { useRehydrateEncryptedStorageData } from '@/app/hooks/useRehydrateEncryptedStorageData'

const LogoutModal = () => {
 const [isVisible, setVisible] = useState<boolean>(true);
 const [pinValue, setPinValue] = useState<string>("");
 const showLogOutModal = useAppState((state) => state.toggleLogoutModal);
 // const handleLogout = useAppState((state) => state.logOutUser);
 const { logOutUser: handleLogout } = useRehydrateEncryptedStorageData();
 const [errors, setErrors] = useState<{ pin?: string }>({});

 const { mutate: logOutUser, isSuccess, isPending, data } = useLogOut()

 const handleClick = async () => {
  const validated = await validateForm();
  if (!validated) return null
  //submit form to api
  logOutUser({ pin: validated.pin })
 }

 useEffect(() => {
  if (isSuccess && data) {
   const { status, } = data;
   if (status) {
    handleLogout();
    return;
   }
  }
  if (data && !data.status && data.message) {
   Alert.alert("Error in Pin provided", data.message)
  }
 }, [isSuccess])


 const validateForm = async (): Promise<null | { pin: string }> => {
  try {
   const res = await LogoutSchema.validate({ pin: pinValue });
   return res;
  } catch (error) {
   if (error instanceof Yup.ValidationError) {
    if (error.message.toLocaleLowerCase().includes('pin')) {
     setErrors({ pin: error.message.toLocaleLowerCase() });
    }
   }
  }
  return null;
 };

 const handleClose = () => {
  showLogOutModal();
  setVisible(false)
 }
 return (
  <>
   {
    isVisible ? (
     <DefaultModal style={{ width: '90%' }} onClose={handleClose} visible={isVisible}>
      <ThemedView noPadding transparent>
       <ThemedText style={styles.heading} size={20} family='bold'
        textContainerStyle={{ width: '100%' }}>
        Logout  your account
       </ThemedText>
       <ThemedText style={styles.subHeeading} size={14} family='regular'
        textContainerStyle={{ width: '100%', marginVertical: 10 }}>
        Enter pin to logout the account
       </ThemedText>
      </ThemedView>
      <ThemedView transparent>
       <ThemedInput
        value={pinValue}
        onChangeText={(pin) => {
         if (errors.pin) {
          setErrors({ pin: '' })
         }
         setPinValue(pin)
        }}
        error={errors.pin}
        keyboardType='numeric'
        keyboardAppearance='default'
        transparent label="Pin" secureTextEntry name='pin' placeholder='Enter authorized pin' />
       <View style={styles.actionCont}>
        <ThemedButton
         title='Cancel'
         textStyle={{ color: Colors.light.secondary }}
         style={styles.cancel}
         containerStyle={[styles.btn, styles.cancel]}
         handleClick={handleClose} />

        <ThemedButton isLoading={isPending} disabled={pinValue?.length == 0 || isPending} style={[{ backgroundColor: 'red' }]} containerStyle={styles.btn} title='Log out' handleClick={handleClick} />
       </View>

      </ThemedView>
     </DefaultModal>
    ) : null
   }
  </>

 )
}


export default LogoutModal

const styles = StyleSheet.create({
 heading: {
  textAlign: 'center',
  lineHeight: 30
 },
 subHeeading: {
  lineHeight: 20,
  textAlign: 'center',
 },
 actionCont: {
  width: '100%',
  flexDirection: 'row',
  height: 56,
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 5,
 },
 btn: {
  width: '40%'
 },
 cancel: {
  backgroundColor: 'transparent',
  color: 'red'
 }

})