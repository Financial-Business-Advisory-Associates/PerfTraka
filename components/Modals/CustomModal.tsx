import React, { ReactNode } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface CustomModalProps {
 visible: boolean;
 onClose: () => void;
 children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, children }) => {
 return (
  <Modal
   animationType="fade"
   transparent={true}
   visible={visible}
   onRequestClose={onClose}
  >
   <TouchableOpacity
    activeOpacity={1}
    style={styles.modalContainer}
    onPress={onClose}
   >
    <View style={styles.modalBackdrop}></View>
    <View style={styles.modalContent}>{children}</View>
   </TouchableOpacity>
  </Modal>
 );
};

const { height } = Dimensions.get('window');
const quarterHeight = height / 4;

const styles = StyleSheet.create({
 modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 modalBackdrop: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
 modalContent: {
  backgroundColor: 'white',
  width: '80%',
  height: quarterHeight,
  borderRadius: 10,
  padding: 20,
  elevation: 5, // Add elevation for Android shadow
  zIndex: 1, // Ensure modal content is above backdrop
 },
});

export default CustomModal;
