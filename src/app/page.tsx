"use client";
import { useState, useEffect } from "react";
import LogoAnimation from "@/components/logo-animation";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner";

export default function Home() {
   const [showLogo, setShowLogo] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if(!showLogo){
      //Delay navbar reveal a bit
      setTimeout(() => setShowNavbar(true), 300);
      setTimeout(() => setShowBanner(true), 800);
    }
  }, [showLogo])

  return(
    <>
   {showNavbar && <Navbar />}
     <Banner shouldAnimate={showBanner}/>
    <div className="h-[5000px] w-full "></div>
    <LogoAnimation onComplete={() => setShowLogo(false)}/>
    </>
  )
}