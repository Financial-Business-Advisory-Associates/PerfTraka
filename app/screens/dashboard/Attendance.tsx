import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { View, useThemeColor } from '@/components/Themed';
import { ThemedButton, ThemedText, ThemedView } from '@/components/ui';
import { UiDefaults } from '@/constants/UiDefaults';
import Colors from '@/constants/Colors';
import { DefaultHeader } from '@/components/Header';
import ActivityLogs from '@/modules/ActivityLogs';
import ThemedDate from '@/components/ui/ThemedDate';
import { convertDateFormat } from '@/constants/helpers';
import { useFetchAttendancesQuery } from '@/app/services/queries';

interface DateRange {
 start: Date | null;
 end: Date | null;
}

export default function Attendance() {
 const bgColor = useThemeColor({}, "tabBackground");
 const [dates, setDates] = useState<DateRange>({ start: null, end: null });

 const [filter, setFilter] = useState<{ startDate: string; endDate: string }>();

 const handleDate = (date: Date, name: 'start' | 'end') => {
  setDates((prev) => ({ ...prev, [name]: date }))
 }

 const handleSearch = () => {

  if (dates.start && dates.end) {
   let startDate = convertDateFormat(dates.start, 'YYYY-MM-DD');
   let endDate = convertDateFormat(dates.end, 'YYYY-MM-DD');
   setFilter(() => ({ startDate, endDate }))
  }
 }

 const handleClear = () => {
  setDates(() => ({ start: null, end: null }));
  setFilter({ startDate: '', endDate: '' })
 }


 return (
  <View style={{
   width: '100%', backgroundColor: bgColor, flex: 1, zIndex: 50, position: 'relative',
  }}>
   <DefaultHeader />
   <ThemedView transparent style={styles.container}>
    <ThemedText style={styles.title} family='medium' size={24}>Attendance</ThemedText>
    <ThemedView noPadding style={styles.formRow} transparent>
     <View style={{ width: '45%', backgroundColor: 'transparent' }}>
      <ThemedDate textSize={12} iconSize={12} textStyle={styles.text} value={dates.start as Date} label='Start date' family='regular' onChangeDate={(date) => handleDate(date, 'start')} />
     </View>
     <View style={{ width: '45%', backgroundColor: 'transparent' }}>
      <ThemedDate textSize={12} iconSize={12} textStyle={styles.text} value={dates.end as Date} label='End date' family='regular' onChangeDate={(date) => handleDate(date, 'end')} />
     </View>
    </ThemedView>

    <ThemedView noPadding style={[styles.formRow, { marginVertical: 30 }]} transparent>
     <ThemedButton containerStyle={{ width: '45%' }} style={styles.cancel} textStyle={{ color: Colors.light.green800 }} size={12} title='Clear' handleClick={handleClear} />
     <ThemedButton containerStyle={{ width: '45%' }} title='Search' size={12} handleClick={handleSearch} />
    </ThemedView>

    <ActivityLogs filter={filter} showTab={false} tabs={['Attendance']} />

   </ThemedView>
  </View>
 );
}
const styles = StyleSheet.create({
 scrollViewContent: {
  flexGrow: 1,
  paddingBottom: 50,
 },
 container: {
  flex: 1,
  paddingHorizontal: UiDefaults.viewPadding,
  backgroundColor: Colors.light.white,
 },
 title: {
  lineHeight: 32,
 },
 subtitle: {
  lineHeight: 24,
 },
 text: {
  color: Colors.light.green800
 },

 formRow: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 3
 },
 cancel: {
  backgroundColor: 'transparent',
  borderColor: Colors.light.green800,
  borderWidth: 1 || StyleSheet.hairlineWidth
 }
});
