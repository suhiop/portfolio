export interface Project {
  id: string;
  title: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  description: string;
  year: number;
  category: 'Brand' | 'Digital Contents' | 'Event';
  scope: ('Identity' | 'Graphic' | 'Printed')[];
  featured: boolean;
}

export interface FilterState {
  categories: Set<string>;
  scopes: Set<string>;
  years: Set<number>;
  featured: boolean;
}

export type Category = 'Brand' | 'Digital Contents' | 'Event';
export type Scope = 'Identity' | 'Graphic' | 'Printed';

export const CATEGORIES: Category[] = ['Brand', 'Digital Contents', 'Event'];
export const SCOPES: Scope[] = ['Identity', 'Graphic', 'Printed'];
export const YEARS = [2024, 2023, 2022] as const;
