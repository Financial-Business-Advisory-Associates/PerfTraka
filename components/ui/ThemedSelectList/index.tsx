import { StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedView from '../ThemedView'
import { SelectList } from 'react-native-dropdown-select-list';
import ThemedText, { fontFamilyType } from '../ThemedText';
import ThemedInput from '../ThemedInput';
import { DefaultModal } from '@/components/Modals';
import Colors from '@/constants/Colors';

type SelectListProps = {
  label: string;
  value: any;
  placeholder?: string;
  family?: fontFamilyType
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  data: object[];
  dataToSave?: 'key' | 'value';
  onSelect?: (value: any) => void;
} & View['props']
const ThemedSelectList = ({ leftIcon, data = [], dataToSave = "value", onSelect, label, family, placeholder, value = "", style }: SelectListProps) => {
  const [selected, setSelected] = React.useState(value);
  const [showDropDown, setShowDropDown] = React.useState(false)

  const handleSelection = (value: any) => {
    setShowDropDown(false)
    setSelected(value);
    onSelect && onSelect(value);

  }
  return (
    <>
      <TouchableOpacity style={styles.selectorContainer} onPress={() => setShowDropDown(true)}>
        <ThemedText family="medium" size={14} style={[styles.label]}>{label}</ThemedText>
        <ThemedView transparent style={[styles.selector, style]}>
          {leftIcon}
          <ThemedText family='regular' size={14}>{value || placeholder}</ThemedText>
        </ThemedView>

      </TouchableOpacity>
      {
        showDropDown && (
          <DefaultModal visible={showDropDown} style={{ width: '90%' }} onClose={() => setShowDropDown(false)}>
            <ThemedView noPadding transparent style={[styles.container]}>
              <ThemedText family={family} size={14} style={[styles.label,]}>{label}</ThemedText>
              <SelectList
                placeholder={placeholder}
                setSelected={handleSelection}
                // searchicon={leftIcon}
                data={data}
                save={dataToSave}
              // dropdownShown={showDropDown}
              />
            </ThemedView>
          </DefaultModal>
        )
      }




    </>

  )
}

export default ThemedSelectList

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  label: {
    marginBottom: 5
  },
  selectorContainer: {
    width: '100%',
    // height: 45,
  },
  selector: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: Colors.light.primary,
  }
})