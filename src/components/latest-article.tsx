"use client";

import { useEffect, useState, useRef } from "react";
import { formatDate, timeAgo } from "@/lib/date-formatter";
import { getLatestArticles } from "@/lib/latestArticles";
import Image from "next/image";
import Link from "next/link";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { Article } from "@/types/article"; // Make sure you have this type

type LatestArticleItem = {
  section: string;
  article: Article;
};

export default function LatestArticle() {
  const [latest, setLatest] = useState<LatestArticleItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
 const buttonRef = useRef<HTMLButtonElement>(null);
const fillRef = useRef<HTMLSpanElement>(null);


  useEffect(() => {
    async function fetchLatest() {
      const data = await getLatestArticles();
      setLatest(data);
      setLoading(false);
    }

    fetchLatest();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  useGSAP(() => {

    const btn = buttonRef.current;
    const fill = fillRef.current;

    if (!btn || !fill) return;

    //Hover effect
const onEnter = ()=>
  gsap.to(fill, {
    scaleY: 1,
    duration: 0.6,
    ease: "power2.out",
  });


const onLeave = () =>
  gsap.to(fill, {
    scaleY: 0,
    duration: 0.6,
    ease: "power2.in",
  });


    btn?.addEventListener("mouseenter", onEnter);
    btn?.addEventListener("mouseleave", onLeave);

    

    return () => {
      btn?.removeEventListener("mouseenter", onEnter);
      btn?.removeEventListener("mouseleave", onLeave);
    };

    

  }, [visibleCount, latest.length])

  const visibleArticles = latest.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 md:px-8 mt-10 mb-20">
      <div className="md:border-b-[2px] md:border-t-0 border-[#898989] border-t pt-5 md:pt-0 mb-10">
        <h1 className="md:text-[40px] text-[25px] leading-[25px] md:leading-[40px] pb-1 md:font-HelveticaBold font-HelveticaMid uppercase">
          Latest
        </h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleArticles.map(({ section, article }) => (
              <Link
                href={`/${section}/${article.slug}`}
                key={article.slug}
                className="group border-t border-[#898989] flex flex-col gap-2 mb-5"
              >
                <div className="mt-2">
                  <h2 className="text-[18px] font-HelveticaBold uppercase">{article.title}</h2>
                  <p className="text-[16px] text-[#898989] font-HelveticaBold">
                    {formatDate(article.date)} - {timeAgo(article.date)}
                  </p>
                </div>

                <div>
                  <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
                    <div className="absolute bottom-0 backdrop-blur-md bg-white/60 text-black text-[15px] rounded-bl-lg z-10 px-8 py-1 uppercase font-HelveticaBlack">
                      <p>{section}</p>
                    </div>
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-3 mt-3">
                    <p className="text-[17px] leading-[20px] font-HelveticaBlack">{article.excerpt}</p>
                    <div className="flex items-center gap-2 border-t border-[#898989] w-[100px]">
                      <p className="w-2 h-2 rounded-full bg-[#898989] group-hover:bg-[#ff6640]"></p>
                      <p className="text-[12px] font-HelveticaBold">Read Article</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < latest.length && (
            <div className="text-center mt-5">
              <button
            ref={buttonRef}
            onClick={handleLoadMore}
            className="relative overflow-hidden border cursor-pointer rounded-2xl px-4 py-1 text-black font-HelveticaMid hover:text-white"
          >
            <span
              ref={fillRef}
              className="absolute inset-0 bg-[#ff6640] z-0"
              style={{ transform: "scaleY(0)", transformOrigin: "bottom center", }}
            ></span>
            <span className="relative z-10">load more</span>
          </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
