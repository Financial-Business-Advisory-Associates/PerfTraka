import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText, ThemedView } from '@/components/ui'
import Colors from '@/constants/Colors';

import AttendanceLog from './AttendanceLog';
import ScanLog from './ScanLog';

type TabTypes = 'Attendance' | 'Scan';

type ActivityProps = {
  tabs?: TabTypes[];
  showTab?: boolean;
  filter?: { startDate: string; endDate: string; }
}
const ActivityLogs = ({ tabs = ["Attendance", "Scan"], showTab = true, filter }: ActivityProps) => {
  const [selectedTab, setTab] = useState<TabTypes>(tabs[0])
  useEffect(() => { }, [[filter]])
  return (
    <ThemedView noPadding transparent style={styles.container}>
      {/* <ThemedText style={styles.headerText} family='semi-bold' size={18}>ActivityLogs</ThemedText> */}
      <ThemedView noPadding transparent style={styles.tabSection}>
        {
          showTab && (
            <ThemedView transparent noPadding style={styles.tabContainer}>
              {
                tabs.map((tab, i) => (
                  <TouchableOpacity onPress={() => setTab(tab)} key={i}
                    style={[styles.btn, tab === selectedTab && styles.active]}>
                    <ThemedText style={[styles.tabText, tab === selectedTab && styles.active]} size={14} family='medium'>{tab}</ThemedText>
                  </TouchableOpacity>
                ))
              }
            </ThemedView>
          )
        }
        <ThemedView style={styles.dataDisplay} >
          {selectedTab == "Attendance" && <AttendanceLog filter={filter} />}
          {selectedTab == "Scan" && <ScanLog filter={filter} />}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

export default ActivityLogs




const styles = StyleSheet.create({
  scanImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'red'
  },
  headerText: {
    lineHeight: 28
  },
  tabSection: {
    width: '100%',
    flex: 1,
    marginVertical: 10,
  },
  tabContainer: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    height: 40,
    flexDirection: 'row',
    borderRadius: 10,
  },
  active: {
    backgroundColor: Colors.light.secondary,
    color: Colors.light.white,
  },
  btn: {
    width: '50%',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    lineHeight: 20,
  },

  dataDisplay: {
    width: '100%',
    flex: 1,
    marginVertical: 12,
    backgroundColor: Colors.light.white,
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light.mutedText,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blue'
  },
  itemText: {
    lineHeight: 20,
  },
  statusBtn: {
    width: '22%',
    borderRadius: 20,
    height: 22,
    backgroundColor: 'rgba(237, 228, 183, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})