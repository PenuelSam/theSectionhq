"use client";

import { useEffect, useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { getTrending } from "@/lib/trending-articles";

gsap.registerPlugin(ScrollTrigger, Draggable);

type TrendingItem = {
  section: string;
  article: Article;
};

export default function TrendingArticle() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);

  useEffect(() => {
    async function fetchLatest() {
      const data = await getTrending(6);
      setTrending(data);
      setLoading(false);
    }

    fetchLatest();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const updateDraggable = () => {
      const maxDrag = container.offsetWidth - track.scrollWidth;

      if (draggableRef.current) {
        draggableRef.current.kill();
      }

      draggableRef.current = Draggable.create(track, {
        type: "x",
        bounds: { minX: maxDrag, maxX: 0 },
        inertia: true,
        edgeResistance: 0.8,
        dragClickables: true,
      })[0];
    };

    updateDraggable();
    window.addEventListener("resize", updateDraggable);

    return () => {
      if (draggableRef.current) draggableRef.current.kill();
      window.removeEventListener("resize", updateDraggable);
    };
  }, [trending]);




  return (
    <div className="relative w-full mt-5 mb-20 ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:border-t-0 border-b-[2px] border-[#898989] border-t pt-5 md:pt-0 mb-10">
          <h1 className="md:text-[40px] text-[25px] leading-[25px] md:leading-[40px]  pb-1 md:font-HelveticaBold font-HelveticaMid uppercase">
            Trending
          </h1>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden mx-auto cursor-grab active:cursor-grabbing"
          >
            <div
              ref={trackRef}
              className="flex gap-3 px-4 md:px-14 w-max will-change-transform"
              style={{ touchAction: "pan-y" }} // Important for mobile drag
            >
              {trending.map(({ section, article }) => (
                <Link
                  href={`/${section}/${article.slug}`}
                  key={article.slug}
                  className="group min-w-[200px] max-w-[250px] flex-shrink-0 flex flex-col gap-2"
                >

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
                      <p className="text-[15px] leading-[18px] font-HelveticaBold">{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
