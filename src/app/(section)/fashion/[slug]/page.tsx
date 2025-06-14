import AllSections from "@/app/_components/all-sections";
import { getArticleBySlug, getArticles } from "@/lib/api";
import { formatDate, timeAgo } from "@/lib/date-formatter";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FashionArticle({params,
}: {
 params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
   const article = await getArticleBySlug('fashion', slug);
   const allArticles = await getArticles("fashion");

  if (!article) return notFound();

  const similarArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
  <>
    <article className="container mx-auto w-full px-4 py-8 mt-20">
      <div className="flex md:gap-6 md:items-stretch md:h-[600px]">
        
        <div className="flex flex-col justify-between w-full md:w-1/2 border-t border-[#898989] pt-4 h-full">
          <h1 className="md:text-[50px] text-[20px] leading-[20px] md:leading-[50px] md:pr-4 font-HelveticaBold font-bold mb-4">
            {article.excerpt}
          </h1>
          
        {/* Mobile Image Column */}
          <div className="w-full h-full md:hidden block">
          <div className="w-full h-full">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={600}
              height={600}
              layout="responsive"
              className="rounded-lg object-cover object-top w-full h-full"
            />
          </div>
        </div> 
        
          <div className="w-full flex items-center justify-between md:pt-0 pt-4">
            <p className="md:text-[18px] text-[13px] text-[#898989] font-HelveticaBold">{article.title}</p>
            <p className="md:text-[18px] text-[14px] hidden md:block text-[#898989] font-HelveticaBold">{formatDate(article.date)}</p>
            <p className="md:text-[18px] text-[13px] text-[#898989] font-HelveticaBold">{timeAgo(article.date)}</p>
          </div>
        </div>

        {/* Desktop Image Column */}
        <div className="w-1/2 h-full hidden md:block">
          <div className="w-full h-full">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={600}
              height={600}
            
              className="rounded-lg object-cover object-top w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="md:w-[70%] w-full md:mt-20 mt-10">
        <div className="flex flex-col gap-10">
          {article.content.map((section, index) => (
            <div key={index} className=" flex flex-col gap-2">
              {section.section1.map((text, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: text }} className="text-[16px] leading-[25px] font-HelveticaMid" />
              ))}
              {section.section2.map((text, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: text }} className="text-[16px] leading-[25px] font-HelveticaMid" />
              ))}
            </div>
          ))}

          {article.content.map((section, index) => (
            <div key={index} className=" flex flex-col gap-2">
              {section.section1.map((text, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: text }} className="text-[16px] leading-[25px] font-HelveticaMid" />
              ))}
              {section.section2.map((text, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: text }} className="text-[16px] leading-[25px] font-HelveticaMid" />
              ))}
            </div>
          ))}
        </div>

      </div>


      <div className="mt-15 mb-10 w-full flex flex-col items-start gap-6 border-t border-[#898989]">
            <h1 className="text-[40px] leading-[40px] font-HelveticaBold py-5">Similar Articles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarArticles.map((article, index) => (
              <Link
                href={`/fashion/${article.slug}`}
                key={index}
                className=" group border-t border-[#898989] flex flex-col gap-6 mb-5"
              >
                 <div className="mt-2">
                   <h2 className=" text-[16px] font-HelveticaBold uppercase">{article.title}</h2>
                   <p className="text-[16px] text-[#898989] font-HelveticaBold">{formatDate(article.date)} - {timeAgo(article.date)}</p>
                 </div>

                 <div>
                <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
               
               <div className="flex flex-col items-start gap-3 mt-3">
                 <p className="text-[17px] leading-[17.5px] font-HelveticaBlack">{article.excerpt}</p>
                 <div className=" flex items-center gap-2 border-t border-[#898989] w-[100px]">
                    <p className="w-2 h-2 rounded-full bg-[#898989] group-hover:bg-[#ff6640]"></p>
                    <p className="text-[12px] font-HelveticaBold">Read Article</p>
                 </div>
                </div>
                </div>
              </Link>
            ))}
          </div>
      </div>

    </article>

    <AllSections />
  </>

);
} 