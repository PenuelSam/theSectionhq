"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Filter() {
    const [open, setOpen] = useState(false);
     const containerRef = useRef<HTMLDivElement>(null);
     const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

 useEffect(() => {
    if (!containerRef.current) return;

    if (open) {
      gsap.set(containerRef.current, { display: "block" }); // make sure it's visible
      gsap.fromTo(
        containerRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(containerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (containerRef.current) {
            gsap.set(containerRef.current, { display: "none" }); // hide after animation
          }
        },
      });
    }
  }, [open]);

  const sections = ["art", "fashion", "film", "music", "travel"];

  const currentSection = pathname.split("/")[1] || "all";

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      router.push(`/`);
    } else {
      router.push(`/${selectedValue}`);
    }
  };

  return (
    <>
     <div className="w-[400px] border-t hidden md:block">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <p className="text-[14px] font-HelveticaBold">Filter articles by</p>
      </div>

      <div className="mt-4  flex justify-between border-t">
        {sections.map((section) => (
          <div key={section} className={`flex items-center gap-3 `}>
            <input
              type="radio"
              name="filter"
              value={section}
              id={`filter-${section}`}
              onChange={handleFilterChange}
              checked={currentSection === section}
              className="w-2 h-2 accent-black" // Tailwind styling
            />
            <label
              htmlFor={`filter-${section}`}
              className={`text-[14px] font-HelveticaBold cursor-pointer ${
                currentSection === section ? "text-black" : "text-[#898989]"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </label>
          </div>
        ))}
        
      </div>
    </div> 

    <div className="md:w-[400px] w-[90%] block md:hidden fixed bottom-5 left-0 right-0 mx-auto  z-50">
        <div ref={headerRef} className="flex items-center justify-center gap-2 bg-black text-white rounded-full cursor-pointer p-2" onClick={() => setOpen((prev) => !prev)}>
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <p className="text-[14px] font-HelveticaBold">{ open ? `Close articles` : `Filter articles by` }</p>
        </div>

          <div ref={containerRef} className="overflow-hidden mt-4 bg-[#f7f7f7] rounded-lg p-4"
          style={{ display: "none", height: 0, opacity: 0 }}
          >
            {sections.map((section) => (
              <div key={section} className={`flex items-center gap-3 border-t border-[#898989] py-1`}>
                <input
                  type="radio"
                  name="filter"
                  value={section}
                  id={`filter-${section}`}
                onChange={handleFilterChange}
                checked={currentSection === section}
                className="w-2 h-2 accent-black" // Tailwind styling
                />
                <label
                htmlFor={`filter-${section}`}
                className={`text-[14px] font-HelveticaBold cursor-pointer ${
                    currentSection === section ? "text-black" : "text-[#898989]"
                }`}
                >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                </label>
                </div>
            ))}
        </div>
       
    </div>
    </>
  );
}
