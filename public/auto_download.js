function changeURL(e) {
    if(e) {
        e.preventDefault();
    }
    
    const downloadLink = document.getElementById("download_addr")
    const downloadUrl = downloadLink.getAttribute('href');
    console.log("downloadUrl: ", downloadUrl)
    const cookieStr = document.cookie
    // /pixel?fbc={fbc}&fbp={fbp}
    
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
    const newDownloadUrl = downloadUrl + "&install_callback=" + encodeURIComponent(pixelStr)
    downloadLink.setAttribute('href', newDownloadUrl)
    console.log(document.getElementById("download_addr"))
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


