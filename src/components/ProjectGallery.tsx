import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { categories, projects, type Project } from '@/content/projects';
import { pressStyle } from '@/theme/press';
import { useColors } from '@/theme/tokens';
import { Text } from './Text';

// React Native Web exposes dataSet for CSS hooks.
const webGridProps = Platform.select({ web: { dataSet: { projectGallery: true } } });

export function ProjectCards({ items }: { items: readonly Project[] }) {
  const colors = useColors();
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return (
    <View style={styles.grid} {...webGridProps}>
      {items.map(({ slug, card }) => (
        <Link key={slug} href={{ pathname: '/projects/[slug]', params: { slug } }} asChild>
          <Pressable accessibilityRole="link" style={pressStyle(({ hovered, focused, pressed }) => [
            styles.card,
            { borderColor: colors.cardBorder, backgroundColor: colors.surface },
            (hovered || focused || pressed) && { borderColor: colors.accent, backgroundColor: colors.tint },
          ])}>
            <View style={[styles.cover, { backgroundColor: colors.cover }]}>
              {Platform.OS === 'web' && typeof card.cover.light === 'object' && typeof card.cover.dark === 'object' ? (
                <picture style={webPicture}>
                  <source media="(prefers-color-scheme: dark)" srcSet={card.cover.dark.uri} />
                  <img src={card.cover.light.uri} alt="" width={800} height={450} style={webCover} />
                </picture>
              ) : (
                <Image source={card.cover[scheme]} resizeMode="cover" style={StyleSheet.absoluteFill} accessible={false} />
              )}
            </View>
            <View style={styles.cardBody}>
              <Text variant="label" tone="muted">{card.label}</Text>
              <Text variant="h3">{card.title}</Text>
              <Text tone="muted">{card.detail}</Text>
            </View>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const filters = ['All', ...categories] as const;

export function ProjectGallery() {
  const colors = useColors();
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const items = filter === 'All' ? projects : projects.filter((project) => project.filters.includes(filter));
  return (
    <View style={{ gap: 22 }}>
      <View role="group" aria-label="Filter projects by category" style={styles.filters}>
        {filters.map((category) => (
          <Pressable
            key={category}
            accessibilityRole="button"
            aria-pressed={filter === category}
            onPress={() => setFilter(category)}
            style={pressStyle(({ focused, hovered }) => [
              styles.filter,
              (hovered || filter === category) && { backgroundColor: colors.tint, borderColor: colors.border },
              focused && { borderColor: colors.accent },
            ])}
          >
            <Text variant="label" tone={filter === category ? 'text' : 'muted'}>{category}</Text>
          </Pressable>
        ))}
      </View>
      <Text variant="label" tone="muted" accessibilityLiveRegion="polite">
        {items.length} {items.length === 1 ? 'project' : 'projects'}
      </Text>
      <ProjectCards items={items} />
    </View>
  );
}

const webPicture = { position: 'absolute', inset: 0 } as const;
const webCover = { display: 'block', width: '100%', height: '100%', objectFit: 'cover' } as const;

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  card: { flexBasis: 350, flexGrow: 1, flexShrink: 1, minWidth: 0, borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  cover: { width: '100%', aspectRatio: 16 / 9 },
  cardBody: { padding: 14, gap: 4 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filter: { borderWidth: 1, borderColor: 'transparent', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8 },
});
