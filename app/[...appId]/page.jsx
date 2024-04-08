import {getAppData} from '@/requests/appData'
import Script from 'next/script'
  
export async function generateMetadata({ params }) {
    const appData = await getAppData(params.appId[0])

    return {
        title: appData.name,
        description: appData.ext.description
    }
}

export default async function AppLanding({ params }) {
    // const data = await getData()
    const appData = await getAppData(params.appId[0])
    console.log("appData2: ", appData)
    return (
        <div className='m-0 p-0 box-border flex flex-col items-center h-screen overflow-x-hidden'>
            <div className="w-full -m-b-10 relative">
                <img className='w-full' src={appData.ext.landing.backgrounds[0]} alt="Image A" />
                <div className=" absolute left-1/2 transform -translate-x-1/2 items-center w-full justify-around flex top-1/2 pt-28">
                    <a href={appData.ext.download}>
                        <img src="/android.png" alt="Button B" />
                    </a>
                    <a href={`/info/${params.appId[0]}`}>
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
            <div className="w-full -m-b-10">
                <a href={appData.ext.download}>
                    <img  className='w-full' src="/downbt.png" alt="Floating Button" />
                </a>
            </div>
            <Script src={`/auto_download.js?dl=${encodeURIComponent(appData.ext.download)}`} />
        </div>
    
  );
}
