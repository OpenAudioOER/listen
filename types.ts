export interface Timestamp {
  time: string;
  label: string;
}

export interface ResourceLink {
  platform: 'Spotify' | 'Apple Podcasts' | 'YouTube';
  url: string;
}

export interface ChapterData {
  chapterNumber: number;
  courseTitle: string;
  title: string;
  subtitle: string;
  description: string;
  textbookUrl: string;
  audioEmbedUrl: string;
  resourceLinks: ResourceLink[];
  timestamps: Timestamp[];
}

export interface Book {
  id: string;
  title: string;
  description: string;
  chapters: ChapterData[];
}