import LatestArticle from "@/components/latest-article";
import Hero from "@/components/hero";
import AllSections from "@/app/_components/all-sections";
import TrendingArticle from "@/components/trending-article";
import Single from "@/components/single-latest";


export default function HomePage(){
  return (
    <div className='overflow-x-hidden'>
      <Hero />
      <LatestArticle />
      <Single />
      <TrendingArticle />
      <AllSections />
    </div>
  )
}