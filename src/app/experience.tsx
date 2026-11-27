import { PageShell, pageMetadata } from '@/components/PageShell';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { experience } from '@/content/experience';

export function generateMetadata() {
  return pageMetadata('Experience', 'Professional and academic AI research experience across mobile, backend, and on-device inference.');
}

export default function ExperiencePage() {
  return (
    <PageShell narrow>
      <Text variant="title">Experience</Text>
      {experience.map((item) => (
        <Section key={item.id} title={item.org}>
          <Text variant="h3">{item.role}</Text>
          <Text variant="label" tone="muted">{item.start}–{item.end}{item.place && ` · ${item.place}`}</Text>
          {item.bullets.map((bullet) => <Text key={bullet}>{bullet}</Text>)}
        </Section>
      ))}
    </PageShell>
  );
}
