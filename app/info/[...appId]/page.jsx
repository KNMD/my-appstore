
import Script from 'next/script'

import TablerIcon from "../../components/tabler";

import {getAppData} from '@/requests/appData'

export async function generateMetadata({ params }) {
  const appData = await getAppData(params.appId[0])

  return {
      title: appData.name,
      description: appData.ext.description
  }
}


export default async function Apps({ params }) {
  // const [appData, setAppData] = useState()
  // const [isInstall, setIsInstall] = useState(true)
  // const [deferredPrompt, setDeferredPrompt] = useState(null)
  // const [isStandalone, setStandalone] = useState(false)


  const appData = await getAppData(params.appId[0])
  
  
  return (
    <div className="p-5">
      <div className="flex">
        <div className="logo shadow-md w-20 h-20 rounded-lg mr-5">
          <img
            src={appData.ext.remote_icon}
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
              <span className={"mr-2 p-1 rounded block" + (item.wrapper && " bg-slate-300")}>{item.display}</span> 
              {item.icon && <TablerIcon iconName={item.icon} size="18" className="mt-2" />}
            </p>
            <p className="second-color text-xs">{item.name}</p>
          </div>
        ))
      }
      </div>
      <div className="install">
        <button className="bg-primary rounded text-white w-full p-2">Download</button>
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
      <Script src={`/auto_download.js?dl=${encodeURIComponent(appData.ext.download)}`} />
    </div>
  );
}
