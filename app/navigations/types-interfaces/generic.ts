import {
  DefaultNavigatorOptions,
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
// import {
//   StackNavigationEventMap,
//   StackNavigationOptions,
// } from '@react-navigation/stack';
// generic typing for stack navigator options

export type StackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >;

// generic stack routes type
export type StackRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >
>;
