import { Article } from "@/types/article";

export async function getArticles(section: string): Promise<Article[]> {
    const data = await import(`@/data/articles/${section}.json`);
    if (!data) {
        throw new Error(`No articles found for section: ${section}`);
    }
    return data.default;
}

export async function getArticleBySlug(section: string, slug: string): Promise<Article | null> {
    const articles = await getArticles(section);
  return articles.find(article => article.slug === slug) || null;
}