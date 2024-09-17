import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LogoutModal } from '@/components/Modals'
import { useAppState } from '@/app/zus/store'
import UserDropDownModal from '@/components/Modals/UserDropDownModal'
import AppLoader from '@/components/Modals/AppLoader'
import { useRehydrateEncryptedStorageData } from '@/app/hooks/useRehydrateEncryptedStorageData'

type ControllerProps = {
 children: React.ReactNode
}
const AppController = ({ children }: ControllerProps) => {
 const showLogOutModal = useAppState((state) => state.logOutModalOpen);
 const showLogoutMenu = useAppState((state) => state.showLogOut);
 const pageLoading = useAppState((state) => state.isLoading);
 // useRehydrateEncryptedStorageData();

 return (
  <React.Fragment>
   {children}
   {
    showLogOutModal && <LogoutModal />
   }

   {
    showLogoutMenu && <UserDropDownModal />
   }

   {
    pageLoading && <AppLoader />
   }

  </React.Fragment>
 )
}

export default AppController

const styles = StyleSheet.create({}) 