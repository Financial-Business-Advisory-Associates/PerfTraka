import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText, ThemedView } from '../ui'
import { UiDefaults } from '@/constants/UiDefaults'
import Colors from '@/constants/Colors'
import { useAppState } from '@/app/zus/store'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import UserPicture from '@/modules/userPicture'

const UserDropDownModal = () => {
 const toggleLogoutModal = useAppState((state) => state.toggleLogoutModal);
 return (

  <Modal transparent style={{ width: '100%', flex: 1 }}>
   <ThemedView style={[styles.dropDown, { height: 80, top: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
    <UserPicture />
   </ThemedView>
   <ThemedView style={[styles.dropDown, { width: 120 }]}>
    <TouchableOpacity style={styles.dropDownBtn} onPress={() => toggleLogoutModal()}>
     <MaterialIcons size={14} name='logout' color={Colors.light.secondary} />
     <ThemedText family='semi-bold' style={styles.dropText} size={12}>Logout</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity style={styles.dropDownBtn}>
     <MaterialIcons size={14} name='person-outline' color={Colors.light.secondary} />

     <ThemedText family='semi-bold' style={styles.dropText} size={12}>Profile</ThemedText>
    </TouchableOpacity>

   </ThemedView>
  </Modal>


 )
}

export default UserDropDownModal

const styles = StyleSheet.create({
 dropDown: {
  position: 'absolute',
  width: 100,
  right: UiDefaults.viewPadding - 15,
  top: 40 + StatusBar.currentHeight!,
  backgroundColor: Colors.light.white,
  borderRadius: 5,
  gap: 10,
  zIndex: 9999
 },
 dropDownBtn: {
  flexDirection: 'row',
  gap: 10,
  alignItems: 'center',
 },
 dropText: {
  lineHeight: 24,
  color: Colors.light.secondary
 }
})