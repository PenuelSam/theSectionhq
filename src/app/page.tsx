import LatestArticle from "@/components/latest-article";
import Hero from "@/components/hero";
import AllSections from "@/app/_components/all-sections";
// import TrendingArticle from "@/components/trending-article";
import Single from "@/components/single-latest";
import Banner from "@/components/Banner";
// import TabSection from "@/components/editorial-tabs";
import EditorialTabs from "@/components/editorial-tabs";


export default function HomePage(){
  return (
    <div className='overflow-x-hidden'>
      <Banner />
      <Hero />
      <LatestArticle />
      <Single />
      <EditorialTabs />
      <AllSections />
    </div>
  )
}