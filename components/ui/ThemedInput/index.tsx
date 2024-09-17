import { FontAwesome } from "@expo/vector-icons";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput as DefaultTextInput,
  TextStyle,
  TouchableOpacity,
  Text as NativeText,
  View as NativeView,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Icon, Ionicon } from "../Icon";
import ThemedText, { fontFamilyType } from "../ThemedText";
import { getFontSize } from "@/constants/UiDefaults";
import ThemedView from "../ThemedView";
import Colors from "@/constants/Colors";
import { useColorScheme } from '../../useColorScheme';




export interface CustomInputRef {
  focus: () => void;
}
export type ThemedInputProps = DefaultTextInput["props"] & {
  ref?: any
  name: string;
  transparent?: boolean;
  noPadding?: boolean;
  label: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: React.ReactNode; // if user wants to provide icon from other sources
  lightColor?: string;
  darkColor?: string;
  labelFamily?: fontFamilyType;
  inputStyle?: {};
  iconName?: React.ComponentProps<typeof FontAwesome>["name"]; // use included icons: font-awesome,
  iconSize?: number;
  iconColor?: string;
  iconRight?: boolean; // if true, icon will be on the right side of the button
  error?: string;
  handleInputChange?: (name: string, value: string) => void;
};


// export function ThemedCustomInput(props: ThemedInputProps) {
const ThemedTextInput: React.ForwardRefRenderFunction<CustomInputRef, ThemedInputProps> = (props, ref) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordHidden, setPassordHide] = useState(props.secureTextEntry);

  const {
    noPadding = false,
    name,
    label,
    style,
    textStyle,
    disabled,
    lightColor,
    darkColor,
    labelFamily = "medium",
    icon,
    iconName,
    iconSize = 23,
    iconColor,
    iconRight = false,
    transparent,
    inputStyle,
    containerStyle,
    error = "",

    ...rest
  } = props;

  const theme = useColorScheme() || 'light';


  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  function TextInputIcon() {
    return !iconName ? (
      <></>
    ) : (
      <>

        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={[styles.textInputIcon, { paddingLeft: 20 }]}
        />

      </>
    );
  }

  const defaultStyles = {
    borderColor: Colors[theme].primary,
    backgroundColor: Colors[theme].card,
    width: '90%',
  }
  return (
    <ThemedView noPadding={noPadding} transparent={transparent} style={[styles.container, containerStyle]}>
      <ThemedText family={labelFamily} size={14} style={[styles.label, textStyle]}>{label}</ThemedText>
      <ThemedView transparent={transparent} style={[styles.textInputContainer, style, error != "" && { borderColor: 'red' }]}>
        {
          icon ? icon : <TextInputIcon />
        }

        <DefaultTextInput
          style={[inputStyle, { width: props.secureTextEntry ? '90%' : '100%', height: '100%', }]}
          {...rest} secureTextEntry={passwordHidden} />
        {
          props.secureTextEntry && (
            <TouchableOpacity onPress={() => setPassordHide(!passwordHidden)} activeOpacity={0.4} style={{ width: '10%' }}>
              <Ionicon name={passwordHidden ? "eye-off" : "eye"} size={24} />
            </TouchableOpacity>
          )
        }
      </ThemedView>
      {error && <ThemedText style={styles.error} size={10}>{error}</ThemedText>}
    </ThemedView>
  )
}

export default forwardRef<CustomInputRef, ThemedInputProps>(ThemedTextInput);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 5
  },
  error: {
    color: 'red',
    padding: 2,
    fontStyle: 'italic',
  },
  textInputContainer: {
    margin: 0,
    padding: 0,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#9E9E9C',
    paddingHorizontal: 10,
    borderColor: Colors.light.primary,
    // For iOS
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    // For Android
    elevation: 2,

    flexDirection: 'row', gap: 5,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#fff'
    // width: '100%',
  },
  textInputIcon: {

  }
})


interface TextareaProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
}

export const Textarea: React.FC<TextareaProps> = ({ value, onChangeText, placeholder, style, ...rest }) => {
  return (
    <NativeView style={[styles.container, style]}>
      <TextInput
        style={iStyles.textInput}
        multiline
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...rest}
      />
    </NativeView>
  );
};

const iStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    flex: 1,
  },
});

