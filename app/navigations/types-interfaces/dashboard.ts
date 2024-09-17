import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModalsStackParamList } from './modals-stack';

// import { ModalsStackParamList } from './modals-stack';

// used by root navigator for typing params passed to screen
// NOTE: this combines the mainTab params & the account settings params
export type MainTabParamList = {
  Home: undefined;
  Attendance: undefined;
  Scan: undefined;
  // InvestScreenStack: { activeTab: string } | undefined;
};

// used by components for typing props received
export type MainTabScreenProps<Screen extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, Screen>,
    NativeStackScreenProps<DashboardParamList>
  >;

export type DashboardParamList = {
  AddGuard: undefined;
  TakeAttendance: undefined;
  ScanQr: undefined;
  Success: {
    activeScreen: keyof DashboardParamList;
    message?: string;
    data?: { location: keyof DashboardParamList };
  };
  MainTab: undefined;
};

export type DashboardScreenProps<Screen extends keyof DashboardParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DashboardParamList, Screen>,
    BottomTabScreenProps<MainTabParamList>
  >;
