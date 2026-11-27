import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useColors } from '@/theme/tokens';
import { Text } from './Text';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const colors = useColors();
  return (
    <View style={[styles.section, { borderTopColor: colors.border }]}>
      <Text variant="h2">{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 14, paddingTop: 24, borderTopWidth: 1 },
});
