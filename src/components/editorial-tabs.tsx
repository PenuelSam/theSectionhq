"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Article } from "@/types/article";
import { getArticles } from "@/lib/api";
import MasonryGrid from "@/components/MasonryGrid";
import Link from "next/link";

const sections = ["art", "fashion", "film", "music", "travel"];

export default function EditorialTabs() {
  const [activeSection, setActiveSection] = useState("art");
  const [articles, setArticles] = useState<Article[]>([]);
  const [columns, setColumns] = useState(3);
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles(activeSection);
        setArticles(data);
      } catch (error) {
        console.error("Failed to load articles:", error);
        setArticles([]);
      }
    };

    loadArticles();
  }, [activeSection]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );

      gsap.to(containerRef.current, {
        backgroundColor: sectionColors[activeSection] || "#ffffff",
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [articles, activeSection]);

  useEffect(() => {
    const updateColumns = () => {
  if (window.innerWidth < 640) {
    setColumns(1);
    setVisibleCount(1);
  } else if (window.innerWidth < 1024) {
    setColumns(2);
    setVisibleCount(6);
  } else {
    setColumns(3);
    setVisibleCount(6);
  }
};


    updateColumns(); // Call initially
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const sectionColors: Record<string, string> = {
    art: "#AC95FF",      // blue-500
    fashion: "#FF6640",  // orange-500
    music: "#008DFF",    // green-500
    travel: "#01DB84",   // teal-500
    film: "#FEA9A4",     // purple-500
  };

  return (
    <div className="w-full mb-10 mt-20">
     <div className="pl-20 md:px-6 flex md:gap-3 gap-2 mb-5 overflow-x-auto whitespace-nowrap no-scrollbar justify-center md:justify-end  scroll-smooth snap-x">
  {sections.map((section) => (
    <button
      key={section}
      onClick={() => setActiveSection(section)}
      className={`uppercase flex-shrink-0 cursor-pointer snap-start font-HelveticaBold text-[14px] border px-4 flex items-center justify-center rounded-full ${
        activeSection === section
          ? "bg-black text-white"
          : "text-gray-500 hover:text-black"
      } transition-all duration-300`}
    >
      {section}
    </button>
  ))}
</div>

      <div
        ref={containerRef}
        className="w-full transition-colors duration-500"
        style={{ backgroundColor: sectionColors[activeSection] || "#ffffff" }}
      >
        <div className="container mx-auto px-6 py-6">
          <MasonryGrid columns={columns} className="p-6 rounded-xl transition-colors duration-500">
            {articles.slice(0, visibleCount).map((article) => (
              <Link key={article.id} href={`/${activeSection}/${article.slug}`} className="group">
                <div
                  className="break-inside-avoid bg-white p-1 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 mb-6"
                >
                  <Image
                    src={article.coverImage}
                  alt={article.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-md mb-4"
                  style={{ objectFit: "cover" }}
                />
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
          </MasonryGrid>
        </div>
      </div>
    </div>
  );
}
