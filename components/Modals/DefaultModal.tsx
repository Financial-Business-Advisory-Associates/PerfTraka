import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../ui';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type ModalProps = {
 useDefaultView?: boolean;
 visible: boolean;
 onClose?: () => void;
 children: React.ReactNode;
}

const DefaultModal = ({ style, visible, onClose, children, useDefaultView = true, ...rest }: ModalProps & View['props']) => {
 return (
  <Modal
   transparent
   animationType="fade"
   visible={visible}
   onRequestClose={onClose}
  >
   <ThemedView noPadding style={styles.container}>
    {/* Backdrop */}
    <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
    {/* Modal content */}
    {
     useDefaultView ? (<View style={[styles.modal, style]} {...rest}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
       <Ionicons name='close-circle' size={22} color={Colors.light.green800} />
      </TouchableOpacity>
      {children}
     </View>) : (
      <>
       {children}
      </>
     )
    }

   </ThemedView>
  </Modal>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
 },
 backdrop: {
  flex: 1,
  width: '100%',
  height: '100%',
 },
 modal: {
  position: 'absolute',
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 20,
  minWidth: 300,
  maxWidth: '100%',
  alignItems: 'center',
  justifyContent: 'center', // Centering the modal content
 },
 closeButton: {
  width: '10%',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-end',
  padding: 3
  // position: 'absolute',
 },
});


export default DefaultModal;
