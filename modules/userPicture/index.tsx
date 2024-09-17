import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Avatar from '@/components/Avatars'
import { Entypo } from '@expo/vector-icons'
import { ThemedText, ThemedView } from '@/components/ui'
import { useAppState } from '@/app/zus/store'

const UserPicture = () => {
 // const [showDropDown, setShowDropDown] = useState<boolean>(false);
 const showLogoutMenu = useAppState((state) => state.toggleLogout);
 const logOutMenuOpen = useAppState((state) => state.showLogOut);
 const user = useAppState(state => state.user)
 // console.log({ logOutMenuOpen });

 return (
  <View style={styles.container}>
   <TouchableOpacity style={styles.container} onPress={() => showLogoutMenu()}>
    <Avatar fit="cover" source={user?.profile_image as string} />
    <Entypo name={logOutMenuOpen ? 'chevron-up' : 'chevron-down'} size={22} />
   </TouchableOpacity>

  </View>
 )
}

export default UserPicture

const styles = StyleSheet.create({
 container: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative'
 },

})