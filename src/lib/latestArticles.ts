import { Article } from "@/types/article";
import { getArticles } from "./api";

const sections = ["fashion", "film", "music", "travel", "art"];

export async function getLatestArticles(): Promise<{ section: string; article: Article }[]> {
    const results = await Promise.all(
        sections.map(async (section) => {
            const articles = await getArticles(section);
            const sorted = [...articles].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            const latest = sorted[0];
            return {section, article: latest};
        })
    );

    return results;

}

export async function getFirstLatestArticle(): Promise<{ section: string; article: Article }> {
  const allArticlesWithSections = (
    await Promise.all(
      sections.map(async (section) => {
        const articles = await getArticles(section);
        return articles.map((article) => ({ section, article }));
      })
    )
  ).flat();

  allArticlesWithSections.sort(
    (a, b) => new Date(b.article.date).getTime() - new Date(a.article.date).getTime()
  );

  return allArticlesWithSections[0];
}

export async function getSecondLatestArticle(): Promise<{ section: string; article: Article }> {
  const allArticlesWithSections = (
    await Promise.all(
      sections.map(async (section) => {
        const articles = await getArticles(section);
        return articles.map((article) => ({ section, article }));
      })
    )
  ).flat();

  allArticlesWithSections.sort(
    (a, b) => new Date(b.article.date).getTime() - new Date(a.article.date).getTime()
  );

  return allArticlesWithSections[1];
}