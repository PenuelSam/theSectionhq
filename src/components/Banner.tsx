"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Banner() {
  const head1Ref = useRef<HTMLHeadingElement>(null);
  const head2Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!head1Ref.current || !head2Ref.current) return;

    const split1 = new SplitText(head1Ref.current, { type: "lines" });
    const split2 = new SplitText(head2Ref.current, { type: "lines" });


    const tl = gsap.timeline();

    tl.to(head1Ref.current, { opacity: 1, duration: 0.01 }); 

    tl.fromTo(
  split1.lines,
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 1.8,
    ease: "power4.out",
  }
)

 .to(head2Ref.current, { opacity: 1, duration: 0.01 }, "-=1")
  .fromTo(
    split2.lines,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 1.8,
      ease: "power4.out",
    },
    "-=1"
  )
  .fromTo(
    imageRef.current,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
    },
    "-=1.5"
  )
  .fromTo(
    circleRef.current,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "-=1.2"
  );


    // Scroll animations
    gsap.to(imageRef.current, {
      position: "absolute",
      width: "100vw",
      height: "100vh",
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    gsap.to([head1Ref.current, head2Ref.current], {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotate: 360,
        repeat: -1,
        ease: "linear",
        duration: 10,
      });
    }

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100vh] hidden relative md:flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          ref={head1Ref}
          style={{ opacity: 0 }}
          className="md:text-[100px] text-[40px] text-center font-HelveticaBold text-black leading-[30px] md:leading-[70px] uppercase tracking-tighter"
        >
          Section Studio
        </h1>

        <div
          ref={imageRef}
          style={{ opacity: 0 }}
          className="w-[50px] h-[25px] absolute z-[100] overflow-hidden rounded-[30px]"
        >
          <video
            src="/asset/bgVid2.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-[30px]"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 pointer-events-none rounded-[30px]" />
        </div>

        <h1
          ref={head2Ref}
          style={{ opacity: 0 }}
          className="md:text-[40px] text-[40px] text-black text-center font-HelveticaBold leading-[30px] md:leading-[60px] capitalize tracking-tighter"
        >
          Where culture cuts deep!
        </h1>
      </div>

      <div className="w-full px-4 md:px-6 flex items-center justify-center absolute bottom-0">
        <div
          ref={circleRef}
          style={{ opacity: 0 }}
          className="relative flex items-center justify-center w-28 h-28"
        >
          <svg className="absolute w-full h-full" viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text fill="#333" fontSize="15" fontFamily="Helvetica, sans-serif">
              <textPath href="#circlePath" startOffset="0%">
                • scroll down • scroll down • scroll down • scroll down • scroll down • scroll down
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
