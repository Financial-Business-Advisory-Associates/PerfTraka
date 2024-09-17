import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './dashboard';

// import { ISuccessMessageProps, TransactionTab } from '../shared';
// import { MainTabParamList } from './main-tab';

export type ModalsStackParamList = {
  AddSecurityGuard: undefined;
  CreateAttendance: undefined;
  // WithdrawalModal: { investment: IInvestmentProfile };

  // RequestVirtualAccount: undefined;
  // VirtualAccount: undefined;
  // CopyReferralsLink: undefined;

  // Success: { successInfo: ISuccessMessageProps }; // for dev dummy screens only

  // // view more modal screens
  // ViewMoreTransactions: { activeTab: TransactionTab };
  // ViewMoreWithdrawals: undefined;

  // settings screen modals
};

export type ModalsStackScreenProps<Screen extends keyof ModalsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ModalsStackParamList, Screen>,
    BottomTabScreenProps<MainTabParamList>
  >;
