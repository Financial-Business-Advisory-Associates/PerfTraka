import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText, ThemedView } from '@/components/ui'
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { CameraApp } from '@/components/Camera';


type PictureZoneProps = {
 imageUrl?: string;
 error?: string;
 handleImageCapture: (url: string) => void;
}
const PictureZone = ({ imageUrl, handleImageCapture, error }: PictureZoneProps) => {
 const [showCamera, setShowCamera] = useState<boolean>(false);


 const handleShowCamera = () => {
  setShowCamera(true);
 }
 const handleCloseCamera = () => {
  setShowCamera(false);
 }

 return (
  <React.Fragment>
   {
    showCamera ? (
     <Modal style={{ flex: 1, width: '100%', backgroundColor: '#000' }}>
      <CameraApp onClose={handleCloseCamera} getImage={({ url }) => handleImageCapture(url)} />
     </Modal>
    ) : (
     <ThemedView style={[styles.pictureZone, imageUrl != '' && { backgroundColor: 'transparent' }]}>
      {
       imageUrl ? (
        <>
         <View style={styles.avatar}>
          <Image source={imageUrl} style={{ ...StyleSheet.absoluteFillObject, borderRadius: 10 }} />
         </View>
         <TouchableOpacity style={styles.cameraButton} onPress={handleShowCamera}>
          <Feather name="camera" size={24} color="black" />
          <ThemedText style={{ color: Colors.light.secondary }} size={14} family='semi-bold'>Retake</ThemedText>
         </TouchableOpacity>
        </>
       ) : (
        <>
         <TouchableOpacity style={[styles.cameraButton,]} onPress={handleShowCamera}>
          <ThemedText size={14} family='medium'>Take a Selfie</ThemedText>
          <Feather name="camera" size={24} color="black" />
         </TouchableOpacity>
         {error && (
          <ThemedText size={12} style={{ color: 'red', fontStyle: 'italic', paddingVertical: 2 }}>{error}</ThemedText>

         )}
        </>
       )
      }

     </ThemedView>

    )
   }
  </React.Fragment>
 )
}

export default PictureZone

const styles = StyleSheet.create({
 pictureZone: {
  width: '100%',
  height: 200,
  borderRadius: 15,
  backgroundColor: 'rgba(230, 231, 230, 1)',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
 },
 cameraButton: {
  alignItems: 'center',
  gap: 5,
 },
 avatar: {
  width: 150,
  height: 150,
  borderRadius: 10
 },
})