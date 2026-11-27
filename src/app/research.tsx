import { View } from 'react-native';
import { PageShell, pageMetadata } from '@/components/PageShell';
import { ProjectCards } from '@/components/ProjectGallery';
import { Publication } from '@/components/Publication';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { researchInterests } from '@/content/profile';
import { projects } from '@/content/projects';

export function generateMetadata() {
  return pageMetadata('Research', researchInterests);
}

const researchProjects = projects.filter(({ filters }) => filters.includes('Research'));

export default function ResearchPage() {
  return (
    <PageShell>
      <View style={{ gap: 10 }}>
        <Text variant="title">Research</Text>
        <Text tone="muted">{researchInterests}</Text>
      </View>
      <Section title="Research case studies">
        <ProjectCards items={researchProjects} />
      </Section>
      <Publication />
    </PageShell>
  );
}
