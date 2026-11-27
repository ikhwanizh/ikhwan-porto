import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { PageShell, pageMetadata, SiteLink } from '@/components/PageShell';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { findProject, projects } from '@/content/projects';
import { useColors } from '@/theme/tokens';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata(_props: unknown, params?: { slug?: string }) {
  const project = params?.slug && findProject(params.slug);
  return project
    ? pageMetadata(project.title, project.summary)
    : pageMetadata('Project', 'AI engineering case study.');
}

export default function ProjectPage() {
  const colors = useColors();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const project = findProject(slug);

  if (!project) {
    return (
      <PageShell narrow>
        <Text variant="title">Project not found</Text>
        <SiteLink href="/projects">All projects</SiteLink>
      </PageShell>
    );
  }

  const details = [
    ['Role', project.role],
    ['Organization', project.organization],
    ['Duration', project.duration],
    ['Tools and methods', project.stack.join(' · ')],
  ];

  return (
    <PageShell narrow>
      <View style={styles.intro}>
        <SiteLink href="/projects">All projects</SiteLink>
        <Text variant="label" tone="accent">{project.category} · {project.status}</Text>
        <Text variant="title">{project.title}</Text>
        <Text tone="muted">{project.summary}</Text>
        <View style={styles.properties}>
          {details.map(([label, value]) => value && (
            <View key={label} style={styles.detail}>
              <Text variant="label" tone="muted" style={styles.propertyLabel}>{label}</Text>
              <Text style={styles.propertyValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      {project.metrics && (
        <Section title="Reported results">
          <View style={styles.details}>
            {project.metrics.map(({ label, value }) => (
              <View key={label} style={[styles.metric, { backgroundColor: colors.tint }]}>
                <Text style={styles.value} tone="accent">{value}</Text>
                <Text>{label}</Text>
              </View>
            ))}
          </View>
          <Text tone="muted">{project.metricContext}</Text>
        </Section>
      )}
      <Section title="System workflow">
        <View role="list" aria-label="Workflow steps" style={styles.pipeline}>
          {project.pipeline.map((step, index) => (
            <View key={step} role="listitem" style={[styles.step, { backgroundColor: colors.tint }]}>
              <Text variant="label" tone="accent">{index + 1}. {step}</Text>
            </View>
          ))}
        </View>
      </Section>
      {project.figure && (
        <View style={styles.figure}>
          <Image
            source={project.figure.source}
            accessible
            accessibilityLabel={project.figure.alt}
            contentFit="contain"
            style={{ width: '100%', aspectRatio: project.figure.aspectRatio }}
          />
          <Text tone="muted">{project.figure.caption}</Text>
        </View>
      )}
      {project.sections.map(({ title, text }) => (
        <Section key={title} title={title}><Text>{text}</Text></Section>
      ))}
    </PageShell>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 12 },
  figure: { width: '100%', maxWidth: 530, gap: 8 },
  details: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  properties: { gap: 4, paddingVertical: 8 },
  detail: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 12, paddingVertical: 4 },
  propertyLabel: { width: 140 },
  propertyValue: { flexBasis: 170, flexGrow: 1, flexShrink: 1 },
  metric: { flexBasis: 150, flexGrow: 1, padding: 16, borderRadius: 6, gap: 8 },
  value: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  pipeline: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  step: { borderRadius: 5, paddingHorizontal: 12, paddingVertical: 8 },
});
