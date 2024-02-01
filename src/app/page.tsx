"use client"
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
 import workImg from "@/asset/images/icon-work.svg";
 import userImg from "@/asset/images/image-jeremy.png" 
 import playImg from "@/asset/images/icon-play.svg"
 import studyImg from "@/asset/images/icon-study.svg"
 import exerciseImg from "@/asset/images/icon-exercise.svg"
 import socialImg from"@/asset/images/icon-social.svg"
 import clsx from 'clsx';
 import selfImg from "@/asset/images/icon-self-care.svg" 


 import data from "@/asset/data.json"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
export default function Home() {
  const [timeFrame ,setTimeFrame]=useState< "daily" | "weekly"| "monthly">('weekly');
  const styleList=[
    {
       color:"bg-Work",
       icon:workImg
    },
    {
      color:"bg-Play",
      icon:playImg
   },{
    color:"bg-Study",
    icon:studyImg
 },{
  color:"bg-Exercise",
  icon:exerciseImg
},{
  color:"bg-Social",
  icon:socialImg
},{
  color:"bg-SelfCare",
  icon:selfImg
}
  ]
  return (
    <div className="min-h-screen w-full bg-VeryDarkBlue text-white flex flex-col items-center justify-center py-10 px-3"> 
    <main className="max-w-[850px]  grid grid-cols-1 lg:grid-cols-4 gap-5 transition-all" >
      <div className="bg-DarkBlue row-span-2 rounded-xl overflow-hidden flex flex-col items-start ">
        <div className="bg-Blue   px-6 pt-10 pb-16 rounded-xl flex flex-row lg:flex-col gap-8 w-full"> 
        {/* use image */}
        <Image src={userImg} alt="user-image" className="ring-2 h-12 w-12 rounded-full ring-white border-white"/>
        <section className="flex flex-col gap-1">
        <p className="text-PaleBlue text-xs"> Report For</p>
        <h2 className="text-2xl lg:text-3xl font-thin">Jeremy Robson</h2>
        </section>
        </div>
        <div className="flex lg:flex-col gap-4 justify-between px-6 p-4 text-PaleBlue text-sm font-thin items-start flex-row w-full">
          <button className={timeFrame === 'daily' ? "text-white" :""} onClick={()=>setTimeFrame('daily')}>Daily</button>
          <button className={timeFrame === 'weekly' ? "text-white" :""} onClick={()=>setTimeFrame('weekly')}>Weekly</button>

          <button className={timeFrame === 'monthly' ? "text-white" :""} onClick={()=>setTimeFrame('monthly')}>Monthly</button>

        </div>
         </div>
      {data.map((c , i)=>

      {
        let current;
        let previous;
        if(timeFrame ==="daily"){
          current = c.timeframes.daily.current;
          previous = c.timeframes.daily.previous;
        }
        if(timeFrame ==="weekly"){
          current = c.timeframes.weekly.current;
          previous = c.timeframes.weekly.previous;
        }
        if(timeFrame ==="monthly"){
          current = c.timeframes.monthly.current;
          previous = c.timeframes.monthly.previous;
        }
        
        return(
          <>
        {/* {styleList.map((style ,styleIndex)=> ( */}
        <TimeCard color={styleList[i].color} icon={styleList[i].icon} key={i} title={c.title} current={ current ?? 0} previous={previous ?? 0}/>
        {/* ))  */}
        {/* } */}
        </>
        )
      }
        
        
      )}
    </main>
    </div>
  );
}

type TimeCardtype = {
  title:string;
  current: number;
  previous: number;
  color:string;
  icon:string | StaticImport;
}; 

function TimeCard({current , previous ,title ,color ,icon  } : TimeCardtype)
{
  return (
  <div className={clsx("pt-10 rounded-xl overflow-hidden relative" , color)}>
    <Image className="absolute top-[-10px] right-3 z-10 w-auto h-[70px] " src={icon} alt="time-card-img"  />
    <div className="bg-DarkBlue relative z-20  rounded-t-lg p-6 flex flex-col gap-6">
      {/* work */}
      <div className="flex justify-between w-full">
        <p>{title}</p>
        <BsThreeDots className="text-2xl "/>
      </div>
      <section className="lg:flex-col item-center justify-between flex gap-1">
      <h2 className="text-3xl lg:text-4xl font-thin">{current}hrs </h2>
      <p className="text-PaleBlue text-xs" >Last week - {previous}hrs</p>
      </section>
    </div>
  </div>
)}