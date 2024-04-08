"use client";
import { Avatar } from "@nextui-org/react"
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'

export default function LivePage() {

  useEffect(() => {
  }, []);

  const [isShowing, setIsShowing] = useState(false)

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[50px] bg-[#eee] flex justify-between items-center px-[10px]">
        <div className="flex h-[40px] bg-[#aaa] items-center rounded-full pl-[2px] pr-[20px]">
          <Avatar className="w-[36px] h-[36px]" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <div className="text-white flex flex-col ml-[6px]">
            <span className="font-bold text-[12px] leading-[16px]">LinKa</span>
            <span className="text-[10px] leading-[14px]">100 Follow</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar size="sm"src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar size="sm" className="text-white bg-[#333] opacity-60" name="80" />
        </div>
      </div>
      <div className="">
        <video
          id="video"
          className=""
          width="100%"
          autoPlay 
          muted
          loop
          playsInline
          src="https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4"
          >
        </video>
      </div>
      <div className="flex-1 bg-[#aaa] overflow-auto relative">
        <div className="h-[45px] pl-[10px] top-[10px] absolute">
          <Transition
            show={isShowing}
            enter="transition-all duration-[2000ms]"
            enterFrom="translate-y-[50px] opacity-0"
            enterTo="translate-y-[0px] opacity-100"
            leave="transition-all duration-[2000ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-[350px] h-[45px] bg-white rounded-full flex items-center pl-[6px] pr-[20px] text-[14px]">
              <Avatar className="w-[36px] h-[36px]" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div className="ml-2">
                <span className="text-[#aaa]">H***</span>
                <span className="ml-2">Enter the live broadcast room</span>
              </div>
            </div>
          </Transition>
        </div>
        <div className="pl-[20px] pr-[160px] pt-[20px] overflow-y-scroll h-[calc(100%-80px)]">
          <div className="mb-[10px] flex">
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <div className="bg-[#2e3e4e] flex-1 break-all text-white ml-2 p-2 rounded-lg">
              AK777AK777AK777AK777AK77AK777AK777AK77AK777AK777AK777AK77AK777AK777AK777
            </div>
          </div>
          <div className="mb-[10px] flex">
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <div className="bg-[#2e3e4e] flex-1 break-all text-white ml-2 p-2 rounded-lg">
              AK777AK777AK777AK777AK77AK777AK777AK77AK777AK777AK777AK77AK777AK777AK777
            </div>
          </div>
        </div>
        <div className="flex-1 h-[80px] px-[20px] flex items-center">
          <input type="text" placeholder="Say Somethings ..." className="outline-none px-[15px]
            w-full bg-[#201c1b] h-[50px] rounded-full text-[16px] text-white"/>
        </div>
        <div className="bottom-[80px] absolute right-[20px]">
          <div className=" bg-gradient-to-r from-[rgba(233,149,59,1)] to-[rgba(233,149,59,0)]
          rounded-full h-[40px] text-[#fff] flex items-center justify-center text-[13px] mb-[10px]">
            567 Download
          </div>
          <div className="rounded-xl w-[130px] bg-[#fff] py-[10px] px-[15px] flex flex-col items-center">
            {/* <Image src='https://i.pravatar.cc/150?u=a042581f4e29026024d'></Image> */}
            <Avatar className='w-[80px] h-[80px]' radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <div className="mt-1">AK777</div>
            <div className="text-[11px]">Wining Grand</div>
            <div className="text-white bg-[#cb352d] rounded-md w-full py-[4px] text-center mt-1 text-[12px]">Download</div>
          </div>
        </div>
        {/* <button className="mt-[100px]" onClick={() => setIsShowing((isShowing) => !isShowing)}>
          Toggle
        </button> */}
      </div>
    </div>
  );
}
