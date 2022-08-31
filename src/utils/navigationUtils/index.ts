import { TransitionPresets } from '@react-navigation/stack';
export const screenOptions = {
    headerShown: false,
    gestureEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
};
