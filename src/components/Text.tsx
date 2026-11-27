import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { fontFamily, useColors } from '@/theme/tokens';

const variants = {
  title: { fontSize: 40, lineHeight: 46, letterSpacing: -1.2, fontWeight: '700' },
  h2: { fontSize: 24, lineHeight: 32, letterSpacing: -0.45, fontWeight: '700' },
  h3: { fontSize: 18, lineHeight: 25, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 26 },
  label: { fontSize: 14, lineHeight: 21, fontWeight: '600' },
} satisfies Record<string, TextStyle>;

const headingLevels = { title: 1, h2: 2, h3: 3, body: undefined, label: undefined } as const;

export function Text({ variant = 'body', tone = 'text', style, ...props }: TextProps & {
  variant?: keyof typeof variants;
  tone?: 'text' | 'muted' | 'accent';
}) {
  const colors = useColors();
  const level = headingLevels[variant];
  return (
    <RNText
      accessibilityRole={level ? 'header' : undefined}
      aria-level={level}
      {...props}
      style={[{ color: colors[tone], fontFamily }, variants[variant], style]}
    />
  );
}
