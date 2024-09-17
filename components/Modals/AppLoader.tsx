import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DefaultModal from './DefaultModal'
import { AppActivityIndicator } from '../ActivityIndicator'

const AppLoader = ({ text }: { text?: string }) => {
 return (
  <DefaultModal useDefaultView={false} visible={true}>
   <AppActivityIndicator text={text} />
  </DefaultModal>
 )
}

export default AppLoader

const styles = StyleSheet.create({})