import * as React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import useAppTheme from "../../hooks/useAppTheme";
// import { DefaultColors } from "../../constants/themes/Colors";


export interface IIconProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  size?: number;
  style?: React.ComponentProps<typeof FontAwesome>["style"];
}
export interface IIoniconProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  size?: number;
  style?: React.ComponentProps<typeof Ionicons>["style"];
}

export function Icon(props: IIconProps) {
  // const colorScheme = useAppTheme();

  return (
    <FontAwesome
      size={20}
      /*style={{ marginBottom: -3 }}*/
      // color={DefaultColors[colorScheme].text}
      {...props}
    />
  );
}
export function Ionicon(props: IIoniconProps) {

  return (
    <Ionicons
      size={30}
      // style={{ opacity: 0.9 }}
      /*style={{ marginBottom: -3 }}*/
      // color={DefaultColors[colorScheme].buttonBorder}
      {...props}
    />
  );
}
