import type { User } from '@/entities/user/model/user';

export type TextualProduction = {
  id: string;
  title: string;
  author: User;
  content: string[][];
  literaryGenre: string;
  description?: string;
};
