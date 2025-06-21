export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}