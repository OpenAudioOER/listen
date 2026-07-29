export interface Timestamp {
  time: string;
  label: string;
}

export interface ResourceLink {
  platform: 'Spotify' | 'Apple Podcasts' | 'YouTube';
  url: string;
}

export interface ChapterData {
  chapterNumber: number | string;
  courseTitle: string;
  title: string;
  subtitle: string;
  description: string;
  textbookUrl: string;
  audioEmbedUrl: string;
  resourceLinks: ResourceLink[];
  timestamps: Timestamp[];
}

export interface ThemeColors {
  brand50: string;
  brand100: string;
  brand500: string;
  brand600: string;
  brand700: string;
  brand900: string;
  accent500: string;
  accent600: string;
  accent700: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  coverImageWide: string;
  theme: ThemeColors;
  chapters: ChapterData[];
}