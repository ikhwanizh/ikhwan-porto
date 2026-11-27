export const categories = ['Research', 'Applied AI', 'Edge AI', 'Generative AI', 'Backend', 'Mobile'] as const;

type CoverAsset = number | { uri: string };

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
  card: {
    title: string;
    label: string;
    detail: string;
    cover: { light: CoverAsset; dark: CoverAsset };
  };
  filters: readonly (typeof categories)[number][];
  role?: string;
  organization?: string;
  duration?: string;
  status: string;
  stack: readonly string[];
  metrics?: readonly { value: string; label: string }[];
  metricContext?: string;
  pipeline: readonly string[];
  figure?: { source: number; alt: string; caption: string; aspectRatio: number };
  sections: readonly { title: string; text: string }[];
}

export const projects: readonly Project[] = [
  {
    slug: 'indoor-localization',
    card: {
      title: 'Indoor Localization',
      label: 'Deep Learning',
      detail: '7.27 m reported RMSE',
      cover: {
        light: require('../../assets/projects/covers/indoor-localization-light.webp'),
        dark: require('../../assets/projects/covers/indoor-localization.webp'),
      },
    },
    title: 'Multi-Task Deep Learning for Indoor Localization',
    summary: 'Wi-Fi fingerprinting for building, floor, and coordinate prediction. The portfolio reports a coordinate RMSE of 7.27 m.',
    category: 'Research',
    filters: ['Research'],
    role: 'Researcher & Engineer',
    organization: 'National Taiwan University of Science and Technology',
    status: 'Unpublished research',
    stack: ['UJIIndoorLoc', 'Convolutional autoencoders', 'Multi-task learning'],
    metrics: [
      { value: '99.73%', label: 'Building accuracy' },
      { value: '93.43%', label: 'Floor accuracy' },
      { value: '7.27 m', label: 'Coordinate RMSE' },
    ],
    metricContext: 'The portfolio’s UJIIndoorLoc test output reports these three metrics together. The 7.27 m coordinate RMSE was below the project’s 10 m target. The exact test inputs and checkpoint would be needed to reproduce the run.',
    pipeline: ['520 access-point features', 'Preprocessing and augmentation', 'Vector and 23 × 23 inputs', 'Fused representation', 'Multi-task prediction'],
    sections: [
      { title: 'Problem', text: 'Wi-Fi signal strengths are sparse and noisy. Reflections and differences between devices change fingerprints, and similar signals across floors introduce ambiguity.' },
      { title: 'Contribution', text: 'I reviewed published architectures, prepared the dataset, trained model variants, and evaluated building, floor, and coordinate predictions.' },
      { title: 'Method and architecture', text: 'The documented fusion model encodes each fingerprint as both a standardized feature vector and a 23 × 23 grid for a convolutional branch. It combines the branch outputs before sending them to separate heads for building, floor, and coordinate predictions.' },
      {
        title: 'Why this works',
        text: 'The vector branch gives the model access to individual access-point readings, while the convolutional branch learns combinations in the reshaped signal. During training, I dropped some readings and added noise to simulate missing access points and fluctuating signals. The building and floor heads give the shared representation coarse location cues, and the coordinate head trains it to distinguish nearby points. Together, these choices give the model several ways to learn from sparse fingerprints.',
      },
      { title: 'Experiments', text: 'I used LCVAE-CNN and EA-CNN as references when selecting and modifying candidate architectures. I also investigated convolutional autoencoders, attention, LSTMs, and mixtures of experts.' },
      { title: 'Limitations and lessons', text: 'The reported numbers show how the model performed in my experiments. A head-to-head comparison with prior research would require the same data split, preprocessing, and metric definitions. To test what drove the result, I would remove the convolutional branch, the signal augmentation, and the auxiliary classification heads one at a time and measure the change on that same split.' },
    ],
  },
  {
    slug: 'parkinsons-edge-ai',
    card: {
      title: 'Parkinson’s Assessment',
      label: 'Edge AI',
      detail: 'Cross-platform inference',
      cover: {
        light: require('../../assets/projects/covers/parkinsons-edge-ai-light.webp'),
        dark: require('../../assets/projects/covers/parkinsons-edge-ai.webp'),
      },
    },
    title: "Cross-Platform On-Device AI for Parkinson’s Assessment",
    summary: 'Integrated compressed research models into Android and iOS inference pipelines and profiled mobile performance.',
    category: 'Edge AI',
    filters: ['Research', 'Edge AI', 'Mobile'],
    role: 'Mobile AI deployment and benchmarking contributor',
    organization: 'National Taiwan University of Science and Technology',
    status: 'Research prototype',
    stack: ['Kotlin', 'Swift', 'Flutter', 'Apptim', 'Xcode Developer Tools'],
    pipeline: ['Biomechanical sensor data', 'Tensor formatting', 'Native inference', 'Output processing', 'Flutter interface'],
    sections: [
      { title: 'Problem', text: 'The research team needed a way to run compressed models on Android and iOS and observe how inference behaved on mobile hardware.' },
      { title: 'Contribution', text: 'I integrated compressed models, built native Kotlin and Swift inference paths, connected them to a Flutter interface, and profiled the apps with Apptim and Xcode Developer Tools. The work built on the team’s model training and compression research.' },
      { title: 'Architecture', text: 'At a high level, the app formatted biomechanical sensor inputs as tensors, ran inference in each platform’s native runtime, and processed the outputs for the Flutter interface.' },
      {
        title: 'Why this works',
        text: 'I kept the tensor preparation and model calls in the native inference paths while sharing the user interface in Flutter. The native paths let each platform use its own runtime, and the shared interface gives both builds the same place to present results. Profiling the prototype on actual devices let me observe the performance of the integrated app.',
      },
      { title: 'Results', text: 'The prototype demonstrated model integration and performance profiling on both mobile platforms.' },
      { title: 'Limitations and lessons', text: 'A device comparison requires the original logs and exact runtime, model, and device configurations. Clinical performance is outside the scope of this deployment work.' },
    ],
  },
  {
    slug: 'senara',
    card: {
      title: 'Senara',
      label: 'Computer Vision',
      detail: 'Accessible guitar practice',
      cover: {
        light: require('../../assets/projects/covers/senara-light.webp'),
        dark: require('../../assets/projects/covers/senara.webp'),
      },
    },
    title: 'Senara',
    summary: 'An accessible guitar learning companion that uses on-device computer vision and audio guidance for chord practice.',
    category: 'Applied AI',
    filters: ['Applied AI', 'Edge AI', 'Mobile'],
    role: 'Vision and coach-flow engineer',
    organization: 'Apple Developer Academy',
    duration: '45 days',
    status: 'Prototype',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'Create ML', 'Core ML'],
    pipeline: ['Camera frame', 'Chord and fret detection', 'Finger placement check', 'Spoken guidance'],
    figure: {
      source: require('../../assets/projects/senara.jpg'),
      alt: 'Guitar fretboard with detected finger landmarks, string positions, and fret boundaries drawn over the camera image.',
      caption: 'Senara’s prototype debugging view during a chord placement check.',
      aspectRatio: 530 / 406,
    },
    sections: [
      { title: 'Problem', text: 'Blind and low-vision guitar learners need to confirm hand placement and correct individual fingers without relying on a camera preview.' },
      { title: 'Contribution', text: 'I owned computer vision experiments and the coaching flow in a five-person team. I worked on locating fingers on the fretboard, integrating an offline Core ML chord detector, and deciding when the coach should speak.' },
      { title: 'Method and architecture', text: 'The coach checks the whole hand shape first. If it cannot recognize the chord, it checks finger positions against a fret grid and gives one spoken correction at a time.' },
      {
        title: 'Why this works',
        text: 'The whole-hand check answers whether the player is holding the chord. The finger-level fallback answers what to move when the chord is uncertain. Speaking one correction at a time gives the learner a concrete next action without needing to see the screen, and running the detector on-device lets practice continue offline.',
      },
      { title: 'Experiments and results', text: 'I compared hand-landmark classification, per-finger rules, and an on-device detector trained with Create ML. Checks on our camera frames exposed a gap between dataset performance and real practice conditions, including confusion between A and D.' },
      { title: 'Limitations and lessons', text: 'Camera angle, unstable landmarks, and sparse labels limited what the prototype could reliably judge. The next evaluation needs labeled footage from the intended setup and a consistent per-chord test protocol.' },
    ],
  },
  {
    slug: 'silentsql',
    card: {
      title: 'SilentSQL',
      label: 'Generative AI',
      detail: 'LLM evaluation',
      cover: {
        light: require('../../assets/projects/covers/silentsql-light.webp'),
        dark: require('../../assets/projects/covers/silentsql.webp'),
      },
    },
    title: 'SilentSQL',
    summary: 'An experimental workflow for grading model-generated SQL by executing it against test fixtures.',
    category: 'LLM Evaluation',
    filters: ['Generative AI', 'Backend'],
    status: 'Experimental evaluation',
    stack: ['Python', 'SQLite', 'SQL'],
    pipeline: ['Natural-language task', 'Generated SQL', 'SQLite fixture', 'Execution grade'],
    sections: [
      { title: 'Problem', text: 'Different SQL queries can answer the same question. Exact string matching can reject valid answers and miss incorrect queries that look similar to the reference.' },
      { title: 'Method and architecture', text: 'Each task pairs a natural-language question with SQLite fixtures and reference SQL. The Python runner collects a single model response, and the grader compares its executed result with the reference. Validation tests check the grading behavior.' },
      {
        title: 'Why this works',
        text: 'Executing the generated and reference queries against the same data grades the answers they return. A join and a subquery can both pass when they produce the expected result. Fixtures with edge cases help expose plausible-looking SQL that gives the wrong answer, such as a query that drops customers with zero orders.',
      },
      { title: 'Limitations and lessons', text: 'Results are specific to the fixture data and grading rules. Model versions, prompt conditions, trial counts, and run logs are needed before reporting comparative scores.' },
    ],
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
