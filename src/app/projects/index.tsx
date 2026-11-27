import { View } from 'react-native';
import { PageShell, pageMetadata } from '@/components/PageShell';
import { ProjectGallery } from '@/components/ProjectGallery';
import { Text } from '@/components/Text';

const description = 'Four case studies spanning deep learning research, mobile inference, accessible computer vision, and LLM evaluation.';

export function generateMetadata() {
  return pageMetadata('Projects', description);
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <View style={{ gap: 10 }}>
        <Text variant="title">Projects</Text>
        <Text tone="muted">{description}</Text>
      </View>
      <ProjectGallery />
    </PageShell>
  );
}
