// import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import { Camera, CameraType, FlashMode, CameraPictureOptions, requestCameraPermissionsAsync } from 'expo-camera'
// import Colors from '@/constants/Colors';
// import { Entypo } from '@expo/vector-icons';
// import { ThemedText } from '../ui';
// import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// type CameraAppProps = {
//  getImage: ({ url }: { url: string }) => void,
//  onClose?: () => void,
// }
// const CameraApp = ({ getImage, onClose }: CameraAppProps) => {
//  // const [hasPermission, setPermission] = useState(null);
//  const [type, setType] = useState(CameraType.back);
//  const [flashOn, setFlashMode] = useState(FlashMode.off);
//  const cameraRef = useRef<Camera>(null);
//  const [isCameraReady, setCameraReady] = useState<boolean>(false)
//  const [permission, requestPermission] = Camera.useCameraPermissions();

//  const [hasPermission, setHasPermission] = useState<boolean | null>(null);


//  useEffect(() => {
//   try {
//    (async () => {
//     const { status } = await requestCameraPermissionsAsync();
//     setHasPermission(status === 'granted');
//     let ratio = await cameraRef.current!.getSupportedRatiosAsync();
//     // console.log({ ratio });

//    })();
//   } catch (error: any) {
//    // console.log("camera load error:", error?.message);

//   }

//  }, []);

//  function toggleCameraType() {
//   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//  }
//  const handleFlash = () => {
//   let mode = FlashMode.off;
//   if (flashOn == FlashMode.on) {
//    mode = FlashMode.torch;
//   }
//   if (flashOn == FlashMode.torch) {
//    mode = FlashMode.off;
//   }
//   if (flashOn == FlashMode.off) {
//    mode = FlashMode.on;
//   }
//   setFlashMode(mode);
//  }
//  const takePicture = async () => {

//   if (cameraRef && cameraRef.current) {
//    try {
//     const data = await cameraRef.current!.takePictureAsync();
//     getImage({ url: data.uri });
//     onClose && onClose();

//    } catch (error) {
//     // console.log(error);

//    }
//   }
//  }
//  let flashIcon: React.ComponentProps<typeof MaterialCommunityIcons>["name"] = "lightning-bolt-outline";
//  if (flashOn == "on") flashIcon = "lightning-bolt";
//  if (flashOn == "torch") flashIcon = "lightning-bolt-circle";

//  return (
//   <View style={styles.container}>

//    <Camera
//     ratio="16:9"
//     flashMode={flashOn} ref={cameraRef}
//     style={styles.camera}
//     type={type}
//     onBarCodeScanned={({ bounds, cornerPoints }) => {
//      console.log({ bounds });

//     }}
//     onCameraReady={() => setCameraReady(true)}>
//     <CameraHeader onClose={onClose} flashIconName={flashIcon} toggleCameraType={toggleCameraType} toggleFlash={handleFlash} />
//    </Camera>
//    <View style={styles.actionContainer}>
//     <TouchableOpacity style={styles.action} onPress={takePicture} />
//    </View>
//   </View>
//  )
// }

// // export default CameraApp

// const styles = StyleSheet.create({
//  container: {
//   width: '100%',
//   flex: 1,
//   backgroundColor: '#fff',
//   justifyContent: 'center',
//  },
//  header: {
//   width: '100%',
//   paddingTop: StatusBar.currentHeight || 30,
//   height: 100,
//   // backgroundColor: '#fff',
//   position: 'absolute',
//   top: 0,
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//  },
//  left: {
//   width: '30%',
//   flexDirection: 'row'
//  },
//  right: {
//   width: '40%',
//   flexDirection: 'row',
//   justifyContent: 'space-between'
//   // backgroundColor: 'blue',
//  },
//  top: {
//   flexDirection: 'row',
//   width: '100%',
//   height: '80%',
//   alignItems: 'center',
//   // backgroundColor: 'red',
//   justifyContent: 'space-between',
//   paddingHorizontal: 12
//  },
//  flip: {
//   padding: 5,
//   width: '30%',
//   height: 40,
//   // backgroundColor: 'blue'
//  },
//  camera: {
//   flex: 1,
//   borderRadius: 20
//  },
//  actionContainer: {
//   width: '100%',
//   height: 60,
//   backgroundColor: '#000',
//   justifyContent: 'center',
//   alignItems: 'center',
//   paddingBottom: 5
//  },
//  action: {
//   width: 60,
//   height: 60,
//   borderRadius: 30,
//   backgroundColor: Colors.light.white
//  }
// })

