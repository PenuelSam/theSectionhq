"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import BG from "../assets/SCTN-BG.jpg";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface BannerProps {
  shouldAnimate: boolean;
}

export default function Banner({ shouldAnimate }: BannerProps) {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const circleTextRef = useRef(null);

  useLayoutEffect(() => {
    if(!shouldAnimate) return ;
    const imageEl = imageRef.current;
    const textEl = textRef.current;
    const container = containerRef.current;
    const circleText = circleTextRef.current;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    // === TEXT REVEAL ON LOAD ===
    const mySplit = new SplitText(textEl, {
      type: "lines",
      linesClass: "lineChild",
    });

    const introTl = gsap.timeline();

    introTl
      .set(textEl, { opacity: 1 })
      .from(mySplit.lines, {
        y: 150,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.15,
      })
      .to(
      imageEl,
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "+=0.5" // wait a beat after text
    );

    if (isDesktop) {
      // Desktop: animate image
      // introTl.from(
      //   imageEl,
      //   {
      //     opacity: 0,
      //     scale: 0.8,
      //     duration: 1.8,
      //     ease: "power3.out",
      //   },
      //   "-=1"
      // );

      // === SCROLL ANIMATION ON DESKTOP ONLY ===
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom+=100%",
          scrub: true,
          pin: true,
        },
      });

      scrollTl.to(imageEl, {
        width: "100vw",
        height: "100vh",
        scale: 1,
        ease: "power2.out",
      });

      scrollTl.to(
        textEl,
        {
          y: -150,
          ease: "power2.out",
        },
        "<"
      );
    } else {
       // === MOBILE: CIRCULAR TEXT REVEAL AFTER TEXT ===
      introTl.to(circleText, {
        opacity: 1,
        duration: 1,
        onStart: () => {
          gsap.to(circleText, {
            rotation: 360,
            repeat: -1,
            ease: "linear",
            duration: 10,
            transformOrigin: "50% 50%",
          });
        },
      });
    }
  }, [shouldAnimate]);

  

  return (
    <div
      ref={containerRef}
      className="w-full h-screen md:bg-black flex flex-col md:flex-row items-center justify-center relative overflow-hidden"
    >
      {/* Text Content */}
      <div
        ref={textRef}
        className="text-center md:max-w-[990px] md:mx-auto md:w-full w-[98%]  opacity-0 md:leading-[120px] leading-[50px] md:text-white z-10"
      >
        <h1 className="md:text-[120px] text-[50px] font-HelveticaBlack">
          Section Studio
        </h1>
        <p className="md:text-[120px] text-[50px] font-HelveticaBold">
          Where the culture cuts deep!
        </p>
      </div>

      {/* DESKTOP IMAGE */}
      <div
        ref={imageRef}
        className="hidden md:block fixed z-20 opacity-0"
        style={{
          width: "300px",
          height: "200px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src={BG}
          alt="Banner Image"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* MOBILE CIRCULAR TEXT */}
      <div ref={circleTextRef} className="block md:hidden w-[200px] h-[200px] relative top-15 opacity-0">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
        >
          <defs>
            <path
              id="circlePath"
              d="
                M 100, 100
                m -75, 0
                a 75,75 0 1,1 150,0
                a 75,75 0 1,1 -150,0
              "
            />
          </defs>
          <text
            fontSize="16"
            fill="black"
            className="uppercase tracking-widest"
          >
            <textPath href="#circlePath" startOffset="0%">
              Section Studio • Where the culture cuts deep •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
