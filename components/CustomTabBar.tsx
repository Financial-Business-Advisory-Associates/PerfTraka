import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, StyleSheet, View as NativeView, Text } from "react-native";
import { ThemedText, ThemedView } from "./ui";
import { getFontSize } from "@/constants/UiDefaults";
import Colors from "@/constants/Colors";


export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {


  return (
    <ThemedView noPadding style={[styles.container]}>
      <NativeView style={[styles.content,]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const { title, tabBarIcon, tabBarLabel } = options;

          const label =
            tabBarLabel !== undefined
              ? tabBarLabel
              : title !== undefined
                ? title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            navigation.navigate(route.name); // animated delay

            // if (!isFocused && !event.defaultPrevented) {
            //   setTimeout(() => {
            //   }, animationConfig.tabSwitchDelayMs);
            // }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <Pressable
              accessibilityRole="button"
              // accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabBarButton, isFocused && { backgroundColor: Colors.light.secondary, borderRadius: 10 }]}
              key={index}
            >
              {tabBarIcon &&
                tabBarIcon({
                  focused: isFocused, color: isFocused ? Colors.light.white : Colors.light.mutedText, size: 20,
                })}

              {label ? (
                <ThemedText
                  size={10}
                  family="semi-bold"
                  style={[
                    {
                      color: isFocused
                        ? Colors.light.white
                        : Colors.light.mutedText,
                    },
                    styles.tabBarLabel,

                  ]}
                >
                  {tabBarLabel as string}
                </ThemedText>
              ) : null}
            </Pressable>
          );
        })}
      </NativeView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    width: '100%',
    height: '80%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    borderRadius: 25,
    flexDirection: 'row'
  },

  tabBarButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
    width: '80%',
    marginHorizontal: 10
  },
  customTabBarContainer: {
    paddingBottom: 10,
    borderTopWidth: 1,
    backgroundColor: 'green',

  },
  buttonContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    width: '100%',
    // flexDirection: "row",
    flex: 1,
    // height: '100%',
  },

  tabBarLabel: {
    // fontSize: getFontSize(10),
    // fontWeight: "bold",
    // fontFamily: "poppins-semibold",
  },
});
