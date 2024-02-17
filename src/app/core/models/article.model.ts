export interface ArticleDTO{
  articles: Article[];
  articlesCount: number;
}
export interface Article{
  slug: string,
  title: string,
  description: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  expand: boolean,
  hasExpand: number,
  tagList: string[],
  author: {
    username: string,
    bio: string,
    image: string,
  }
}

export interface ArticleAdd{
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
