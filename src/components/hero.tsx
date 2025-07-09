import { formatDate, timeAgo } from '@/lib/date-formatter';
import {  getFirstLatestArticle } from '@/lib/latestArticles';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function Hero() {

  const {article, section} = await getFirstLatestArticle();

      return (
    <div className='container mt-32 mb-10  w-full h-full mx-auto px-4 md:px-8'>
      <div className='block md:hidden'>
        <h1 className='md:text-[80px] text-[40px] text-center font-HelveticaBold text-[#333] leading-[40px] md:leading-[80px] uppercase tracking-tighter md:py-10 py-5 mb-5'>Section Studio</h1>
      </div>


       <div className=' w-full h-[500px] flex  items-center justify-between gap-5'>
      <div className='md:w-1/2 w-full h-full flex md:flex-col flex-col-reverse  justify-between gap-4 md:gap-0 md:px-2 md:border-t'>
        <div className="flex flex-col  md:items-end md:gap-5 gap-2">
        <h1 className="md:text-[40px] text-[25px] md:text-end font-HelveticaBold leading-[25px] md:leading-[40px] pt-2">{article.excerpt}</h1>
        {article.content.map((sectionBlock, index) => {
                    const text = sectionBlock.section1[0];
                    const charLimit = 200;
                    const isLong = text.length > charLimit;
                    const preview = isLong ? text.slice(0, charLimit) + "..." : text;

                  return (
                    <div key={index} className="flex flex-col md:items-end gap-1">
                      
                        <Link
                          href={`/${section}/${article.slug}`}
                          
                        >
                       <p className="text-[16px] text-[#333] leading-[17.5px] md:text-end font-HelveticaMid">
                        {preview}
                         </p>
                        </Link> 
                    </div>
                  );
                })}
        </div>
      <div className='w-full h-full block md:hidden  relative'>
        <Image src={article.coverImage} alt="hero-image" fill quality={100} className=" w-full h-full object-cover rounded-lg shadow-lg" />
      </div>
      <div className='w-full hidden md:flex items-center justify-between'>
      <p className='text-[18px] font-HelveticaReg text-[#898989]'>{article.title}</p>
        <p className='md:text-[18px] text-[14px] font-HelveticaReg text-[#898989] '> <span> {formatDate(article.date)}</span></p>
              <p className='md:text-[18px] text-[14px] font-HelveticaReg text-[#898989] '><span> {timeAgo(article.date)}</span></p>
      </div>
      </div>

      <div className='w-1/2 h-full hidden md:block relative'>
        <Image src={article.coverImage} alt="hero-image" fill  quality={100} className=" w-full h-full object-cover rounded-lg shadow-lg" />
      </div>

      </div> 

    </div>
  )
}
