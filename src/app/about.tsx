import { View } from 'react-native';
import { PageShell, SiteLink, pageMetadata } from '@/components/PageShell';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { awards, education } from '@/content/education';
import { profile, researchInterests } from '@/content/profile';

export function generateMetadata() {
  return pageMetadata('About', profile.description);
}

export default function AboutPage() {
  return (
    <PageShell narrow>
      <View style={{ gap: 12 }}>
        <Text variant="title">About</Text>
        <Text>{profile.bio}</Text>
      </View>
      <Section title="Education">
        {education.map((item) => (
          <View key={item.id} style={{ gap: 4 }}>
            <Text variant="h3">{item.school}</Text>
            <Text>{item.program} · {item.start}–{item.end}</Text>
            {item.notes.map((note) => <Text key={note} tone="muted">{note}</Text>)}
          </View>
        ))}
      </Section>
      <Section title="Selected awards">
        {awards.slice(0, 2).map(({ title, event, date }) => (
          <Text key={event}>{title} · {event} · {date}</Text>
        ))}
      </Section>
      <Section title="Research interests">
        <Text>{researchInterests}</Text>
        <SiteLink href="/research">Explore research</SiteLink>
      </Section>
    </PageShell>
  );
}
