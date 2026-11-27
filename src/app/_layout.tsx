import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColors } from '@/theme/tokens';

export default function RootLayout() {
  const colors = useColors();
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg }, animation: 'fade' }} />
    </>
  );
}
