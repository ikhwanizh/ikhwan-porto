import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

/** react-native-web adds hovered and focused to Pressable's state; the native types omit them. */
export type PressState = PressableStateCallbackType & { hovered?: boolean; focused?: boolean };

export function pressStyle(fn: (state: PressState) => StyleProp<ViewStyle>) {
  return (state: PressableStateCallbackType) => fn(state as PressState);
}
