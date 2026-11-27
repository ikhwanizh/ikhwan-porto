import { Link, usePathname, type Href } from 'expo-router';
import type { Metadata } from 'expo-router/server';
import type { ReactNode } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { profile } from '@/content/profile';
import { fontFamily, useColors } from '@/theme/tokens';
import { Text } from './Text';

const avatar = require('../../assets/avatar/avatar-512.webp');
const coverImage = require('../../assets/cover/cover-pixel-sky.jpeg');

const navigation = [
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
] as const;

export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | ${profile.name}`;
  return { title: fullTitle, description, openGraph: { title: fullTitle, description, type: 'website' } };
}

export function SiteLink({ href, children, primary = false }: { href: Href; children: string; primary?: boolean }) {
  const colors = useColors();
  return (
    <Link href={href} style={[
      styles.link,
      { color: colors.accent },
      primary && [styles.primary, { backgroundColor: colors.text, color: colors.bg }],
    ]}>
      {children}
    </Link>
  );
}

export function PageShell({ children, narrow = false, cover = false }: {
  children: ReactNode;
  narrow?: boolean;
  cover?: boolean;
}) {
  const pathname = usePathname();
  const colors = useColors();
  return (
    <ScrollView style={{ backgroundColor: colors.bg }}>
      <View role="banner" style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={[styles.container, styles.nav]}>
          <Link href="/" accessibilityLabel="Ikhwan Inzaghi, home" style={[styles.brand, { color: colors.text }]}>Ikhwan Inzaghi</Link>
          <View role="navigation" aria-label="Main navigation" style={styles.navLinks}>
            {navigation.map(({ href, label }) => {
              const current = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={current ? 'page' : undefined}
                  style={[styles.navLink, { color: colors.muted },
                    (current || pathname.startsWith(`${href}/`)) && [styles.active, { color: colors.text }]]}
                >
                  {label}
                </Link>
              );
            })}
          </View>
        </View>
      </View>
      {cover && (
        <View nativeID="portfolio-cover" style={styles.cover}>
          {Platform.OS === 'web' ? (
            <img src={coverImage.uri ?? coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Image source={coverImage} resizeMode="cover" accessible={false} style={StyleSheet.absoluteFill} />
          )}
        </View>
      )}
      <View role="main" style={[styles.container, styles.main, narrow && styles.narrow, cover && styles.coveredMain]}>
        {cover && (
          <View style={[styles.avatarFrame, { backgroundColor: colors.bg }]}>
            {Platform.OS === 'web' ? (
              <img src={avatar.uri ?? avatar} alt="" width={88} height={88} style={{ borderRadius: 8 }} />
            ) : (
              <Image source={avatar} style={styles.avatar} accessible={false} />
            )}
          </View>
        )}
        {children}
      </View>
      <View role="contentinfo" style={[styles.container, styles.footer, { borderTopColor: colors.border }]}>
        <Text variant="label" tone="muted">{profile.name}</Text>
        <View style={styles.navLinks}>
          <SiteLink href={`mailto:${profile.email}`}>Email</SiteLink>
          <SiteLink href={profile.github}>GitHub</SiteLink>
          <SiteLink href={profile.linkedin}>LinkedIn</SiteLink>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 900, alignSelf: 'center', paddingHorizontal: 24 },
  header: { borderBottomWidth: 1 },
  nav: { paddingVertical: 4, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 24 },
  navLinks: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, alignItems: 'center' },
  brand: { fontFamily, fontSize: 15, fontWeight: '700', paddingVertical: 10 },
  navLink: { fontFamily, fontSize: 14, fontWeight: '600', paddingVertical: 10 },
  active: { textDecorationLine: 'underline' },
  cover: { height: 200, width: '100%', backgroundColor: '#4d6a9a' },
  avatarFrame: { width: 96, height: 96, padding: 4, borderRadius: 12 },
  avatar: { width: '100%', height: '100%', borderRadius: 8 },
  main: { paddingTop: 36, paddingBottom: 64, gap: 34 },
  coveredMain: { paddingTop: 0, marginTop: -48, gap: 20 },
  narrow: { maxWidth: 760 },
  footer: { paddingVertical: 24, borderTopWidth: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  link: { fontFamily, fontSize: 15, fontWeight: '600', textDecorationLine: 'underline', paddingVertical: 10 },
  primary: { textDecorationLine: 'none', borderRadius: 5, paddingHorizontal: 12, paddingVertical: 10 },
});
