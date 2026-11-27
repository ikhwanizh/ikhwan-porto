import type { Award, Education } from './types';

export const education: Education[] = [
  {
    id: 'uny',
    school: 'Universitas Negeri Yogyakarta (UNY)',
    program: 'Information Technology',
    start: 'Sep 2020',
    end: 'Dec 2024',
    notes: [
      'GPA 3.86 / 4.00.',
    ],
  },
  {
    id: 'uthm',
    school: 'Universiti Tun Hussein Onn Malaysia',
    program: 'Inbound credit transfer, Project Management',
    start: 'Aug 2023',
    end: 'Oct 2023',
    notes: [],
  },
];

export const awards: Award[] = [
  { date: 'Nov 2025', title: '2nd Best Capstone Project', event: 'BEKUP Create 2025, Kemenekraf' },
  { date: 'Nov 2024', title: 'Top 5', event: 'ICStar Hackathon, One Indonesia' },
  { date: 'May 2024', title: '3rd place, Smart City', event: 'Unity Competition, UNY' },
  { date: 'May 2024', title: '3rd place, Software Development', event: 'Unity Competition, UNY' },
  { date: 'Jun 2023', title: 'Finalist, Digital Education Technology Innovation', event: 'LIDM, Puspresnas' },
  { date: 'May 2023', title: '2nd place, Software Development', event: 'Unity Competition, UNY' },
  { date: 'Oct 2022', title: '1st place', event: 'UNY Cartesion 2022' },
  { date: 'Jun 2022', title: '2nd place', event: 'Sahabat Ganjar Hackathon, Yogyakarta' },
  { date: 'Apr 2022', title: '4th place, Al-Qur\'an App Design', event: 'MTQMN, UNY' },
  { date: 'Sep 2021', title: '2nd place, Digital Education Materials', event: 'LIDM, Puspresnas' },
  { date: 'May 2021', title: '1st place, Software Development', event: 'Unity Competition, UNY' },
  { date: 'Apr 2021', title: '1st place, Al-Qur\'an App Design', event: 'MTQMN, UNY' },
];
