"use client";
import { ReactNode, useEffect } from "react";
import Lenis from 'lenis';
import gsap from 'gsap';

export default function LenisProvider({children}: {children: ReactNode}){
    useEffect(() => {
        const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Optional: sync with GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
    },[])
    
    return(
        <>{children}</>
    )
}