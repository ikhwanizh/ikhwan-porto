import { publication } from '@/content/profile';
import { SiteLink } from './PageShell';
import { Section } from './Section';
import { Text } from './Text';

export function Publication() {
  return (
    <Section title="Publication">
      <Text variant="h3">{publication.title}</Text>
      <Text tone="muted">{publication.citation}. {publication.contribution}</Text>
      <SiteLink href={publication.url}>Read paper</SiteLink>
    </Section>
  );
}
