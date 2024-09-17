import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Feather } from '@expo/vector-icons';
import ThemedText from './ThemedText';

import RNDateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { convertDateFormat } from '@/constants/helpers';

type DateTimeProps = {
 width: DimensionValue;
 height: DimensionValue;
 value?: Date;
 onChange?: (value: Date) => void;
 textSize?: number;
 iconSize?: number;
}
const DatePicker = ({ width = "100%", height = "100%", value = new Date(), onChange, textSize = 14, iconSize = 20 }: DateTimeProps) => {
 const [showDate, toggleDate] = useState(false)
 const [selectedDate, setDate] = useState<Date | undefined>(value);

 const handleDate = (event: DateTimePickerEvent, date?: Date) => {
  // const { type, nativeEvent: { timestamp, utcOffset } } = event;
  toggleDate(false);
  if (date) {
   setDate(date);
   onChange && onChange(date)
  }
 };


 return (
  <TouchableOpacity onPress={() => toggleDate(!showDate)} style={[styles.container, { width, height }]}>

   {showDate ? (
    <>
     <Feather name="calendar" size={iconSize} color={Colors.light.green800} />
     <RNDateTimePicker accentColor={Colors.light.green800} style={{ backgroundColor: 'transparent' }} mode='date' value={value! || new Date} onChange={handleDate} />
    </>
   ) : (
    <>
     <Feather name="calendar" size={iconSize} color={Colors.light.green800} />
     <ThemedText style={{ color: Colors.light.green800 }} size={textSize} family='semi-bold'>{value ? convertDateFormat(value!, 'MMM D, YYYY') : 'select date'}
     </ThemedText>

    </>
   )}
   {/* {<RNDateTimePicker  style={{ backgroundColor: 'transparent', }} textColor={Colors.light.green800} mode='date' value={selectedDate!} onChange={handleDate} />} */}

  </TouchableOpacity>
 )
}

export default DatePicker

const styles = StyleSheet.create({
 container: {
  width: '40%',
  height: 40,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.light.green800,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5
 }
})