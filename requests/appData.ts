import defaultAppData from './manifest.json'

export async function getAppData(appId) {
    console.log('param appId: ', appId)
    if(appId === '1234' || appId === 'info' || !appId) {
        return defaultAppData
    }
    // 使用 fetch 或其他方法从 API 获取数据
    const revalidate = parseInt(process.env.NEXT_PUBLIC_APP_CACHE, 10)
    const urlPattern = process.env.NEXT_PUBLIC_RESOURCE_URL_PATTERN
    const url = urlPattern.replace("{appId}", appId)
    console.log("request manifest url: ", url)
    try {
        const res = await fetch(url, { cache: 'force-cache', next: { revalidate: revalidate } });
        if(!res.ok) {
            return defaultAppData
        }
        const data = await res.json();
        console.log("get data: ", data)
        // 将获取的数据作为 props 传递给页面组件
        return data
    }catch(e) {
        console.error("fetch error: ", e)
        return defaultAppData
    }
    
}