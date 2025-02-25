import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { formatNumber } from '~/utils/formatNumber'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const testdata =[
  {
  "url": "https://www.youtube.com/watch?v=wdZrtACXY9E",
  "title": "Jovem embriagado atropela 5 crianças que brincavam na calçada",
  "youtuber": "cMetr%C3%B3polesTV",
  "video_url": "https://rr7---sn-gwpa-2o9e.googlevideo.com/videoplayback?expire=1740477792&ei=AEG9Z5CjOYXs4-EP0bvpkAE&ip=152.57.94.71&id=o-AMLwLva0xqnnQ7qwiaomJSyYQ0Y1-q_OLzeKvaxun28C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1740456192%2C&mh=6u&mm=31%2C29&mn=sn-gwpa-2o9e%2Csn-gwpa-cvhe7&ms=au%2Crdu&mv=m&mvi=7&pl=19&rms=au%2Cau&initcwndbps=588750&bui=AUWDL3xsxWCrg8XWpAnYmVWjHs7K1mj6sj3UzHOZnTLi95qTaNUYWvp1OFvQiBrkOX5ZjxZcSw4A1W6K&spc=RjZbScqdRTNx5A5aLGwR3N5LdLf5Cz4IieL_s3M5R0V1MpABXNxgTJ514Yq877tGRjbwqNM&vprv=1&svpuc=1&mime=video%2Fmp4&ns=t4BFEWY_1hJp_Nx1PUWc6jYQ&rqh=1&gir=yes&clen=18948805&dur=82.666&lmt=1740406049006441&mt=1740455820&fvip=4&keepalive=yes&fexp=51326932%2C51355912%2C51398365&c=WEB&sefc=1&txp=6309224&n=cTomdZAi7FR1Pii&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBS1toplrZCBz29Ozzt0-LuaFe3vZlSyUTNzMw_36Fw4CIAWr4pO-55O8_yc1lMvbRJ1-4zooK7iUpCSk6Bd2jz8s&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRAIgblbfa4BDk8JiryWA354x3azD_BqCFfdkLECcllHDES0CIFLrRvG7qjs1lySP9ZTfDQhWADwWTsB-T2PA7lgkT5xs",
  "video_length": 83,
  "likes": 37,
  "views": 1146,
  "date_posted": "2025-02-24T14:12:23.000Z",
  "description": "Um jovem de 23 anos, que estava embriagado, foi preso em flagrante após atropelar cinco crianças que brincavam na calçada na noite desse domingo (23/2) em Limeira, interior de São Paulo. Imagens de uma câmera de segurança mostram o momento em que o veículo atingiu as vítimas.\n\n➡️ Deixe seu like e inscreva-se no nosso canal!\n\nSiga as nossas redes sociais:\n🔵 Facebook: metropolesdf\n🔴 Instagram: metropoles\n⚫ X: metropoles\n⚪ TikTok: metropolesoficial",
  "num_comments": 6,
  "subscribers": 3120000,
  "music": null,
  "video_id": "wdZrtACXY9E",
  "channel_url": "https://www.youtube.com/cMetr%C3%B3polesTV",
  "preview_image": "https://i.ytimg.com/vi/wdZrtACXY9E/hqdefault.jpg",
  "discovery_input": {},
  "shortcode": "wdZrtACXY9E",
  "verified": true,
  "handle_name": "Metrópoles",
  "avatar_img_channel": "https://yt3.ggpht.com/ytc/AIdro_nHdpA_05ttI2SOYeISrRVWVY2g89KwX2g4gYXlV9QH6j0L=s48-c-k-c0x00ffffff-no-rj",
  "is_sponsored": null,
  "youtuber_id": "UC9mdw2mmn49ZuqGOpSri7Fw",
  "transcript": "e ainda falando de crimes e em São Paulo na cidade agora de Limeira que fica no interior do Estado porque um jovem de 23 anos que estava embriagado atropelou um grupo de crianças que estava sentado na calçada brincando simplesmente isso esse vídeo a gente não pode passar aqui o YouTube realmente não ia aceitar essas imagens são muito fortes a gente tem só uma imagem além dessa que tá aí na tela eu quero que a gente ponha a outra né mais cheia esse é o momento exato em que ele atropela as crianças sentadas esse jovem de 23 anos que foi preso em flagrante tá ele tentou fugir depois que aconteceu aí esse caso lá em Limeira ele tentou fugir o caso aconteceu na rua Jéssica Fernanda dacol que fica no bairro Park Pompeu as vítimas foram levadas pro pronto socorro local e seguem internadas como eu disse a você o jovem que não teve o nome divulgado né ele foi fugiu tentou se esconder em uma casa que tinha na região Mas ele foi encontrado foi feito o teste e foi comprovado de que ele estava embriagado ele foi conduzido à Delegacia tá aí à disposição da justiça e o automóvel dele foi apreendido e o que é que ele foi acusado a Secretaria de Segurança Pública disse que o caso foi registrado como embriaguez ao volante e tentativa de homicídio entra aí no metropolis.com tem o vídeo completo para você que quer ver e olha a deção do boletim Metrópolis",
  "youtuber_md5": "d63e3b08f0fa5e1d0f9ffdce28504001",
  "hashtags": null
  },
  {
  "url": "https://www.youtube.com/watch?v=wdZrtACXY9E",
  "title": "Jovem embriagado atropela 5 crianças que brincavam na calçada",
  "youtuber": "cMetr%C3%B3polesTV",
  "video_url": "https://rr7---sn-gwpa-2o9e.googlevideo.com/videoplayback?expire=1740477792&ei=AEG9Z5CjOYXs4-EP0bvpkAE&ip=152.57.94.71&id=o-AMLwLva0xqnnQ7qwiaomJSyYQ0Y1-q_OLzeKvaxun28C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1740456192%2C&mh=6u&mm=31%2C29&mn=sn-gwpa-2o9e%2Csn-gwpa-cvhe7&ms=au%2Crdu&mv=m&mvi=7&pl=19&rms=au%2Cau&initcwndbps=588750&bui=AUWDL3xsxWCrg8XWpAnYmVWjHs7K1mj6sj3UzHOZnTLi95qTaNUYWvp1OFvQiBrkOX5ZjxZcSw4A1W6K&spc=RjZbScqdRTNx5A5aLGwR3N5LdLf5Cz4IieL_s3M5R0V1MpABXNxgTJ514Yq877tGRjbwqNM&vprv=1&svpuc=1&mime=video%2Fmp4&ns=t4BFEWY_1hJp_Nx1PUWc6jYQ&rqh=1&gir=yes&clen=18948805&dur=82.666&lmt=1740406049006441&mt=1740455820&fvip=4&keepalive=yes&fexp=51326932%2C51355912%2C51398365&c=WEB&sefc=1&txp=6309224&n=cTomdZAi7FR1Pii&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBS1toplrZCBz29Ozzt0-LuaFe3vZlSyUTNzMw_36Fw4CIAWr4pO-55O8_yc1lMvbRJ1-4zooK7iUpCSk6Bd2jz8s&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRAIgblbfa4BDk8JiryWA354x3azD_BqCFfdkLECcllHDES0CIFLrRvG7qjs1lySP9ZTfDQhWADwWTsB-T2PA7lgkT5xs",
  "video_length": 83,
  "likes": 37,
  "views": 1146,
  "date_posted": "2025-02-24T14:12:23.000Z",
  "description": "Um jovem de 23 anos, que estava embriagado, foi preso em flagrante após atropelar cinco crianças que brincavam na calçada na noite desse domingo (23/2) em Limeira, interior de São Paulo. Imagens de uma câmera de segurança mostram o momento em que o veículo atingiu as vítimas.\n\n➡️ Deixe seu like e inscreva-se no nosso canal!\n\nSiga as nossas redes sociais:\n🔵 Facebook: metropolesdf\n🔴 Instagram: metropoles\n⚫ X: metropoles\n⚪ TikTok: metropolesoficial",
  "num_comments": 6,
  "subscribers": 3120000,
  "music": null,
  "video_id": "wdZrtACXY9E",
  "channel_url": "https://www.youtube.com/cMetr%C3%B3polesTV",
  "preview_image": "https://i.ytimg.com/vi/wdZrtACXY9E/hqdefault.jpg",
  "discovery_input": {},
  "shortcode": "wdZrtACXY9E",
  "verified": true,
  "handle_name": "Metrópoles",
  "avatar_img_channel": "https://yt3.ggpht.com/ytc/AIdro_nHdpA_05ttI2SOYeISrRVWVY2g89KwX2g4gYXlV9QH6j0L=s48-c-k-c0x00ffffff-no-rj",
  "is_sponsored": null,
  "youtuber_id": "UC9mdw2mmn49ZuqGOpSri7Fw",
  "transcript": "e ainda falando de crimes e em São Paulo na cidade agora de Limeira que fica no interior do Estado porque um jovem de 23 anos que estava embriagado atropelou um grupo de crianças que estava sentado na calçada brincando simplesmente isso esse vídeo a gente não pode passar aqui o YouTube realmente não ia aceitar essas imagens são muito fortes a gente tem só uma imagem além dessa que tá aí na tela eu quero que a gente ponha a outra né mais cheia esse é o momento exato em que ele atropela as crianças sentadas esse jovem de 23 anos que foi preso em flagrante tá ele tentou fugir depois que aconteceu aí esse caso lá em Limeira ele tentou fugir o caso aconteceu na rua Jéssica Fernanda dacol que fica no bairro Park Pompeu as vítimas foram levadas pro pronto socorro local e seguem internadas como eu disse a você o jovem que não teve o nome divulgado né ele foi fugiu tentou se esconder em uma casa que tinha na região Mas ele foi encontrado foi feito o teste e foi comprovado de que ele estava embriagado ele foi conduzido à Delegacia tá aí à disposição da justiça e o automóvel dele foi apreendido e o que é que ele foi acusado a Secretaria de Segurança Pública disse que o caso foi registrado como embriaguez ao volante e tentativa de homicídio entra aí no metropolis.com tem o vídeo completo para você que quer ver e olha a deção do boletim Metrópolis",
  "youtuber_md5": "d63e3b08f0fa5e1d0f9ffdce28504001",
  "hashtags": null
  },
  {
  "url": "https://www.youtube.com/watch?v=wdZrtACXY9E",
  "title": "Jovem embriagado atropela 5 crianças que brincavam na calçada",
  "youtuber": "cMetr%C3%B3polesTV",
  "video_url": "https://rr7---sn-gwpa-2o9e.googlevideo.com/videoplayback?expire=1740477792&ei=AEG9Z5CjOYXs4-EP0bvpkAE&ip=152.57.94.71&id=o-AMLwLva0xqnnQ7qwiaomJSyYQ0Y1-q_OLzeKvaxun28C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1740456192%2C&mh=6u&mm=31%2C29&mn=sn-gwpa-2o9e%2Csn-gwpa-cvhe7&ms=au%2Crdu&mv=m&mvi=7&pl=19&rms=au%2Cau&initcwndbps=588750&bui=AUWDL3xsxWCrg8XWpAnYmVWjHs7K1mj6sj3UzHOZnTLi95qTaNUYWvp1OFvQiBrkOX5ZjxZcSw4A1W6K&spc=RjZbScqdRTNx5A5aLGwR3N5LdLf5Cz4IieL_s3M5R0V1MpABXNxgTJ514Yq877tGRjbwqNM&vprv=1&svpuc=1&mime=video%2Fmp4&ns=t4BFEWY_1hJp_Nx1PUWc6jYQ&rqh=1&gir=yes&clen=18948805&dur=82.666&lmt=1740406049006441&mt=1740455820&fvip=4&keepalive=yes&fexp=51326932%2C51355912%2C51398365&c=WEB&sefc=1&txp=6309224&n=cTomdZAi7FR1Pii&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBS1toplrZCBz29Ozzt0-LuaFe3vZlSyUTNzMw_36Fw4CIAWr4pO-55O8_yc1lMvbRJ1-4zooK7iUpCSk6Bd2jz8s&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRAIgblbfa4BDk8JiryWA354x3azD_BqCFfdkLECcllHDES0CIFLrRvG7qjs1lySP9ZTfDQhWADwWTsB-T2PA7lgkT5xs",
  "video_length": 83,
  "likes": 37,
  "views": 1146,
  "date_posted": "2025-02-24T14:12:23.000Z",
  "description": "Um jovem de 23 anos, que estava embriagado, foi preso em flagrante após atropelar cinco crianças que brincavam na calçada na noite desse domingo (23/2) em Limeira, interior de São Paulo. Imagens de uma câmera de segurança mostram o momento em que o veículo atingiu as vítimas.\n\n➡️ Deixe seu like e inscreva-se no nosso canal!\n\nSiga as nossas redes sociais:\n🔵 Facebook: metropolesdf\n🔴 Instagram: metropoles\n⚫ X: metropoles\n⚪ TikTok: metropolesoficial",
  "num_comments": 6,
  "subscribers": 3120000,
  "music": null,
  "video_id": "wdZrtACXY9E",
  "channel_url": "https://www.youtube.com/cMetr%C3%B3polesTV",
  "preview_image": "https://i.ytimg.com/vi/wdZrtACXY9E/hqdefault.jpg",
  "discovery_input": {},
  "shortcode": "wdZrtACXY9E",
  "verified": true,
  "handle_name": "Metrópoles",
  "avatar_img_channel": "https://yt3.ggpht.com/ytc/AIdro_nHdpA_05ttI2SOYeISrRVWVY2g89KwX2g4gYXlV9QH6j0L=s48-c-k-c0x00ffffff-no-rj",
  "is_sponsored": null,
  "youtuber_id": "UC9mdw2mmn49ZuqGOpSri7Fw",
  "transcript": "e ainda falando de crimes e em São Paulo na cidade agora de Limeira que fica no interior do Estado porque um jovem de 23 anos que estava embriagado atropelou um grupo de crianças que estava sentado na calçada brincando simplesmente isso esse vídeo a gente não pode passar aqui o YouTube realmente não ia aceitar essas imagens são muito fortes a gente tem só uma imagem além dessa que tá aí na tela eu quero que a gente ponha a outra né mais cheia esse é o momento exato em que ele atropela as crianças sentadas esse jovem de 23 anos que foi preso em flagrante tá ele tentou fugir depois que aconteceu aí esse caso lá em Limeira ele tentou fugir o caso aconteceu na rua Jéssica Fernanda dacol que fica no bairro Park Pompeu as vítimas foram levadas pro pronto socorro local e seguem internadas como eu disse a você o jovem que não teve o nome divulgado né ele foi fugiu tentou se esconder em uma casa que tinha na região Mas ele foi encontrado foi feito o teste e foi comprovado de que ele estava embriagado ele foi conduzido à Delegacia tá aí à disposição da justiça e o automóvel dele foi apreendido e o que é que ele foi acusado a Secretaria de Segurança Pública disse que o caso foi registrado como embriaguez ao volante e tentativa de homicídio entra aí no metropolis.com tem o vídeo completo para você que quer ver e olha a deção do boletim Metrópolis",
  "youtuber_md5": "d63e3b08f0fa5e1d0f9ffdce28504001",
  "hashtags": null
  },
  {
  "url": "https://www.youtube.com/watch?v=wdZrtACXY9E",
  "title": "Jovem embriagado atropela 5 crianças que brincavam na calçada",
  "youtuber": "cMetr%C3%B3polesTV",
  "video_url": "https://rr7---sn-gwpa-2o9e.googlevideo.com/videoplayback?expire=1740477792&ei=AEG9Z5CjOYXs4-EP0bvpkAE&ip=152.57.94.71&id=o-AMLwLva0xqnnQ7qwiaomJSyYQ0Y1-q_OLzeKvaxun28C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1740456192%2C&mh=6u&mm=31%2C29&mn=sn-gwpa-2o9e%2Csn-gwpa-cvhe7&ms=au%2Crdu&mv=m&mvi=7&pl=19&rms=au%2Cau&initcwndbps=588750&bui=AUWDL3xsxWCrg8XWpAnYmVWjHs7K1mj6sj3UzHOZnTLi95qTaNUYWvp1OFvQiBrkOX5ZjxZcSw4A1W6K&spc=RjZbScqdRTNx5A5aLGwR3N5LdLf5Cz4IieL_s3M5R0V1MpABXNxgTJ514Yq877tGRjbwqNM&vprv=1&svpuc=1&mime=video%2Fmp4&ns=t4BFEWY_1hJp_Nx1PUWc6jYQ&rqh=1&gir=yes&clen=18948805&dur=82.666&lmt=1740406049006441&mt=1740455820&fvip=4&keepalive=yes&fexp=51326932%2C51355912%2C51398365&c=WEB&sefc=1&txp=6309224&n=cTomdZAi7FR1Pii&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBS1toplrZCBz29Ozzt0-LuaFe3vZlSyUTNzMw_36Fw4CIAWr4pO-55O8_yc1lMvbRJ1-4zooK7iUpCSk6Bd2jz8s&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRAIgblbfa4BDk8JiryWA354x3azD_BqCFfdkLECcllHDES0CIFLrRvG7qjs1lySP9ZTfDQhWADwWTsB-T2PA7lgkT5xs",
  "video_length": 83,
  "likes": 37,
  "views": 1146,
  "date_posted": "2025-02-24T14:12:23.000Z",
  "description": "Um jovem de 23 anos, que estava embriagado, foi preso em flagrante após atropelar cinco crianças que brincavam na calçada na noite desse domingo (23/2) em Limeira, interior de São Paulo. Imagens de uma câmera de segurança mostram o momento em que o veículo atingiu as vítimas.\n\n➡️ Deixe seu like e inscreva-se no nosso canal!\n\nSiga as nossas redes sociais:\n🔵 Facebook: metropolesdf\n🔴 Instagram: metropoles\n⚫ X: metropoles\n⚪ TikTok: metropolesoficial",
  "num_comments": 6,
  "subscribers": 3120000,
  "music": null,
  "video_id": "wdZrtACXY9E",
  "channel_url": "https://www.youtube.com/cMetr%C3%B3polesTV",
  "preview_image": "https://i.ytimg.com/vi/wdZrtACXY9E/hqdefault.jpg",
  "discovery_input": {},
  "shortcode": "wdZrtACXY9E",
  "verified": true,
  "handle_name": "Metrópoles",
  "avatar_img_channel": "https://yt3.ggpht.com/ytc/AIdro_nHdpA_05ttI2SOYeISrRVWVY2g89KwX2g4gYXlV9QH6j0L=s48-c-k-c0x00ffffff-no-rj",
  "is_sponsored": null,
  "youtuber_id": "UC9mdw2mmn49ZuqGOpSri7Fw",
  "transcript": "e ainda falando de crimes e em São Paulo na cidade agora de Limeira que fica no interior do Estado porque um jovem de 23 anos que estava embriagado atropelou um grupo de crianças que estava sentado na calçada brincando simplesmente isso esse vídeo a gente não pode passar aqui o YouTube realmente não ia aceitar essas imagens são muito fortes a gente tem só uma imagem além dessa que tá aí na tela eu quero que a gente ponha a outra né mais cheia esse é o momento exato em que ele atropela as crianças sentadas esse jovem de 23 anos que foi preso em flagrante tá ele tentou fugir depois que aconteceu aí esse caso lá em Limeira ele tentou fugir o caso aconteceu na rua Jéssica Fernanda dacol que fica no bairro Park Pompeu as vítimas foram levadas pro pronto socorro local e seguem internadas como eu disse a você o jovem que não teve o nome divulgado né ele foi fugiu tentou se esconder em uma casa que tinha na região Mas ele foi encontrado foi feito o teste e foi comprovado de que ele estava embriagado ele foi conduzido à Delegacia tá aí à disposição da justiça e o automóvel dele foi apreendido e o que é que ele foi acusado a Secretaria de Segurança Pública disse que o caso foi registrado como embriaguez ao volante e tentativa de homicídio entra aí no metropolis.com tem o vídeo completo para você que quer ver e olha a deção do boletim Metrópolis",
  "youtuber_md5": "d63e3b08f0fa5e1d0f9ffdce28504001",
  "hashtags": null
  },
  {
  "url": "https://www.youtube.com/watch?v=wdZrtACXY9E",
  "title": "Jovem embriagado atropela 5 crianças que brincavam na calçada",
  "youtuber": "cMetr%C3%B3polesTV",
  "video_url": "https://rr7---sn-gwpa-2o9e.googlevideo.com/videoplayback?expire=1740477792&ei=AEG9Z5CjOYXs4-EP0bvpkAE&ip=152.57.94.71&id=o-AMLwLva0xqnnQ7qwiaomJSyYQ0Y1-q_OLzeKvaxun28C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1740456192%2C&mh=6u&mm=31%2C29&mn=sn-gwpa-2o9e%2Csn-gwpa-cvhe7&ms=au%2Crdu&mv=m&mvi=7&pl=19&rms=au%2Cau&initcwndbps=588750&bui=AUWDL3xsxWCrg8XWpAnYmVWjHs7K1mj6sj3UzHOZnTLi95qTaNUYWvp1OFvQiBrkOX5ZjxZcSw4A1W6K&spc=RjZbScqdRTNx5A5aLGwR3N5LdLf5Cz4IieL_s3M5R0V1MpABXNxgTJ514Yq877tGRjbwqNM&vprv=1&svpuc=1&mime=video%2Fmp4&ns=t4BFEWY_1hJp_Nx1PUWc6jYQ&rqh=1&gir=yes&clen=18948805&dur=82.666&lmt=1740406049006441&mt=1740455820&fvip=4&keepalive=yes&fexp=51326932%2C51355912%2C51398365&c=WEB&sefc=1&txp=6309224&n=cTomdZAi7FR1Pii&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBS1toplrZCBz29Ozzt0-LuaFe3vZlSyUTNzMw_36Fw4CIAWr4pO-55O8_yc1lMvbRJ1-4zooK7iUpCSk6Bd2jz8s&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRAIgblbfa4BDk8JiryWA354x3azD_BqCFfdkLECcllHDES0CIFLrRvG7qjs1lySP9ZTfDQhWADwWTsB-T2PA7lgkT5xs",
  "video_length": 83,
  "likes": 37,
  "views": 1146,
  "date_posted": "2025-02-24T14:12:23.000Z",
  "description": "Um jovem de 23 anos, que estava embriagado, foi preso em flagrante após atropelar cinco crianças que brincavam na calçada na noite desse domingo (23/2) em Limeira, interior de São Paulo. Imagens de uma câmera de segurança mostram o momento em que o veículo atingiu as vítimas.\n\n➡️ Deixe seu like e inscreva-se no nosso canal!\n\nSiga as nossas redes sociais:\n🔵 Facebook: metropolesdf\n🔴 Instagram: metropoles\n⚫ X: metropoles\n⚪ TikTok: metropolesoficial",
  "num_comments": 6,
  "subscribers": 3120000,
  "music": null,
  "video_id": "wdZrtACXY9E",
  "channel_url": "https://www.youtube.com/cMetr%C3%B3polesTV",
  "preview_image": "https://i.ytimg.com/vi/wdZrtACXY9E/hqdefault.jpg",
  "discovery_input": {},
  "shortcode": "wdZrtACXY9E",
  "verified": true,
  "handle_name": "Metrópoles",
  "avatar_img_channel": "https://yt3.ggpht.com/ytc/AIdro_nHdpA_05ttI2SOYeISrRVWVY2g89KwX2g4gYXlV9QH6j0L=s48-c-k-c0x00ffffff-no-rj",
  "is_sponsored": null,
  "youtuber_id": "UC9mdw2mmn49ZuqGOpSri7Fw",
  "transcript": "e ainda falando de crimes e em São Paulo na cidade agora de Limeira que fica no interior do Estado porque um jovem de 23 anos que estava embriagado atropelou um grupo de crianças que estava sentado na calçada brincando simplesmente isso esse vídeo a gente não pode passar aqui o YouTube realmente não ia aceitar essas imagens são muito fortes a gente tem só uma imagem além dessa que tá aí na tela eu quero que a gente ponha a outra né mais cheia esse é o momento exato em que ele atropela as crianças sentadas esse jovem de 23 anos que foi preso em flagrante tá ele tentou fugir depois que aconteceu aí esse caso lá em Limeira ele tentou fugir o caso aconteceu na rua Jéssica Fernanda dacol que fica no bairro Park Pompeu as vítimas foram levadas pro pronto socorro local e seguem internadas como eu disse a você o jovem que não teve o nome divulgado né ele foi fugiu tentou se esconder em uma casa que tinha na região Mas ele foi encontrado foi feito o teste e foi comprovado de que ele estava embriagado ele foi conduzido à Delegacia tá aí à disposição da justiça e o automóvel dele foi apreendido e o que é que ele foi acusado a Secretaria de Segurança Pública disse que o caso foi registrado como embriaguez ao volante e tentativa de homicídio entra aí no metropolis.com tem o vídeo completo para você que quer ver e olha a deção do boletim Metrópolis",
  "youtuber_md5": "d63e3b08f0fa5e1d0f9ffdce28504001",
  "hashtags": null
  },
]

