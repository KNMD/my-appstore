
export function makeDownloadURL(params, downloadURL) {
    if(params && params.tk && params.p) {
        let adURL = `https://app.adjust.com/${params.tk}?${params.p}`
        if(params.fbclid) {
            adURL += `&fbclid=${params.fbclid}`
        }
        if(params.fbpid) {
            adURL += `&fbpid=${params.fbpid}`
        }
        if(downloadURL) {
            adURL += `&redirect=${encodeURIComponent(downloadURL)}`
        }
        console.log("adURL: ", adURL)
        return adURL
    }
    return downloadURL
}