// type CameraHeaderProps = {
//  onClose?: () => void;
//  flashIconName: 'lightning-bolt-outline' | 'lightning-bolt' | 'lightning-bolt-circle';
//  toggleFlash: () => void;
//  toggleCameraType: () => void;

// }
// const CameraHeader = ({ onClose, flashIconName, toggleFlash, toggleCameraType }: CameraHeaderProps) => {
//  return (
//   <View style={styles.header}>
//    <View style={styles.top}>
//     <TouchableOpacity onPress={onClose} style={styles.left}>
//      <Entypo name="chevron-small-left" size={24} color={Colors.light.white} />
//      <ThemedText family="regular" style={{ lineHeight: 24, color: Colors.light.white }} size={12}>Back</ThemedText>
//     </TouchableOpacity>
//     <View style={styles.right}>
//      <TouchableOpacity style={styles.flip} onPress={toggleFlash}>
//       <MaterialCommunityIcons name={flashIconName} size={24} color={Colors.light.white} />
//      </TouchableOpacity>

//      <TouchableOpacity onPress={toggleCameraType} style={styles.flip}>
//       <MaterialIcons name="flip-camera-ios" size={24} color={Colors.light.white} />
//      </TouchableOpacity>
//     </View>
//    </View>
//   </View>
//  )
// }

// export { CameraApp, CameraHeader }


import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode, CameraPictureOptions, requestCameraPermissionsAsync } from 'expo-camera';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { ThemedButton, ThemedText, ThemedView } from '../ui';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { AppActivityIndicator } from '../ActivityIndicator';
type CameraAppProps = {
 getImage: ({ url }: { url: string }) => void;
 onClose?: () => void;
};

const CameraApp = ({ getImage, onClose }: CameraAppProps) => {
 const [type, setType] = useState(CameraType.back);
 const [flashOn, setFlashMode] = useState(FlashMode.off);
 const cameraRef = useRef<Camera>(null);
 const [isCameraReady, setCameraReady] = useState<boolean>(false);
 const [hasPermission, setHasPermission] = useState<boolean | null>(null);
 const [loader, setLoader] = useState<boolean>(false);
 useEffect(() => {
  (async () => {
   await handlePermission();
  })();
 }, []);

 const handlePermission = async () => {
  const { status } = await requestCameraPermissionsAsync();
  setHasPermission(status === 'granted');
 }

 function toggleCameraType() {
  setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
 }

 const handleFlash = () => {
  setFlashMode((prevMode) => {
   if (prevMode === FlashMode.off) return FlashMode.on;
   else if (prevMode === FlashMode.on) return FlashMode.torch;
   else return FlashMode.off;
  });
 };

 const takePicture = async () => {
  if (cameraRef.current) {
   try {
    const data = await cameraRef.current.takePictureAsync();
    setLoader(true)
    // Get information about the captured image file
    let imageUri = await compressor(data.uri);
    // const fileInfo = await FileSystem.getInfoAsync(imageUri);
    // const fileSizeInBytes = fileInfo.size;
    // const fileSizeInKB = fileSizeInBytes / 1024; // Convert bytes to kilobytes
    getImage({ url: imageUri });
    setLoader(false);
    // console.log('File size:', fileSizeInKB.toFixed(2), 'KB');
    onClose && onClose();
   } catch (error) {
    console.log(error);
   }
  }
 };
 const compressor = async (uri: string) => {
  // Get information about the captured image file
  const fileInfo = await FileSystem.getInfoAsync(uri);
  const manipResult = await manipulateAsync(uri,
   [{ resize: { width: 400 } }],
   { format: SaveFormat.PNG }
  );
  return manipResult.uri;
 }

 let flashIcon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = 'lightning-bolt-outline';
 if (flashOn === 'on') flashIcon = 'lightning-bolt';
 if (flashOn === 'torch') flashIcon = 'lightning-bolt-circle';



 if (!hasPermission) {
  return (
   <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <AppActivityIndicator />
    <ThemedView style={{ marginTop: "60%", flexDirection: 'column', gap: 40, backgroundColor: 'transparent' }}>
     <ThemedText style={{ textAlign: 'center', color: '#fff' }} family='bold' size={18}>📷 Kindly grant access to use camera </ThemedText>
     <ThemedButton title='Enable Access' handleClick={async () => await handlePermission()} />
    </ThemedView>
   </View>
  );
 }

 return (
  <View style={styles.container}>
   <Camera
    style={styles.camera}
    type={type}
    flashMode={flashOn}
    ref={cameraRef}
    ratio="4:3"
    onCameraReady={() => setCameraReady(true)}
   >
    <CameraHeader onClose={onClose} flashIconName={flashIcon} toggleCameraType={toggleCameraType} toggleFlash={handleFlash} />
    {
     loader && (
      <View style={styles.codeCont}>
       <AppActivityIndicator />
      </View>
     )
    }
   </Camera>
   <View style={styles.actionContainer}>
    <TouchableOpacity style={styles.action} onPress={takePicture} />
   </View>
  </View>
 );
};



