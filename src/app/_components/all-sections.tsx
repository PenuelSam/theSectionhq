"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function AllSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    // const sections = gsap.utils.toArray(".panel");

    let totalScrollWidth = 0;
    // let draggableInstance;

    const resizeHandler = () => {
      if (!slider || !container) return;
      totalScrollWidth = slider.scrollWidth - container.offsetWidth;

      gsap.to(slider, {
        x: () => `-${totalScrollWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // Create Draggable and store instance
    const draggableInstance = Draggable.create(slider, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -totalScrollWidth,
        maxX: 0,
      },
      onDrag: () => ScrollTrigger.update(),
    })[0]; // Access the actual instance

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      draggableInstance?.kill(); // Clean up draggable instance safely
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden pt-10">
      <div ref={sliderRef} className="flex will-change-transform">
        {[
          { href: "/art", src: "/asset/art/Abstract-Blurred.jpeg", title: "Art" },
          { href: "/fashion", src: "/asset/Fashion/Moody-Fashion.jpeg", title: "Fashion" },
          { href: "/film", src: "/asset/Film/Cinematic-Motion.jpeg", title: "Film" },
          { href: "/music", src: "/asset/Music/Engrossed-Musician.jpeg", title: "Music" },
          { href: "/travel", src: "/asset/travel/Ocean-Serenity.jpeg", title: "Travel" },
        ].map(({ href, src, title }, idx) => (
          <Link
            key={idx}
            href={href}
            className="panel relative md:w-[400px] w-[150px] h-[400px] md:h-[600px] flex-shrink-0 overflow-hidden"
          >
            <Image
              src={src}
              alt={`${title} Image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            <p className="absolute bottom-[50%] left-[50%] -translate-x-1/2 translate-y-[50%] text-white font-HelveticaBlack md:text-[35px] text-[20px] uppercase">
              {title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
