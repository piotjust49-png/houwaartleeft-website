export type Locale = 'nl';

export type AppPathname = '/';

export interface ProgramItem {
  time: string;
  title: string;
  description?: string;
}

export interface ProgramDay {
  weekday: string;
  day: string;
  month: string;
  tag: string;
  featured?: boolean;
  items: ProgramItem[];
}
