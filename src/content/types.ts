export interface Experience {
  id: string;
  role: string;
  org: string;
  place?: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
}

export interface Education {
  id: string;
  school: string;
  program: string;
  start: string;
  end: string;
  notes: string[];
}

export interface Award {
  date: string;
  title: string;
  event: string;
}