type CameraHeaderProps = {
 onClose?: () => void;
 flashIconName: 'lightning-bolt-outline' | 'lightning-bolt' | 'lightning-bolt-circle';
 toggleFlash: () => void;
 toggleCameraType: () => void;

}
const CameraHeader = ({ onClose, flashIconName, toggleFlash, toggleCameraType }: CameraHeaderProps) => {

 return (
  <View style={styles.header}>
   <View style={styles.top}>
    <View style={styles.left}>
     <TouchableOpacity onPress={onClose} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Entypo name="chevron-small-left" size={24} color={Colors.light.white} />
      <ThemedText family="regular" style={{ lineHeight: 24, color: Colors.light.white }} size={12}>Back</ThemedText>
     </TouchableOpacity>

    </View>
    <View style={[styles.right]}>
     <TouchableOpacity style={styles.flip} onPress={toggleFlash}>
      <MaterialCommunityIcons name={flashIconName} size={24} color={Colors.light.white} />
     </TouchableOpacity>

     <TouchableOpacity onPress={toggleCameraType} style={styles.flip}>
      <MaterialIcons name="flip-camera-ios" size={24} color={Colors.light.white} />
     </TouchableOpacity>
    </View>
   </View>
  </View>
 )
}

export { CameraApp, CameraHeader };

const styles = StyleSheet.create({
 codeCont: {
  position: 'absolute',
  top: '55%',
  width: '50%',
  height: 100,
  zIndex: 1000,
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'blue'
 },
 codeBtn: {
  paddingVertical: 10,
  width: '40%',
  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  backgroundColor: '#404040',
  gap: 10,
  borderRadius: 20,
 },
 container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
 },
 camera: {
  flex: 1,
  // width: '100%',
  aspectRatio: 1 / 1, // Set the aspect ratio to 4:3
  justifyContent: 'center',
 },
 actionContainer: {
  width: '100%',
  height: 60,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 5,
 },
 action: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: Colors.light.white,
 },
 flip: {
  padding: 5,
  // width: '30%',
  height: 40,
  // backgroundColor: 'red'
 },
 header: {
  width: '100%',
  paddingTop: StatusBar.currentHeight || 30,
  height: 100,
  // backgroundColor: '#fff',
  position: 'absolute',
  top: 0,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
 left: {
  width: '20%',
  // backgroundColor: 'red',
  height: '100%',
  flexDirection: 'row'
 },
 right: {
  width: '10%',
  gap: 40,
  // height: '100%',
  flexDirection: 'row',
  // justifyContent: 'space-between',
  // backgroundColor: 'blue',
 },
 top: {
  flexDirection: 'row',
  width: '100%',
  height: '80%',
  alignItems: 'center',
  // backgroundColor: 'red',
  // justifyContent: 'space-between',
  paddingHorizontal: 12
 },

});
