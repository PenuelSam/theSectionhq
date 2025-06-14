"use client";

import { useState, useEffect } from "react";
import { getArticles } from "@/lib/api";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import {formatDate, timeAgo} from "@/lib/date-formatter";
import Filter from "@/app/_components/filter";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // show first 6
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const fetched = await getArticles("art");
      setArticles(fetched);
      setLoading(false);
    }

    fetchArticles();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-8 mt-15">
        <div className="w-full flex items-center justify-center md:justify-between  md:py-10">
            <h1 className="text-[40px] tracking-[0.02em] text-center font-HelveticaBlack uppercase  ">Art</h1>
            <Filter />
        </div>

        <div className="w-full h-[500px] relative">
            <Image src="/asset/Art/Abstract-Blurred.jpeg" alt="Art" fill className="w-full h-full object-cover rounded-lg"  quality={100}/>
        </div>

        <h1 className="md:text-[25px] leading-[25px] text-[18px] font-HelveticaBold my-3 md:my-10">Get a behind-the-scenes look into the world of art through the Section Studio lens: meet up-and-coming artists, learn tips from style insiders and discover what’s next</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article, index) => (
              <Link
                href={`/art/${article.slug}`}
                key={index}
                className=" group border-t border-[#898989] flex flex-col gap-6 mb-5"
              >
                 <div className="mt-2">
                   <h2 className=" text-[16px] font-HelveticaBold uppercase">{article.title}</h2>
                   <p className="text-[16px] text-[#898989] font-HelveticaBold">{formatDate(article.date)} - {timeAgo(article.date)}</p>
                 </div>

                 <div >
                <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
               
               <div className="flex flex-col items-start gap-3 mt-3">
                 <p className="text-[17px] leading-[20px] font-HelveticaBlack">{article.excerpt}</p>
                 <div className=" flex items-center gap-2 border-t border-[#898989] w-[100px]">
                    <p className="w-2 h-2 rounded-full bg-[#898989] group-hover:bg-[#ff6640]"></p>
                    <p className="text-[12px] font-HelveticaBold">Read Article</p>
                 </div>
                </div>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < articles.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
