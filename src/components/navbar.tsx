"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

import SearchIcon from '@mui/icons-material/Search';
import {MenuToggle} from '@/utils/menu-toggle';
import Link from 'next/link';

export default function Navbar() {
  const navRef = useRef(null);
  const marqueeRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
const searchInputRef = useRef<HTMLInputElement>(null);
const searchWrapperRef = useRef<HTMLDivElement>(null);
const mobileSearchRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  // Animate navbar entrance
  // useLayoutEffect(() => {
  //   gsap.fromTo(
  //     navRef.current,
  //     { y: -100, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1.2,
  //       ease: "power3.out",
  //     }
  //   );
  // }, []);


  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize(); // Initial check
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // Listen for scroll on home only
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

useEffect(() => {
  if (menuOpen && menuRef.current) {
    gsap.to(menuRef.current, {
      height: 0,
      duration: 0.4,
      ease: "power2.in",
      opacity: 0,
      pointerEvents: "none",
    });
    setMenuOpen(false);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname]);


  const toggleMenu = () => {
  if (!menuRef.current) return;

  if (!menuOpen) {
    gsap.to(menuRef.current, {
      height: "auto",
      duration: 0.5,
      ease: "power2.out",
      opacity: 1,
      pointerEvents: "auto",
    });
  } else {
    gsap.to(menuRef.current, {
      height: 0,
      duration: 0.4,
      ease: "power2.in",
      opacity: 0,
      pointerEvents: "none",
    });
  }

  setMenuOpen(!menuOpen);
};

const toggleSearch = () => {
  const isMobile = window.innerWidth < 768;

  if (isMobile && mobileSearchRef.current) {
    if (!searchOpen) {
      gsap.fromTo(
        mobileSearchRef.current,
        { y: -20, opacity: 0, pointerEvents: "none" },
        {
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power3.out",
          onStart: () => setSearchOpen(true),
        }
      );
    } else {
      gsap.to(mobileSearchRef.current, {
        y: -20,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setSearchOpen(false),
      });
    }
  } else if (searchWrapperRef.current) {
    if (!searchOpen) {
      gsap.fromTo(
        searchWrapperRef.current,
        { width: 0, opacity: 0 },
        {
          width: 200,
          opacity: 1,
          duration: 0.8,
          ease: "bounce.out",
          onStart: () => setSearchOpen(true),
        }
      );
    } else {
      gsap.to(searchWrapperRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setSearchOpen(false),
      });
    }
  }
};



  // Determine navbar styling
  const showGloss = isHome ? scrolled : true;
 const topOffset = isHome && !scrolled && isMobile ? "top-[40px]" : "top-0";
 const menudisplay = isHome ? scrolled : true;
 const menuTopClass = isMobile
  ? (menudisplay ? 'top-[50px]' : 'top-[100px]')
  : 'top-[60px]';

  const navLinks = [   
    {
    route: "/",
    name: "Home"
  }, 
    {
      route: "/manifesto",
      name:"Manifesto"
    }, 
    {
      route: "/art",
      name:"Art", 
    },
    {
      route: "/fashion",
      name:"Fashion"
    }, 
    {
      route: "/film",
      name:"Film"
    }, 
    {
      route: "/music",
      name:"Music"
    }, 
      {
        route: "/travel",
        name:"Travel"
      }
    ]

  return (
    <>
      {/*  Marquee only on home */}
      {isHome && (
        <div
          ref={marqueeRef}
          className={`fixed top-0 w-full z-[998] h-[40px] bg-black text-white overflow-hidden block md:hidden transition-all duration-500 ${
            scrolled ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="animate-marquee whitespace-nowrap text-sm font-semibold py-2 px-4">
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
         Welcome to The Section Studio • Where Culture Cuts Deep • Explore Stories, Style & More • Dive In →
          </div>
        </div>
      )}

      {/*  Navbar */}
      <div
        ref={navRef}
        className={`
          fixed z-[999] w-full flex items-center justify-between 
          px-4 md:px-6 pt-4 pb-3 transition-all duration-500
          ${topOffset}
          ${showGloss ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-transparent"}
        `}
      >
        <div className='w-full '>
          <MenuToggle open={menuOpen} toggle={toggleMenu} />
        </div>
      <div className='w-[200px]  flex justify-center'>

        <Link href={`/`}>
        <Image
          src="/asset/SCTN-LOGO.png"
          alt="logo"
          width={100}
          height={100}
           className="w-[200px] h-auto"
            priority
        />
        </Link>
      </div>
        
      <div className="md:flex items-center hidden justify-end gap-2 relative w-full">
      <SearchIcon
    fontSize="large"
    onClick={toggleSearch}
    className="cursor-pointer text-black hover:text-gray-800 transition-colors duration-200"
  />
  <div
    ref={searchWrapperRef}
    className="overflow-hidden w-0 opacity-0"
  >
    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search..."
      className="px-3 py-1  border-b   focus:outline-none  text-sm bg-white transition-all duration-300"
    />
  </div>

  
</div>

 {/* Mobile Search Icon (always visible) */}
  <div className="md:hidden flex items-center w-full justify-end">
    <SearchIcon
      fontSize="large"
      onClick={toggleSearch}
      className="cursor-pointer text-black hover:text-gray-800 transition-colors duration-200"
    />
  </div>

      </div>

      {/* Mobile Search Input - slides in below navbar */}
<div
  ref={mobileSearchRef}
  className={`md:hidden fixed ${menuTopClass} left-0 w-full px-4 py-2 bg-black text-white z-[998] opacity-0 pointer-events-none `}
>
  <input
    type="text"
    placeholder="Search..."
    className="w-full px-4 py-2  bg-black text-white border-b border-white focus:outline-none transition-all duration-300"
  />
</div>

{/* Backdrop */}
  {menuOpen && (
    <div className={`fixed ${menuTopClass} left-0 right-0 bottom-0 z-[997] bg-black/60 backdrop-blur-sm transition-opacity duration-300`} />
  )}
      {/* Collapsible Menu */}
<div
  ref={menuRef}
  className={`fixed ${menuTopClass}  left-0 w-full overflow-hidden  bg-black text-white z-[998] opacity-0 pointer-events-none flex flex-row-reverse justify-between py-10 px-5 md:py-5`}
  style={{ height: 0 }}
>
  <div className='w-[500px] h-[400px] relative md:block hidden '>
    <Image src='/asset/nav-image.png' alt='image' width={500} height={500} className='w-full h-full object-cover object-bottom'/>
  </div>
  <div className="md:w-1/2 w-full flex flex-col  items-start px-6  gap-4 leading-[25px]">
    <h1 className='md:text-[40px] text-[40px] text-center font-HelveticaBold text-[#ffff] leading-[40px] md:leading-[80px] uppercase tracking-tighter  mb-5 border-b'>Explore</h1>
      {
        navLinks.map(({ route, name }) => {
        const isActive = pathname.startsWith(route);


        return (
          <Link
            key={name}
            href={route}
            className={`
              text-[30px] font-HelveticaBlack uppercase transition-colors duration-300
              ${isActive ? "text-[#ff6640]" : "text-white hover:text-[#ff6640]"}
            `}
          >
            {name}
          </Link>
        );
      })
      }
    
  </div>
</div>
    </>
  );
}
