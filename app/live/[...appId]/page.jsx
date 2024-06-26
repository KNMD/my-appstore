"use client";
import { Avatar, Image } from "@nextui-org/react"
import { useEffect, useState, useRef } from 'react';
import { Transition } from '@headlessui/react'
// import users from "./users.json"
import AppApi from '@/requests/app'
import videos from "/public/videos.json"
import moment from "moment"
console.error(videos)

export default function LivePage({ params }) {
  // 取随机数
  function randomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getChatTimeRandom() {
    return randomIntInclusive(appData.ext.comment_inverval.min, appData.ext.comment_inverval.max)
  }
  function getPopupTimeRandom() {
    return randomIntInclusive(appData.ext.pop_inverval.min, appData.ext.pop_inverval.max)
  }
  function getRandomComment() {
    const randomIndex = randomIntInclusive(0, appData.ext.comments.length - 1)
    return appData.ext.comments[randomIndex]
  }
  const [appData, setAppData] = useState(null)
  const [roomUsersCount, setRoomUsersCount] = useState(0)
  const [fullUsers, setFullUsers] = useState([])
  useEffect(() => {
    // test 6754f7a8b9c0d1e2f3a4b5c6d7e8f9a0
    
    const appId = params.appId[0]; 
    
    AppApi.getApp(appId).then((appDataSync) => {
      console.error("appDataSync", appDataSync)
      setAppData(appDataSync)
      setRoomUsersCount(appDataSync.ext.roomUsersCount)
      setFullUsers(appDataSync.ext.users)
    })
  }, [])
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

  // 获取video URL
  let playVideos = [{"video_url": appData?.ext.video_url}]
  let currentPlayIndex = 0
  useEffect(() => {
    if(appData) {
      currentPlayIndex = 0
      getVideoUrl()
      changeVideoUrl()
    }
  }, [appData])
  function getVideoUrl() {
    
    if (Object.keys(videos).length != 0) {
      Object.keys(videos).some((timeRange) => {
        const [startTime, endTime] = timeRange.split("-")
        const currentDay = moment().format("YYYY-MM-DD")
        const isBetween = moment().isBetween(`${currentDay} ${startTime}`, `${currentDay} ${endTime}`)
        if(isBetween) {
          playVideos = videos[timeRange]
          return true
        }
        return false
      })
    }
    
  }
  function changeVideoUrl() {
    const currentVideo = playVideos[currentPlayIndex % playVideos.length]
    video.current.src = currentVideo.video_url
    console.error('currentVideo:', currentVideo)
    currentPlayIndex ++
  }
  // 用户进入房间popup
  const [isShowing, setIsShowing] = useState(false)
  const [enterList, setEnterList] = useState([])
  const [currentEnterUser, setCurrentEnterUser] = useState({})
  useEffect(() => {
    if(appData) {
      pushPopUpUser()
    }
  },[appData])
  function pushPopUpUser() {
    const randomTime = getPopupTimeRandom()
    setTimeout(() => {
      const randomUser = fullUsers[randomIntInclusive(0, fullUsers.length - 1)]
      setEnterList((enterList) => [...enterList, {
        avatarUrl: randomUser?.avatarUrl,
        name: randomUser?.nickname || 'H***'
      }])
      setRoomUsersCount( userCount => userCount += 1)
      pushPopUpUser()
    }, randomTime);
  }
  useEffect(() => {
    if(enterList.length) {
      const item = enterList.shift()
      setCurrentEnterUser(item)
      showPopup()
    }
  },[enterList])

  function showPopup() {
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
    }, 3000)
  }
  // 处理chat
  let userIndex = 10
  const [chatList, setChatList] = useState([])
  useEffect(() => {
    if(appData) {
      setChatList(fullUsers.slice(0, 10).map(item => {
        item.msg = getRandomComment()
        return item
      }))
      pushUserComment()
    }
  },[appData])
  function pushUserComment() {
    const randomTime = getChatTimeRandom()
    setTimeout(() => {
      
      const user = fullUsers[userIndex % appData.ext.users.length]
      userIndex ++
      // const randomComments = appData.ext.comments
      // console.log("user: ", appData.ext.users.length)
      setChatList((chatList) => [...chatList, {
        avatarUrl: user.avatarUrl,
        msg: getRandomComment()
      }])
      pushUserComment()
    }, randomTime);
  }
  const [userInput, setUserInput] = useState('')
  function onInputConfirm(event) {
    if (event.key === "Enter") {
      userUserComment(userInput)
      setUserInput("")
      event.target.blur()
    }
  }
  function userUserComment(msg) {
    const avatarUrl = appData.ext.commentUser.avatarUrl
    setChatList((chatList) => [...chatList, {
      avatarUrl,
      msg: msg
    }])
  }
  useEffect(() => {
    // gundong
    smoothScrollToBottom()
  }, [chatList])

  function smoothScrollToBottom() {
    const scrollableElement = document.getElementById('scrollable-content');
    scrollableElement?.scrollTo({
      behavior: 'smooth',
      top: scrollableElement.scrollHeight
    });
  }

  // download 动画
  const [showDownload, setshowDownload] = useState(false)
  const [showDwnloadNumber, setShowDwnloadNumber] = useState(false)
  useEffect(() => { 
    setTimeout(() => {
      setshowDownload(true)
      setTimeout(() => setShowDwnloadNumber(true), 100)
    }, 2000);
  },[])

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

  // 下载apk
  function downloadApk() {
    window.open(appData.ext.download, "_blank")
  }

  return (
    <div ref={page} className="h-[100vh] flex flex-col bg-[url('/bg.png')]">
      <div className="h-[50px] flex justify-between items-center px-[10px]">
        <div className="flex h-[40px] items-center rounded-full pl-[2px] pr-[20px] bg-[rgba(0,0,0,.5)]">
          <Avatar className="w-[36px] h-[36px]" src={appData?.ext.liveRoomInfo.avatarUrl} />
          <div className="text-white flex flex-col ml-[6px]">
            <span className="font-bold text-[12px] leading-[16px]">{appData?.ext.liveRoomInfo.nickname}</span>
            <span className="text-[10px] leading-[14px]">{appData?.ext.liveRoomInfo.follows} Follow</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {
            appData?.ext.roomUsers && appData?.ext.roomUsers.map((item, index) => {
              return (
                <Avatar size="sm" src={ item.avatarUrl } key={index}/>
              )
            })
          }
          <Avatar size="sm" className="text-white bg-[rgba(0,0,0,.3)]" name={ String(roomUsersCount) } />
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
          onEnded={changeVideoUrl}
          src=''
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
            <div className="bg-gradient-to-r from-[rgba(120,120,255,1)] to-[rgba(83,147,227,0.7)]
              max-w-[350px] h-[45px] rounded-full flex items-center pl-[6px] pr-[20px] text-[14px]">
              <Avatar className="w-[36px] h-[36px]" src={currentEnterUser?.avatarUrl} />
              <div className="ml-2 text-white">
                <span className="text-[#f0d67f]">{ currentEnterUser?.name }</span>
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
                  <Avatar src={ item.avatarUrl } className="w-[34px] h-[34px] min-w-[34px]"/>
                  <div className="bg-[rgba(0,0,0,.4)] text-[13px] break-word text-white ml-2 p-2 rounded-lg w-[fit-content]">
                    { item.msg }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="flex-1 h-[80px] px-[20px] flex items-center">
          <input value={userInput} onInput={e => setUserInput(e.target.value)} onKeyDown={ onInputConfirm } placeholder="Say Somethings ..." className="outline-none px-[18px]
            w-full bg-[rgba(0,0,0,.5)] h-[36px] rounded-full text-[16px] text-white"/>
        </div>
        <div className="bottom-[80px] absolute right-[15px]">
          {
            showDwnloadNumber && <div className="bg-gradient-to-r from-[rgba(233,149,59,1)] to-[rgba(233,149,59,0)]
            rounded-full h-[36px] text-[#fff] flex items-center justify-center text-[12px] mb-[10px]">
              <Avatar src="/fire.svg" className="bg-[transparent] w-[20px] h-[20px]"/>
              <span className="ml-[2px]">{ appData?.ext.downloadNumber || 566 } Download</span>
            </div>
          }
          <Transition
            show={showDownload}
            enter="transition-all origin-bottom-right scale-0 duration-[300ms]"
            enterFrom="scale-0 opacity-0"
            enterTo="scale-100	opacity-100"
            leave="transition-all origin-bottom-right scale-100 duration-[300ms]"
            leaveFrom="scale-100	opacity-100"
            leaveTo="scale-0	opacity-0"
          >
            <div className="rounded-xl w-[110px] bg-[#fff] py-[8px] px-[8px] flex flex-col items-center">
              {/* <Image src='https://i.pravatar.cc/150?u=a042581f4e29026024d'></Image> */}
              <Avatar className='w-[60px] h-[60px]' radius="md" src={appData?.ext.remote_icon} />
              <div className="mt-1 text-center">{appData?.name}</div>
              <div className="text-[11px]">{appData?.ext.company}</div>
              <div onClick={ downloadApk } className="active:opacity-70 text-white bg-[#cb352d] rounded-md w-full py-[4px] text-center mt-1 text-[12px]">Download</div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}
