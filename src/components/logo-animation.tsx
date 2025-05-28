'use client'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type LogoAnimationProps = {
  onComplete?: () => void;
};

export default function LogoAnimation({ onComplete }: LogoAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(true)

  const containerRef = useRef(null)
  const sRef = useRef(null)
  const cRef = useRef(null)
  const tRef = useRef(null)
  const nRef = useRef(null)

  useGSAP(() => {
    if (!showAnimation) return

    // Pre-position + hide the letters
    gsap.set(sRef.current, { x: '-100vw', y: '-100vh', rotation: -720 })
    gsap.set(cRef.current, { x: '100vw', y: '-100vh', rotation: 720 })
    gsap.set(tRef.current, { x: '-100vw', y: '100vh', rotation: -360 })
    gsap.set(nRef.current, { x: '100vw', y: '100vh', rotation: 360 })

    const tl = gsap.timeline({ defaults: { duration: 4, ease: 'power4.out' } })

    tl.to(sRef.current, { x: 0, y: 0, rotation: 0, opacity: 1 })
      .to(cRef.current, { x: 0, y: 0, rotation: 0, opacity: 1 }, '<')
      .to(tRef.current, { x: 0, y: 0, rotation: 0, opacity: 1 }, '<')
      .to(nRef.current, { x: 0, y: 0, rotation: 0, opacity: 1 }, '<')
      .to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5,
        onComplete: () => {
          setShowAnimation(false);
          onComplete?.();
        },
      })
  }, { scope: containerRef })

  if (!showAnimation) return null

  return (
    <div ref={containerRef} className="w-full h-screen fixed inset-0 z-[999] bg-white overflow-hidden flex items-center justify-center">
      <div className="grid grid-cols-2 relative">
        <p ref={sRef} className="text-[70px] font-HelveticaBlack text-black leading-none opacity-0">S</p>
        <p ref={cRef} className="text-[70px] font-HelveticaBlack text-black leading-none opacity-0">C</p>
        <p ref={tRef} className="text-[70px] font-HelveticaBlack text-black leading-none mt-[-16px] opacity-0">T</p>
        <p ref={nRef} className="text-[70px] font-HelveticaBlack text-black leading-none mt-[-16px] opacity-0">N</p>
      </div>
    </div>
  )
}
