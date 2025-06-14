
import { Article } from "@/types/article";
import { getArticles } from "./api";


const sections = ["fashion", "film", "music", "travel", "art"];


export async function getTrending(limit = 5): Promise<{ section: string; article: Article }[]> {
  const results = await Promise.all(
    sections.map(async (section) => {
      const articles = await getArticles(section);

      const scored = articles.map(article => {
        const contentLength = article.content.reduce((total, section) => {
          return total + Object.values(section).flat().join(' ').length;
        }, 0);

        const dateScore = new Date(article.date).getTime();
        const trendScore = contentLength * 0.5 + dateScore * 0.000001;

        return { ...article, trendScore, section };
      });

      return scored;
    })
  );

  const allArticles = results.flat();

  const topTrending = allArticles
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, limit)
    .map(({ section, ...article }) => ({
      section,
      article: article as Article,
    }));

  return topTrending;
}
