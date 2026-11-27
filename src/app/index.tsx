import { StyleSheet, View } from 'react-native';
import { PageShell, SiteLink, pageMetadata } from '@/components/PageShell';
import { ProjectCards } from '@/components/ProjectGallery';
import { Publication } from '@/components/Publication';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { experience } from '@/content/experience';
import { expertise, profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { useColors } from '@/theme/tokens';

export function generateMetadata() {
  return pageMetadata(profile.title, profile.description);
}

const featuredExperience = ['apple-academy', 'ntust', 'kedata', 'qiscus'];

export default function Home() {
  const colors = useColors();
  return (
    <PageShell cover>
      <View style={styles.hero}>
        <Text variant="title">{profile.name}</Text>
        <View style={styles.property}>
          <Text variant="label" tone="muted">Focus</Text>
          <Text>{profile.title}</Text>
        </View>
        <View style={[styles.callout, { backgroundColor: colors.tint }]}>
          <Text variant="h2">Building intelligent systems through AI and software engineering.</Text>
          <Text tone="muted">{profile.intro}</Text>
        </View>
        <View style={styles.actions}>
          <SiteLink href="/projects" primary>Explore My Work</SiteLink>
          <SiteLink href={profile.resumeUrl}>View Resume</SiteLink>
          <SiteLink href={profile.github}>GitHub</SiteLink>
          <SiteLink href={profile.linkedin}>LinkedIn</SiteLink>
        </View>
      </View>
      <Section title="Expertise">
        <View style={styles.expertise}>
          {expertise.map(({ title, text }) => (
            <View key={title} style={styles.expertiseItem}>
              <Text variant="h3">{title}</Text>
              <Text tone="muted">{text}</Text>
            </View>
          ))}
        </View>
      </Section>
      <Section title="Selected work">
        <ProjectCards items={projects} />
      </Section>
      <Section title="Experience">
        {featuredExperience.map((id) => {
          const item = experience.find((entry) => entry.id === id);
          return item && (
            <View key={item.id} style={styles.role}>
              <Text variant="h3">{item.org}</Text>
              <Text tone="muted">{item.role} · {item.start}–{item.end}</Text>
            </View>
          );
        })}
        <SiteLink href="/experience">Full experience</SiteLink>
      </Section>
      <Publication />
      <Section title="Contact">
        <Text tone="muted">Interested in collaborating on applied AI, deep learning, edge AI, or software engineering?</Text>
        <SiteLink href={`mailto:${profile.email}`}>{profile.email}</SiteLink>
      </Section>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 16 },
  property: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 20 },
  callout: { borderRadius: 6, padding: 16, gap: 8 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 4 },
  expertise: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  expertiseItem: { flexBasis: 240, flexGrow: 1, flexShrink: 1, gap: 5 },
  role: { gap: 3 },
});
