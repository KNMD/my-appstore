
import Script from 'next/script'
import TablerIcon from "../../components/tabler";
import { makeDownloadURL } from '@/requests/utils'
import {getAppData} from '@/requests/appData'

export async function generateMetadata({ params }) {
  const appData = await getAppData(params.appId[0])

  return {
      title: appData.name,
      description: appData.ext.description
  }
}
export async function getQuery(context) {
  const { query } = context;
  
  console.log("query: ", query)

  // 返回数据作为 props
  return {
    props: {
      
    }
  };
}

export default async function Apps({ params, searchParams }) {
  // const [appData, setAppData] = useState()
  // const [isInstall, setIsInstall] = useState(true)
  // const [deferredPrompt, setDeferredPrompt] = useState(null)
  // const [isStandalone, setStandalone] = useState(false)
  const appIdPattern = !!params.appId[0] ? params.appId[0] : "1234"
  let isLandscape = false
  let appId = appIdPattern
  if(appIdPattern.indexOf("land_") != -1) {
    isLandscape = true
    appId = appIdPattern.split("_")[1]
  }
  const appData = await getAppData(appId)
  
  const pictures = isLandscape && !!appData.ext.landscape ? appData.ext.landscape : appData.ext.pictures
  const rect = isLandscape && !!appData.ext.landscape ? appData.ext.landscape_rect : appData.ext.vertical_rect
  
  
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
        <a  id="download_addr" className="bg-primary block rounded text-white w-full p-2 text-center" href={makeDownloadURL(searchParams, appData.ext.download)}>Download</a>
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
        pictures.map((item, index) => (
        // <div key={index} className="m-2 rounded overflow-hidden">
        //   <img src={item.url} />
        // </div>
          <img key={index} src={item.url} alt={item.alt} style={{'width': rect.w, 'height':rect.h}} className="rounded mr-2"/>
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