const VideosPage = () => {
  const { channel_id } = useLocalSearchParams()


  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
    <Stack.Screen options={{
      title: `${testdata[0].handle_name}`,
    }} />
      {/* Gradient Header */}
      <View className="bg-gradient-to-r from-red-600 to-red-500 bg-red-600 px-6 py-6">
        <Text className="text-2xl font-bold text-white">Latest Videos</Text>
        <Text className="text-white/80 font-semibold">Discover the latest content</Text>
      </View>
 
      {/* Videos Grid */}
      <View className="px-4 py-4">
        {testdata.map((video, index) => (
          <TouchableOpacity
            activeOpacity={0.8} 
            key={index} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
            onPress={() => router.push(`/channel/videos/${video.video_id}`)}
          >
            {/* Thumbnail Section */}
            <View className="relative">
              <Image 
                source={{ uri: video.preview_image }}
                className="w-full h-56"
                resizeMode="cover"
              />
              {/* Duration Badge */}
              <View className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Text className="text-white font-medium text-sm">
                  {formatDuration(video.video_length)}
                </Text>
              </View>
            </View>

            {/* Content Section */}
            <View className="p-5">
              <View className="flex-row">
                {/* Channel Avatar */}
                <Image 
                  source={{ uri: video.avatar_img_channel }}
                  className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                />
                {/* Title and Stats */}
                <View className="flex-1 ml-3">
                  <Text 
                    className="text-gray-900 font-bold text-lg mb-1"
                    numberOfLines={2}
                  >
                    {video.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-700 font-medium">{video.handle_name}</Text>
                    {video.verified && (
                      <View className="ml-1 bg-blue-500 rounded-full p-0.5 px-1">
                        <Text className="text-white text-xs">✓</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Stats Row */}
              <View className="flex-row items-center mt-4 bg-gray-50 p-3 rounded-xl">
                <View className="flex-row items-center">
                  <Text className="text-gray-900 font-semibold">
                    {formatNumber(video.views)} views
                  </Text>
                  <Text className="text-gray-400 mx-2">•</Text>
                  <Text className="text-gray-900">
                    {new Date(video.date_posted).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {/* Description Preview */}
              <Text 
                className="text-gray-600 mt-4 text-base leading-6"
                numberOfLines={3}
              >
                {video.description}
              </Text>

              {/* Engagement Stats */}
              <View className="flex-row justify-between mt-6 pt-4 border-t border-gray-100">
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video.likes)}
                  </Text>
                  <Text className="text-gray-600">Likes</Text>
                </View>
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video.num_comments)}
                  </Text>
                  <Text className="text-gray-600">Comments</Text>
                </View>
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video.subscribers)}
                  </Text>
                  <Text className="text-gray-600">Subscribers</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default VideosPage