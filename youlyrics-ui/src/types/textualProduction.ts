import type { User } from '@/types/user';

export type TextualProduction = {
  id: string;
  title: string;
  author: User;
  content: string[][];
  literaryGenre: string;
  description?: string;
};
