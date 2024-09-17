import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Image, Modal, StyleSheet, View, useWindowDimensions } from "react-native";
import { ThemedText, ThemedView } from "./ui";
import { logoIcon } from "@/assets/images";
import Colors from "@/constants/Colors";


export function AppActivityIndicator({ text }: { text?: string }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  // const { isBlocked } = useActivityBlocker();

  return (
    // <CustomModal visible={true}>
    <>
      <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
      <ThemedView style={styles.container}>
        <View style={styles.overlay} />
        <ThemedView transparent style={styles.modal}>
          {/* <Image source={logoIcon} style={{ ...StyleSheet.absoluteFillObject, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} resizeMode="cover" /> */}
          <ThemedView transparent style={styles.modalContent}>
            <View style={styles.logo}>
              <Image resizeMode="cover" source={logoIcon} style={{ width: '100%', height: '100%' }} />
            </View>
            <ActivityIndicator size="large" color={Colors.light.green800} />
          </ThemedView>
          {
            text && <ThemedText size={16} style={{ color: 'white', paddingTop: 10 }}>{text}</ThemedText>
          }

        </ThemedView>
      </ThemedView>

    </>
    // </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 0,
    borderRadius: 2,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0,
  },
  logo: {
    position: "absolute",
    opacity: 0.9,
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 10,
  },
});
