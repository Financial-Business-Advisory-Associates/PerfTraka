import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import ThemedInput from '.'

type ControlledInputInterface = {
  control: Control;
  name: string;
  placeholder: string;
  label: string;
} & React.ComponentProps<typeof TextInput>
const ControlledInput = ({ control, name, placeholder, label, ...rest }: ControlledInputInterface) => {
  return (
    <Controller
      control={control}
      name={name}
      render={(
        {
          field: { value, onChange, onBlur },
          fieldState: { error, invalid }
        }
      ) => {
        // console.log({ error, invalid });

        return (
          <ThemedInput
            noPadding
            value={value}
            error={error?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            containerStyle={{ marginBottom: 10 }}
            placeholder={placeholder}
            label={label} name={name} {...rest} />
        )
      }


      }
    />
  )
}

export default ControlledInput

const styles = StyleSheet.create({});
