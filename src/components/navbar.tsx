"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar(){
    const navRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);
    
    return(
        <div ref={navRef} className=" mt-5 mx-auto  w-[95%] md:w-[98%]   bg-black text-white z-[999] fixed top-0 right-0 left-0 rounded-[18px] p-3 md:p-5 flex items-center justify-between">
        <div className="grid grid-cols-2">
        <p className="text-[14px] md:text-[18px] font-HelveticaBlack  leading-none">S</p>
        <p className="text-[14px] md:text-[18px] font-HelveticaBlack  leading-none">C</p>
        <p className="text-[14px] md:text-[18px] font-HelveticaBlack  leading-none">T</p>
        <p className="text-[14px] md:text-[18px] font-HelveticaBlack  leading-none">N</p>
      </div>
            <div>
                <p>menu</p>
            </div>
        </div>
    )
}