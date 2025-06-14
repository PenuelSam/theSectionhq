export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: {
    section1: string[];
    section2: string[];
  }[];
}
