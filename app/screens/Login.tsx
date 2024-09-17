import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaContainer } from '@/components/Containers'
import { Text, View } from '@/components/Themed'
import { ThemedButton, ThemedInput, ThemedText, ThemedView } from '@/components/ui'
import { DefaultLogo } from '@/components/Logo'

import { AuthenticateSchema, AuthenticateType } from '../schema/login.schema'
import * as Yup from 'yup';
import { useAuthenticationMutation } from '../services/mutations'
import { useAppState } from '../zus/store'
import { useRehydrateEncryptedStorageData } from '../hooks/useRehydrateEncryptedStorageData'


const Login = () => {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const emailRef = useRef(null)
 const passRef = useRef(null)
 const [errors, setErrors] = useState<AuthenticateType>({});

 // const loginUser = useAppState((state) => state.loginUser);

 const { loginUser } = useRehydrateEncryptedStorageData();

 const { mutate: handleLogin, isSuccess, data, isError, error, isPending } = useAuthenticationMutation();
 // console.log({ error, data, isError, isSuccess });

 useEffect(() => {
  if (isSuccess) {
   // console.log(data);

   if (data?.status) {
    const { token, user } = data.data
    loginUser(user, token)
   } else {
    Alert.alert('Error:', data?.message)
   }

   // login to dashboard and save user data
   // setUser(data.data.user);
  }
 }, [isSuccess]);




 const handleClick = async () => {
  const validated = await validateForm();
  if (!validated) return null
  //submit form to api
  handleLogin({ email, password })
 }

 const validateForm = async (): Promise<null | AuthenticateType> => {
  try {
   const res = await AuthenticateSchema.validate({ email, password });
   return res;
  } catch (error) {
   if (error instanceof Yup.ValidationError) {
    if (error.message.toLocaleLowerCase().includes('email')) {
     setErrors({ email: error.message.toLocaleLowerCase() });
    } else {
     setErrors({ password: error.message.toLocaleLowerCase() });
    }
   }
  }
  return null;
 };

 const disabled = !(email && password) || Object.values(errors).filter((x) => x).length > 0;

 return (
  <SafeAreaContainer>
   <KeyboardAvoidingView
    behavior='padding'
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    style={styles.container}>
    <ThemedView style={styles.top}>
     <View style={styles.logo}>
      <DefaultLogo />
     </View>
     <View>
      <ThemedText textContainerStyle={{ marginVertical: 5 }} style={{ padding: 5, textAlign: 'center', lineHeight: 30 }} family='bold' size={20}  >Log in to your account</ThemedText>
      <ThemedText style={{ lineHeight: 20, textAlign: 'center' }} family='regular' size={12}>Welcome back! Please enter your details.</ThemedText>
     </View>
    </ThemedView>
    <ThemedView style={styles.bottom}>

     <ThemedInput
      ref={emailRef}
      noPadding
      onBlur={validateForm}
      error={errors?.email}
      onChangeText={(email) => {
       if (errors.email) {
        setErrors({ email: '' })
       }
       setEmail(email)
      }}
      containerStyle={{ marginBottom: 10 }}
      label='Email'
      placeholder="Enter your email"
      name='email'

     />
     <ThemedInput
      noPadding
      onBlur={validateForm}
      ref={passRef}
      value={password}
      error={errors?.password}
      onChangeText={(password) => {
       if (errors.password) {
        setErrors({ password: '' })
       }
       setPassword(password)

      }}
      containerStyle={{ marginBottom: 10 }}
      label='Password' placeholder="Enter your password"
      name='password'
      secureTextEntry

     />


     <ThemedView noPadding style={{ marginTop: 10 }}>
      <ThemedButton disabled={disabled} size={16} title='Login' handleClick={() => handleClick()} />
      {/* <ThemedButton disabled={email.length && password.length ? false : true} size={16} title='Login' handleClick={() => handleClick()} /> */}
     </ThemedView>
    </ThemedView>

   </KeyboardAvoidingView>

  </SafeAreaContainer >
 )
}

export default Login

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  // justifyContent: 'center',
 },
 top: {
  paddingVertical: 50
 },
 bottom: {
  marginVertical: 40
 },
 logo: {
  // paddingHorizontal: 20, 
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
 }
})