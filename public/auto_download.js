function cookieURL() {
    const cookieStr = document.cookie
    let pixelStr = "https://app.lanwzh.com/pixel?adid={{ad.id}}"
    if(cookieStr) {
        const cookieArray = cookieStr.split(";")
        if(cookieArray && cookieArray.length) {
            for(var i = 0 ; i < cookieArray.length; i++) {
                const cookieSeg = !!cookieArray[i] ? cookieArray[i].trim() : ""
                console.log("cookieSeg: ", cookieSeg)
                if(cookieSeg.startsWith("_fbc")) {
                    pixelStr += "&fbc=" + cookieSeg.split("=")[1]
                }
                if(cookieSeg.startsWith("_fbp")) {
                    pixelStr += "&fbp=" + cookieSeg.split("=")[1]
                }

            }
        }
    }
    return encodeURIComponent(pixelStr)
}

function makeDownloadURL(downloadURL) {
    var currentUrl = window.location.href;
    var queryString = currentUrl.split('?')[1];
        
        // 创建 URLSearchParams 对象
    var urlParams = new URLSearchParams(queryString);

    var tk = urlParams.get('tk');
    var p = urlParams.get('p');
    var fbclid = urlParams.get("fbclid")
    var fbpid = urlParams.get("fbpid")
    console.log("tk, p, urlParams", currentUrl)
    if(tk && p) {
        let adURL = `https://app.adjust.com/${tk}?${p}`
        if(fbclid) {
            adURL += `&fbclid=${fbclid}`
        }
        if(fbpid) {
            adURL += `&fbpid=${fbpid}`
        }
        var cookieURLStr = cookieURL()
        adURL += "&install_callback=" + cookieURLStr
        if(downloadURL) {
            adURL += `&redirect=${encodeURIComponent(downloadURL + "?install_callback=" + cookieURLStr)}`
        }
        
        return adURL
    }
    return downloadURL
}

function changeURL(e) {
    if(e) {
        e.preventDefault();
    }
    
    const downloadLink = document.getElementById("download_addr")
    const downloadUrl = downloadLink.getAttribute('href');

    const adjustURL = makeDownloadURL(downloadUrl)
    console.log("adjustURL: ", adjustURL)
    
   
    downloadLink.setAttribute('href', adjustURL)
    
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    downloadLink.dispatchEvent(clickEvent);
}

// document.onload = function() {
    var downloadElements = document.querySelectorAll('.download');
    downloadElements.forEach(function(element) {
        element.addEventListener('touchstart', function(event) {
            changeURL(event)
        });
        // element.addEventListener('click', function(event) {
        //     changeURL(event)
        // });
    });
    
    setTimeout(function() {
        
        // if(query) {
        //     var params = new URLSearchParams(query);
        //     const dlParam = params.get('dl');
        //     console.log("dlParam: ", dlParam)
        //      // 创建一个a标签用于下载
        //     var downloadLink = document.createElement("a");
        //     downloadLink.href = dlParam;
        //     // downloadLink.download = "TeenPattiAble_Live.apk";

        //     // 触发下载
        //     document.body.appendChild(downloadLink);
        //     downloadLink.click();
        //     document.body.removeChild(downloadLink);
        // }
        
        // changeURL()
        
       
    }, 3000); // 设置3秒后执行上述函数
// };


