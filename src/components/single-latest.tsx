import { getSecondLatestArticle } from "@/lib/latestArticles";
import Image from "next/image";
import Link from "next/link";


export default async function Single(){
  const {article, section} = await getSecondLatestArticle();

    return(
      <div className=" bg-[#ff6640] text-white w-full  mb-5 ">
          <div className="container mx-auto w-full flex flex-col md:flex-row md:gap-4 items-center justify-between p-4 md:px-8">
            
              <div className="md:w-1/2 w-full h-[500px]  flex  justify-center">
              
                  <Image 
                    src={article.coverImage}
                    alt={`image`}
                    width={600}
                    height={400}
                    layout="responsive"
                    className=" w-full  h-full object-cover rounded-lg"
                   />
                   
              </div>
             
              <div className="md:w-1/2 w-full md:border-l ">
               <Link href={`/${section}/${String(article.slug)}`}>
              <h1 className="md:text-[20px] py-5 md:pl-5 border-b md:w-[50%] text-[18px] font-HelveticaBold uppercase leading-[18px] md:leading-[20px]">{article.title}</h1>
              
              <p className='text-[18px] pt-3 md:pl-5 leading-[19.5px] md:w-[60%] font-HelveticaReg '>{article.excerpt}</p>
              </Link>
              </div>
          </div>
      </div>
    )
}
