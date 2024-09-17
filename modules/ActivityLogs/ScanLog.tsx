import React from 'react'
import { ActivityIndicator, StyleSheet, FlatList, View } from 'react-native'
import { useFetchScansQuery } from '@/app/services/queries';
import Colors from '@/constants/Colors';
import { LatestScan } from '@/types';
import { ThemedText, ThemedView } from '@/components/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotFoundLogs from './NotFoundLogs';
import { useAppState } from '@/app/zus/store';
// import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';


type ScanLogProps = {
  filter?: {
    startDate: string;
    endDate: string;
  }
}
const ScanLog = ({ filter }: ScanLogProps) => {
  const latestScans = useAppState((state) => state.latest_scans);
  const { navigate } = useNavigation();


  // const { data, isSuccess, isLoading, isFetching, error } = useFetchScansQuery({ ...filter });
  const { data, isFetching, isSuccess, error } = useFetchScansQuery({ ...filter });


  /**
   * flashlist render item
   * @param param0 
   * @returns 
   */
  const _renderScan = ({ item }: { item: LatestScan }) => {
    const { tag } = item;
    return (
      <ThemedView noPadding transparent style={styles.itemContainer}>
        <View style={styles.scanImg}>
          <MaterialCommunityIcons size={20} name="line-scan" />
        </View>
        <ThemedView transparent style={{ width: '30%', borderRightWidth: 1, borderColor: 'rgba(231, 232, 231, 1)' }}>
          <ThemedText style={{ paddingVertical: 5 }} family='regular' size={12}>Tag</ThemedText>
          <ThemedText size={14} family='medium'>{tag?.name}</ThemedText>
        </ThemedView>
        <ThemedView transparent style={{ width: '50%', backgroundColor: 'blue', }}>
          <ThemedText style={{ paddingVertical: 5 }} family='regular' size={12}>Date & time</ThemedText>
          <ThemedText size={12} family='medium'>{item?.scan_date_time as string}</ThemedText>
        </ThemedView>
      </ThemedView>
    )
  }

  let queriedScans = latestScans;
  if (isFetching) {
    return <ActivityIndicator size={32} color={Colors.light.secondary} />
  }
  if (isSuccess && data) {
    queriedScans = data?.data?.scans?.data ?? [];
  }


  return (
    <>
      {
        queriedScans.length > 0 ? (
          <FlatList keyExtractor={(_item, index) => index.toString()} data={queriedScans} renderItem={_renderScan} />
          // <FlashList estimatedItemSize={100} keyExtractor={(_item, index) => index.toString()} data={queriedScans} renderItem={_renderScan} />
        ) : (
          <NotFoundLogs
            title='No scan history available.'
            subTitle="Populate your scan history with meaningful data—start tracking now with the 'Scan Now' button."
            btnText='Scan now'
            handleClick={() => navigate('ScanQr')} />
        )
      }

    </>

  );
}

export default ScanLog

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