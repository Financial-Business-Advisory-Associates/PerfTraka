import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraView, Camera, BarcodeScanningResult, FlashMode, CameraType, } from "expo-camera/next";
import { CameraHeader } from './index';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../ui';
// import { CameraType, FlashMode } from 'expo-camera';


type BarCodeProps = {
 onClose: () => void;
 getData: (data: any) => void;
}
const BarCodeScanner = ({ onClose, getData }: BarCodeProps) => {
 const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
 const [hasPermission, setHasPermission] = useState<null | boolean>(null);
 const [type, setType] = useState<CameraType>("back");
 const [flashMode, setFlashMode] = useState<FlashMode>("off");
 const [scanned, setScanned] = useState<boolean>(false);
 const [bound, setBounds] = useState<{ top: number; left: number; width: number; height: number; }>({
  width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 4, top: SCREEN_WIDTH / 2, left: SCREEN_WIDTH / 4
 });

 const [code, setCode] = useState<string | null>(null)

 let flashIcon: React.ComponentProps<typeof MaterialCommunityIcons>["name"] = "lightning-bolt-outline";
 if (flashMode == "on") flashIcon = "lightning-bolt";


 useEffect(() => {
  const getCameraPermissions = async () => {
   const { status } = await Camera.requestCameraPermissionsAsync();
   setHasPermission(status === "granted");
  };

  getCameraPermissions();
 }, []);

 // function getBoundingBox(cornerPoints: { x: number; y: number; }[]) {
 //  const xs = cornerPoints.map(point => point.x);
 //  const ys = cornerPoints.map(point => point.y);
 //  const minX = Math.min(...xs);
 //  const minY = Math.min(...ys);
 //  const maxX = Math.max(...xs);
 //  const maxY = Math.max(...ys);
 //  return { topLeft: [minX, minY], bottomRight: [maxX, maxY] };
 // }


 function getDimension(cornerPoints: { x: number; y: number; }[]) {
  const xs = cornerPoints.map(point => point.x);
  const ys = cornerPoints.map(point => point.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  return { width, height };
 }

 function getBoundingBox(cornerPoints: { x: number; y: number; }[]) {
  const xs = cornerPoints.map(point => point.x);
  const ys = cornerPoints.map(point => point.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  return {
   left: minX,
   top: minY,
   width: maxX,
   height: maxY - minY,
  };
 }


 const handleBarCodeScanned = ({ type, data, bounds, cornerPoints }: BarcodeScanningResult) => {
  const origin = getBoundingBox(cornerPoints);
  let width = origin.width
  let height = origin.height
  let top = origin.top;
  let left = origin.left;
  if (bounds) {
   left = bounds.origin.x;
   top = bounds.origin.y;
   width = bounds.size.width;
   height = bounds.size.height;
  }
  setBounds((pre) => ({ ...pre, width, height, left, top, }));
  if (data) {
   setCode(data);

  }
 };

 if (hasPermission === null) {
  return <Text>Requesting for camera permission</Text>;
 }
 if (hasPermission === false) {
  return <Text>No access to camera</Text>;
 }

 const toggleFlash = () => {
  setFlashMode(flashMode == "on" ? "off" : "on");
 }
 const toggleType = () => {
  setType(type == "back" ? "front" : "back");
 }

 return (
  <View style={styles.container}>
   <CameraView
    onBarcodeScanned={handleBarCodeScanned}
    barcodeScannerSettings={{
     barCodeTypes: ["qr", "pdf417"],
    }}
    enableTorch={true}
    flashMode={flashMode}

    focusable
    style={[StyleSheet.absoluteFillObject, { position: 'relative', flex: 1, width: '100%' }]}
   >
    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#fff', position: 'absolute', ...bound }} />
    <CameraHeader onClose={onClose} flashIconName={flashIcon} toggleCameraType={toggleType} toggleFlash={toggleFlash} />
    {
     code && (
      <View style={styles.codeCont}>
       <TouchableOpacity style={styles.codeBtn} onPress={() => getData(code)}>
        <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        <ThemedText style={{ color: 'white' }} size={12}>{code}</ThemedText>

       </TouchableOpacity>
      </View>
     )
    }

   </CameraView>
  </View>
 )
}

export { BarCodeScanner }

const styles = StyleSheet.create({
 codeCont: {
  position: 'absolute',
  top: '55%',
  width: '100%',
  height: 50,
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
  width: '100%',
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
 },
})