import {getAppData} from '@/requests/appData'
import { makeDownloadURL } from '@/requests/utils'
import Script from 'next/script'
  
export async function generateMetadata({ params }) {
    const appData = await getAppData(params.appId[0])

    return {
        title: appData.name,
        description: appData.ext.description
    }
}


export default async function AppLanding({ params, searchParams }) {
    // const data = await getData()
    // await getQueryParams()
    const appId = params.appId[0]; 
    
    const appData = await getAppData(appId)
    return (
        <div className='m-0 p-0 box-border flex flex-col items-center h-screen overflow-x-hidden pb-24' suppressHydrationWarning>
            <div className="w-full -m-b-10 relative" suppressHydrationWarning>
                <img className='w-full' src={appData.ext.landing.backgrounds[0]} alt="Image A" />
                <div className=" absolute left-1/2 transform -translate-x-1/2 items-center w-full justify-around flex top-1/2 pt-28">
                    <a href={makeDownloadURL(searchParams, appData.ext.download)}>
                        <img src="/android.png" alt="Button B" />
                    </a>
                    <a href={`/info/${appId}`}>
                        <img src="/googleplay.png" alt="Button A" />
                    </a>
                </div>
            </div>
            <div className="w-full -m-b-10">
                <img className='w-full' src={appData.ext.landing.backgrounds[1]} alt="Image B" />
            </div>
            <div className="w-full -m-b-10">
                <img className='w-full' src={appData.ext.landing.backgrounds[2]} alt="Image C" />
            </div>
            <div className="w-full -m-b-10">
                <img className='w-full' src={appData.ext.landing.backgrounds[3]} alt="Image D" />
            </div>
            <div className="w-full -m-b-10 fixed bottom-0">
                <a href={appData.ext.download}>
                    <img  className='w-full' src="/downbt.png" alt="Floating Button" />
                </a>
            </div>
            <Script src={`/auto_download.js?dl=${encodeURIComponent(appData.ext.download)}`} />
        </div>
    
  );
}
