"use client";
import { Avatar, Image } from "@nextui-org/react"
import { useEffect, useState, useRef } from 'react';
import { Transition } from '@headlessui/react'

export default function LivePage() {

  // video muted 切换
  const video = useRef(null)
  useEffect(() => {
    video.current = document.getElementById('video')
  }, []);
  const [isMuted, setIsMuted] = useState(true)
  function changeVideoState(state) {
    setIsMuted(state)
    video.current.muted = state
  }

  // 用户进入房间popup
  const [isShowing, setIsShowing] = useState(false)
  const [enterList, setEnterList] = useState([])
  const [currentEnterUser, setCurrentEnterUser] = useState({})
  useEffect(() => {
    const interval = setInterval(() => {
      setEnterList((enterList) => [...enterList, {
        name: 'H***'
      }])
      console.error("enterlist", enterList)
    },3000)
    return () => {
      clearInterval(interval)
    }
  },[])
  useEffect(() => {
    const item = enterList.shift()
    setCurrentEnterUser(item)
    showPopup()
  },[enterList])

  function showPopup() {
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
    }, 2000)
  }

  // 处理chat
  const [chatList, setChatList] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      setChatList((chatList) => [...chatList, {
        msg: 'Hello Hello'
      }])
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  },[])
  useEffect(() => {
    // gundong
    smoothScrollToBottom()
  }, [chatList])

  function smoothScrollToBottom() {
    const scrollableElement = document.getElementById('scrollable-content');
    console.error("scrollableElement.scrollTop", scrollableElement.scrollTop, scrollableElement.scrollHeight)
    scrollableElement?.scrollTo({
      behavior: 'smooth',
      top: scrollableElement.scrollHeight
    });
  }

  // 监听窗口大小 处理浏览器兼容
  const page = useRef(null)
  const resize = () => {
    if (page.current) {
      page.current.style.height = `${window.innerHeight}px`
    }
  }
  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={page} className="h-[100vh] flex flex-col bg-[url('/bg.png')]">
      <div className="h-[50px] flex justify-between items-center px-[10px]">
        <div className="flex h-[40px] items-center rounded-full pl-[2px] pr-[20px]">
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
      <div className="relative">
        <video
          id="video"
          className=""
          width="100%"
          autoPlay 
          muted
          loop
          playsInline
          src="/test.mp4"
        >
        </video>
        <div className="absolute bottom-[10px] left-[20px]">
          {
            isMuted ? 
            <Image onClick={() => changeVideoState(false)} src='/muted.png' width={30} height={30} alt='muted'></Image>:
            <Image onClick={() => changeVideoState(true)} src='/voice.png' width={30} height={30} alt='voice'></Image>
          }
          
        </div>
      </div>
      <div className="flex-1 overflow-auto relative">
        <div className="h-[45px] pl-[10px] top-[10px] absolute z-50 opacity-90">
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
                <span className="text-[#aaa]">{ currentEnterUser?.name }</span>
                <span className="ml-2">Enter the live broadcast room</span>
              </div>
            </div>
          </Transition>
        </div>
        <div id="scrollable-content" className="pl-[15px] pr-[160px] pt-[15px] overflow-y-scroll h-[calc(100%-80px)]">
          {
            chatList.map((item, index) => {
              return (
                <div key={index} className="mb-[10px] flex">
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <div className="bg-[#2e3e4e] flex-1 break-all text-white ml-2 p-2 rounded-lg">
                    { item.msg }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="flex-1 h-[80px] px-[20px] flex items-center">
          <input type="text" placeholder="Say Somethings ..." className="outline-none px-[15px]
            w-full bg-[#201c1b] h-[50px] rounded-full text-[16px] text-white"/>
        </div>
        <div className="bottom-[80px] absolute right-[15px]">
          <div className=" bg-gradient-to-r from-[rgba(233,149,59,1)] to-[rgba(233,149,59,0)]
          rounded-full h-[40px] text-[#fff] flex items-center justify-center text-[13px] mb-[10px]">
            567 Download
          </div>
          <div className="rounded-xl w-[130px] bg-[#fff] py-[10px] px-[15px] flex flex-col items-center">
            {/* <Image src='https://i.pravatar.cc/150?u=a042581f4e29026024d'></Image> */}
            <Avatar className='w-[80px] h-[80px]' radius="md" src="/app-icon.png" />
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
