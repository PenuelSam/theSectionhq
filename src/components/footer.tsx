"use client";
import Image from "next/image";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import Link from "next/link";
import { useState } from "react";

export default function Footer(){
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email.trim()) return alert("Enter a valid email.");
        // Later: send to API endpoint or 3rd party service
        alert(`Subscribed with: ${email}`);
        setEmail("");
    };

    return (
        <div className='relative left-0 right-0 bottom-0 w-full bg-black py-10'>
            <div className='container mx-auto px-4 md:px-8 w-full flex flex-col md:items-center gap-5'>
                <div className="w-full flex justify-between flex-col md:flex-row">
                    {/* Left Column */}
                    <div className='md:w-1/2 w-full flex flex-col gap-6'>
                        <div className='w-[60%]'>
                            <Image 
                                src='/asset/logo-white.png' 
                                alt='white logo' 
                                width={400} 
                                height={400} 
                                layout='responsive' 
                                className='object-cover'
                            />
                        </div>

                     
                        <div className='w-full flex flex-col gap-2'>
                            <p className='text-white text-sm font-HelveticaBold uppercase tracking-wide'>Subscribe to our newsletter</p>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='px-4 py-2 text-sm  border-b text-white w-full max-w-[300px] outline-none'
                                />
                                <button
                                    onClick={handleSubscribe}
                                    className='  mt-6 md:text-[25px] text-[18px] text-[#ff6640] font-HelveticaBold uppercase transition-all duration-300'
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        
                    </div>

                    {/* Right Column - Nav Links */}
                    <div className='flex flex-col gap-3 md:pt-0 pt-10'>
                        <Link href='/' className='text-[#ff6640] text-[16px] font-HelveticaBold uppercase'>Home</Link>
                        <Link href='/manifesto' className='text-[#ff6640] text-[16px] font-HelveticaBold uppercase'>Manifesto</Link>
                        <Link href='/' className='text-[#ff6640] text-[16px] font-HelveticaBold uppercase'>Contact</Link>      
                    </div>
                </div>

                {/* Bottom Text */}
                <div className='w-full flex flex-col md:flex-row md:items-center  justify-between  pt-4 gap-5'>
                   
                        {/*Social Icons */}
                        <div className='flex  items-center gap-5 pt-2'>
                            <Link href={`https://www.instagram.com/thesectionhq/`} target="_blank">
                            <InstagramIcon sx={{color: "#ffff", fontSize: '30px'}}/>
                            </Link>
                            <Link href={`https://x.com/thesectionhq`} target="_blank">
                            <XIcon sx={{color: "#ffff", fontSize: '30px'}}/>
                            </Link>
                           <Link href={`https://www.youtube.com/@thesectionhq`} target="_blank">
                            <YouTubeIcon sx={{color: "#ffff", fontSize: '30px'}}/>
                           </Link>
                           <Link href={`https://www.tiktok.com/@thesectionhq`} target="_blank">
                            <MusicNoteOutlinedIcon sx={{color: "#ffff", fontSize: '30px'}}/>
                           </Link>
                        </div>
                   
                   <div className="flex  items-center gap-5">
                     <p className='text-[#ededed] text-[14px] font-HelveticaBold'>thesectionhq &copy; 2025</p>
                    <Link href='https://www.linkedin.com/in/penuel/' target="_blank" className='text-[#ededed] text-[14px] font-HelveticaBold'>Developed by Penuel</Link>
                   </div>
                </div>
            </div>
        </div>
    );
}
