// document.onload = function() {
    var currentScript = document.currentScript;
    console.log("currentScript: ", currentScript)
    var src = currentScript.src;
    var query = src.split('?')[1]
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
        const downloadLink = document.getElementById("download_addr")
        const downloadUrl = downloadLink.getAttribute('href');
        console.log("downloadUrl: ", downloadUrl)
        const cookieStr = document.cookie
        // /pixel?fbc={fbc}&fbp={fbp}
        
        let pixelStr = "https://app.lanwzh.com/pixel?"
        if(cookieStr) {
            const cookieArray = cookieStr.split(";")
            if(cookieArray && cookieArray.length) {
                for(var i = 0 ; i < cookieArray.length; i++) {
                    const cookieSeg = !!cookieArray[i] ? cookieArray[i].trim() : ""
                    console.log("cookieSeg: ", cookieSeg)
                    if(cookieSeg.startsWith("_fbc") || cookieSeg.startsWith("_fbp")) {
                        pixelStr += cookieSeg.trim()
                    }
                }
            }
        }
        const newDownloadUrl = downloadUrl + "&install_callback=" + encodeURIComponent(pixelStr)
        downloadLink.setAttribute('href', newDownloadUrl)
        console.log(document.getElementById("download_addr"))
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        downloadLink.dispatchEvent(clickEvent);
       
    }, 3000); // 设置3秒后执行上述函数
// };


