export interface Post {
  id: number;
  title: string;
  description: string;
}

export type PostQuery = {
  page?: number;
  pageSize?: number;
};
