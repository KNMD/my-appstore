const defaultAppData = {
    "name": "My App Store",
    "short_name": "My App Store",
    "icons": [
        
      {
        "src": "/icons/img-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/img-384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/icons/img-512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait",
    "ext": {
        "remote_icon": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/ICON_+(1).png",
        "company": "company",
        "verify": "Verified by App",
        "labels": [{
            "name": "890K reviews",
            "display": "4k",
            "icon": "TbStarFilled",
            "wrapper": false
        },{
            "name": "890K reviews",
            "display": "4k",
            "icons": "",
            "wrapper": false
        },{
            "name": "890K reviews",
            "display": "4k",
            "icons": "",
            "wrapper": true
        }],
        "links": [{
            "icon": "TbShare",
            "text": "Share"
        }, {
            "icon": "TbShoppingCartPlus",
            "text": "Add to wishlist"
        }],
        "pictures": [{
            "url": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/lbd1.png",
            "alt": "aaa",
            "width": "126",
            "height": "224"
        },{
            "url": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/lbd2.png",
            "alt": "aaa"
        },{
            "url": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/lbd3.png",
            "alt": "aaa"
        },{
            "url": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/lbd4.png",
            "alt": "aaa"
        },{
            "url": "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/lbd5.png",
            "alt": "aaa"
        }],
        "sections": [{
            "label": "About this app",
            "description": "Entre no emocionante mundo do Pjogo.com - 777 PJOGO! Este jogo de cassino oferece uma variedade de máquinas caça-níqueis temáticas e desafios emocionantes para jogadores de todos os níveis. Gire os rolos, acumule prêmios e desbloqueie recursos especiais enquanto busca grandes vitórias. Com gráficos vibrantes e jackpots empolgantes, este é o seu caminho para a diversão e riqueza. Baixe agora e comece a apostar com o 777 PJOGO! \n\n 1.   Primeiro depósito de R$20 ou mais recebe um bônus de 200%, com um bônus máximo de R$ 2000.\n 2.    Faça o download do aplicativo oficial e ganhe R$ 9.\n 3.    Jogue a roleta de dinheiro gratuita e ganhe R$ 100. Compartilhe com amigos para se tornar um agente e desfrute de uma comissão máxima de 2,6%.\n 4.    Receba red envelopes gratuitos todos os dias, totalizando R$ 100.000, com até 6 oportunidades por dia e um prêmio máximo de R$ 7777.\n 5.   Siga o Pjogo.com PGTaDa.com no Instagram, Telegram e receba envelopes vermelhos de eventos no valor de R$ 2 todos os dias.\n 6.    Reembolsamos o valor das perdas dos novos jogadores todas as segundas-feiras, com um reembolso máximo de R$ 10000."
        }],
        "download": "https://bom.play.geaglo.com/apk/TeenPattiAble_Live.apk",
        "landing": {
            "backgrounds": [
                "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/bd1.png",
                "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/bd2.png",
                "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/bd3.png",
                "https://s3.ap-south-1.amazonaws.com/s3.lanwzh.com/landingpage/bd4.png"
            ]
        }
    }
}

export async function getAppData(appId) {
    console.log('param appId: ', appId)
    if(appId === '1234' || appId === 'info' || !appId) {
        return defaultAppData
    }
    // 使用 fetch 或其他方法从 API 获取数据
    const revalidate = parseInt(process.env.NEXT_PUBLIC_APP_CACHE, 10)
    const urlPattern = process.env.NEXT_PUBLIC_RESOURCE_URL_PATTERN
    const url = urlPattern.replace("{appId}", appId)
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