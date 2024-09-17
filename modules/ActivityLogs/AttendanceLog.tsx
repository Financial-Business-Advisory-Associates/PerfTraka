import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, FlatList, View } from 'react-native'
import { useFetchAttendancesQuery } from '@/app/services/queries';
import Colors from '@/constants/Colors';
import { LatestAttendance } from '@/types';
import { ThemedText, ThemedView } from '@/components/ui';
import Avatar from '@/components/Avatars';
import { defaultUser } from '@/assets/images';
import { useThemeColor } from '@/components/Themed';
import NotFoundLogs from './NotFoundLogs';
// import { FlashList } from '@shopify/flash-list';
import { useAppState } from '@/app/zus/store';
import { convertDateFormat } from '@/constants/helpers';
import { useNavigation } from '@react-navigation/native';

type AttendanceLogProps = {
  filter?: {
    startDate: string;
    endDate: string;
  }
}

const AttendanceLog = ({ filter }: AttendanceLogProps) => {
  const latestAttendance = useAppState((state) => state.latest_attendances);
  const { navigate } = useNavigation();




  // const { data, isFetching, isSuccess, error } = useFetchAttendancesQuery({ ...filter });
  // Fetch attendance data if filter is provided
  const { data, isFetching, isSuccess, error } = useFetchAttendancesQuery({ ...filter });


  const mutedTextColor = useThemeColor({}, "mutedText");
  let queriredAttendance = latestAttendance;

  if (isFetching) {
    return <ActivityIndicator size={32} color={Colors.light.secondary} />
  }
  if (isSuccess && data) {
    queriredAttendance = data?.data?.attendances?.data ?? [];

  }

  /**
  * flashlist render item
  * @param param0 
  * @returns 
  */
  const _renderAttendance = ({ item }: { item: LatestAttendance }) => {
    let btnTextColor = item.action_type?.toLocaleLowerCase() == "check_in" ? 'rgba(140, 119, 16, 1)' : 'rgba(12, 108, 23, 1)';
    let btnBgColor = item.action_type?.toLocaleLowerCase() == "check_out" ? 'rgba(237, 228, 183, 1)' : 'rgba(232, 249, 234, 1)';

    const date = convertDateFormat(item.attendance_date, "DD/MM/YYYY");

    return (
      <ThemedView noPadding transparent style={styles.itemContainer}>
        <Avatar fit='cover' containerWidth={40} containerHeight={40} source={item.user?.profile_image as string} placeholder={defaultUser} />
        <ThemedView transparent style={{ width: '60%' }}>
          <ThemedText size={13} family='medium' style={styles.itemText}>{item?.user!.first_name} {item?.user!.last_name} </ThemedText>
          <ThemedText size={12} family='regular' style={[styles.itemText, { color: mutedTextColor }]}>{date}</ThemedText>
        </ThemedView>
        <View style={[styles.statusBtn, { backgroundColor: btnBgColor }]}>
          <View style={{ width: 6, height: 6, backgroundColor: btnTextColor, borderRadius: 6 }} />
          <ThemedText style={{ lineHeight: 18 }} family='medium' size={10}>{item.action_type?.replace("_", " ")}</ThemedText>
        </View>
      </ThemedView>
    )
  }
  return (
    <>
      {
        queriredAttendance.length > 0 ? (
          <FlatList keyExtractor={(_item, index) => index.toString()} data={queriredAttendance} renderItem={_renderAttendance} />
          // <FlashList estimatedItemSize={100} keyExtractor={(_item, index) => index.toString()} data={queriredAttendance} renderItem={_renderAttendance} />
        ) : (
          <NotFoundLogs
            title='No attendance records found'
            subTitle="Start tracking attendance by recording check-ins and check-outs to populate this log."
            btnText='Take attendance'
            handleClick={() => navigate('TakeAttendance')} />
        )
      }

    </>

  );
};

export default AttendanceLog

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
  notFoundContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20
  },
  notFoundHeading: {
    lineHeight: 30,
    paddingVertical: 10
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