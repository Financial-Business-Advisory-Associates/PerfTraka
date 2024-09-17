import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedButton, ThemedInput, ThemedText, ThemedView } from '@/components/ui';
import { useThemeColor } from '@/components/Themed';
import { UiDefaults } from '@/constants/UiDefaults';
import Colors from '@/constants/Colors';

import { DashboardParamList, DashboardScreenProps } from '@/app/navigations/types-interfaces/dashboard';
import { AddGuardSchema, AddGuardSchemaType } from '@/app/schema/dashboard.schema';

import * as Yup from "yup"
import { usePostSecurityGuard } from '@/app/services/mutations';
import PictureZone from '@/modules/CameraZone';

const AddSecurityGuard = ({ navigation }: DashboardScreenProps<"AddGuard">) => {
 const [imageUrl, setImage] = useState<string>("");
 const [firstName, setFirstName] = useState<string>("");
 const [lastName, setLastName] = useState<string>("");
 const [errors, setErrors] = useState<AddGuardSchemaType>({});

 // console.log("history:", navigation.getState()?.routeNames);

 const { mutate: postNewGuard, data, isSuccess, error } = usePostSecurityGuard()

 const textColor = useThemeColor({}, "black300");

 const disabled = !(firstName && lastName && imageUrl) || Object.values(errors).filter((x) => x).length > 0;


 /**
  * used to handle submission
  * @returns 
  */
 const handleSubmission = async () => {
  const validated = await validateForm();
  if (!validated) return null
  //submit form to api
  const formData = new FormData();
  formData.append("photo", {
   uri: imageUrl,
   name: `${firstName}${lastName}.jpg`,
   type: 'image/jpeg',
  } as any);
  formData.append("first_name", firstName)
  formData.append("last_name", lastName)
  postNewGuard(formData)
 }
 // console.log(data);

 /**
  * used for form validation on blur and click events
  * @returns 
  */
 const validateForm = async (): Promise<null | AddGuardSchemaType> => {
  try {
   const res = await AddGuardSchema.validate({ firstName, lastName });
   return res;
  } catch (error) {
   if (error instanceof Yup.ValidationError) {
    if (error.message.toLocaleLowerCase().includes('first')) {
     setErrors({ firstName: error.message.toLocaleLowerCase() });
    }
    else {
     setErrors({ lastName: error.message.toLocaleLowerCase() });
    }
   }
  }
  return null;
 };


 /**
  * handle image capture from camera
  * 
  * @param url the url of the captured image
  */
 const handleImageCapture = (url: string) => {
  setImage(url)
 }


 useEffect(() => {

  if (isSuccess && data?.status) {
   // handle success for offline 
   // navigate to success page
   const routes = navigation.getState()?.routes;
   const previousRoute = routes[routes.length - 2];
   navigation.navigate("Success", { activeScreen: "AddGuard", data: { location: previousRoute['name'] } })
  }
 }, [isSuccess, error])
 return (
  <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
   <ThemedView style={styles.container}>
    <ThemedText style={styles.title} family='medium' size={24}>Add Personnel</ThemedText>
    <ThemedText style={[styles.subtitle, { color: textColor }]} family='regular' size={14}>
     Fill in the below information to add a new security guard
    </ThemedText>

    <ThemedView transparent noPadding style={styles.formContainer}>
     <ThemedInput
      noPadding transparent label='First Name' name='first_name'
      value={firstName}
      style={styles.input}
      onBlur={validateForm}
      error={errors.firstName}
      onChangeText={(fName) => {
       if (errors.firstName) {
        setErrors({ firstName: '' })
       }
       setFirstName(fName)
      }} />

     <ThemedInput
      containerStyle={{ marginTop: 10 }} noPadding transparent
      value={lastName}
      error={errors.lastName}
      onBlur={validateForm}
      onChangeText={(lName) => {
       if (errors.lastName) {
        setErrors({ lastName: '' })
       }
       setLastName(lName)

      }}
      label='Last Name' name='last_name' style={[styles.input]} />

     <PictureZone imageUrl={imageUrl} handleImageCapture={(value) => handleImageCapture(value)} />

     <ThemedButton
      containerStyle={styles.addButton}
      disabled={disabled}
      title='Add'
      handleClick={handleSubmission}
     />
    </ThemedView>

   </ThemedView>
  </ScrollView>
 );
};

const styles = StyleSheet.create({
 scrollViewContent: {
  flexGrow: 1,
  paddingBottom: 50,
 },
 container: {
  flex: 1,
  paddingHorizontal: UiDefaults.viewPadding,
  backgroundColor: Colors.light.white,
  // justifyContent: 'center',
 },

 title: {
  lineHeight: 32,
 },
 subtitle: {
  lineHeight: 24,
 },
 formContainer: {
  marginVertical: 30,
  width: '100%',
 },
 input: {
  width: '100%',
  backgroundColor: Colors.light.white,
 },
 avatar: {
  width: 150,
  height: 150,
  borderRadius: 10
 },
 addButton: {
  marginTop: 40,
 },
});

export default AddSecurityGuard;
