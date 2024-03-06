
'use client'
import appApi from "@/requests/app";
import { useEffect, useState } from "react";
import TablerIcon from "../components/tabler";
let deferredPrompt = null;





export default function Apps() {
  const [appData, setAppData] = useState()
  // const [isInstall, setIsInstall] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setStandalone] = useState(false)


  const initial = () => {
    console.log("inital")
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e)
      console.log("beforeinstallprompt: ", e)
      // setIsInstall(false)
    })

    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   setStandalone(true)
    // } else {
    //   setStandalone(false)
    // }
    const handleAppInstalled = (e) => {
      setStandalone(true)
    };
  
    window.addEventListener('appinstalled', handleAppInstalled);
  }
  const isInstall = () => {
    return isStandalone || deferredPrompt == null
  }
  const getData = async () => {
    const res = await appApi.getApp()
    console.log("app data: ", res)
    setAppData(res)
  }
  const install = () => {
    console.log("click install deferredPrompt: ", deferredPrompt)
    if(deferredPrompt != null) {
      deferredPrompt.prompt()
    }
  }
  useEffect(() => {
    getData()
    initial()
  }, [])
  return (
    appData && 
    <div className="p-5">
      <div className="flex">
        <div className="logo shadow-md w-20 h-20 rounded-lg mr-5">
          <img
            src={appData.icons[1].src}
            alt="app"
            className="w-full h-full"
          />
        </div>
        <div className="titles">
          <h1 className="text-2xl">{appData.name}</h1>
          <div className="sub-title">
            <h2 className="company primary-color">{appData.ext.company}</h2>
            <p className="second-color text-xs">{appData.ext.verify}</p>
          </div>
        </div>
      </div>
      <div className="overview my-8 text-center grid grid-cols-3 divide-x">
      {
        appData.ext.labels.map((item, index) => (
          <div key={index}>
            <p className={"flex justify-center font-bold "}>
              <div className={"mr-2 p-1 rounded " + (item.wrapper && " bg-slate-300")}>{item.display}</div> 
              {item.icon && <TablerIcon iconName={item.icon} size="18" className="mt-2" />}
            </p>
            <p className="second-color text-xs">{item.name}</p>
          </div>
        ))
      }
      </div>
      <div className="install">
        <button className="bg-primary rounded text-white w-full p-2" onClick={install}>{isInstall() ? 'Play' : 'Install'}</button>
      </div>
      <div className="links text-center flex justify-center mt-5 space-x-5">
      {
        appData.ext.links.map((item, index) => (
          <div key={index} className="flex">
            <p className={"flex justify-center font-bold"}>
              {item.icon && <TablerIcon iconName={item.icon} size="18" className="primary-color mr-2 mt-1" />}
            </p>
            <p className="primary-color">{item.text}</p>
          </div>
        ))      
      }
      </div>
      
      <div className="flex overflow-x-auto py-5">
      {
        appData.ext.pictures.map((item, index) => (
        // <div key={index} className="m-2 rounded overflow-hidden">
        //   <img src={item.url} />
        // </div>
          <img key={index} src={item.url} alt={item.alt} style={{'width': '120px', 'height':'200px'}} className="rounded mr-2"/>
        ))      
      }
      </div>
      <div className="sections mt-5">
      {
        appData.ext.sections.map((item, index) => (
        <div key={index}>
          <h2 className=" text-lg font-bold">{item.label}</h2>
          <p className="second-color text-sm whitespace-break-spaces">{item.description}</p>
        </div>
        ))      
      }
      </div>
      
    </div>
  );
}
