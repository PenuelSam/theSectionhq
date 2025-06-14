import {useEffect, useRef} from 'react'
import gsap from 'gsap';

export  const MenuToggle = ({ open, toggle }: { open: boolean; toggle: () => void }) => {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);

  useEffect(() => {
    if (!top.current || !middle.current || !bottom.current) {
      return;
    }

    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

    if (open) {
      tl.to(top.current, { rotate: 45, y: 8 })
        .to(middle.current, { opacity: 0 }, "<")
        .to(bottom.current, { rotate: -45, y: -5 }, "<");
    } else {
      tl.to(top.current, { rotate: 0, y: 0 })
        .to(middle.current, { opacity: 1 }, "<")
        .to(bottom.current, { rotate: 0, y: 0 }, "<");
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div className="cursor-pointer w-8 h-4 relative z-[1000]" onClick={toggle}>
      <span
        ref={top}
        className="block absolute h-[3px] w-full bg-black rounded transition-all origin-center"
      />
      <span
        ref={middle}
        className="block absolute h-[3px] w-full bg-black rounded top-[50%] translate-y-[-50%] transition-all origin-center"
      />
      <span
        ref={bottom}
        className="block absolute h-[3px] w-full bg-black rounded bottom-0 transition-all origin-center"
      />
    </div>
  );
};
