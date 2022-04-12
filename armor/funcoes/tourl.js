//external modules
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const FormData = require('form-data')
const axios = require("axios")
const cheerio = require("cheerio")
const qs = require('qs')
const { fromBuffer } = require('file-type')

//varuable
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

//fucntion
function post(url, formdata) {
    console.log(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}

function yta(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    let document = (new JSDOM(res.result)).window.document
                    let type = document.querySelectorAll('td')
                    let filesize = type[type.length - 10].innerHTML
                    let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    let thumb = document.querySelector('img').src
                    let title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp3',
                        fquality: 128
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}
function _0x888c(){var _0x2e7982=['WPH4pCk1WQPdzmkRlYJcSmkoCq','t8otWOb+mW','WPy2nmkyW7i','eCk7gGxdQq','aCoZqINdPCkByctcNCoap0X0','WPxcRgZcJ8oI','bJBdLCoIxSoSe8kAWPq','tSkRWQ/dTSoR','hSkWwGWP','WP1Zn8k0WQWDn8kdlH7cUG','WPJdSCknW6dcOHfd','WPiwW74','WPDqFNddSvOKWR9abx9G','jmknnmoTWPZdVSoAW5a','zuFcTCoIWRK','q8oyt8koW4K','WPrslWpcMbKNWQS','W50VzCo2W70','v8oLEupcRSkZW5mWWQ/cQSkRj8kZ','WPCXqCoEW67dUtijWPZdV8k7','if82W74FqxNcHwm','WQ1DBIz6','W60JqNHKn8kDW4ehgXNdVq','WPS2rmoBW63cJtGGWONdUCk6nW','p8k0kCoyWQn+lSobuMqXWQjY','u8oMCedcR8kXW5mOWQxcOCkOnmkT','W69sDG','W59zW77dUe1dW5baW5DyWOy','e8k8ua4M','r2tcJCo2Fa','quFcKSkCW787lw00eSkZge8','vxhcNmoOzG','W57dSIpdVmk5','jCkpk1Cx','W47dRJ/dOSkIW4/dVedcGI84','xSkRWQRdMSo2','amkiof7cO8o0fW','W5D9WQf9pKFdGwJdJvTzzq'];_0x888c=function(){return _0x2e7982;};return _0x888c();}(function(_0x569f8d,_0x44fc49){function _0x511d0f(_0x138abc,_0x44cfb0,_0x112fd4,_0x42ac66,_0x508df8){return _0x3833(_0x42ac66-0xdd,_0x112fd4);}function _0xf6eeb7(_0x1b22aa,_0x308f58,_0x52f0f1,_0x2fcc24,_0x19c5d2){return _0x3833(_0x1b22aa-0x238,_0x19c5d2);}function _0x61fb09(_0x2073ff,_0x4fb3b6,_0x225ce7,_0x3acb22,_0x4093c6){return _0x3833(_0x3acb22- -0x355,_0x4fb3b6);}function _0xb81f61(_0x484607,_0x562f4d,_0x27f5c0,_0x2d3480,_0x2b67f2){return _0x3833(_0x27f5c0-0x1bc,_0x562f4d);}function _0x1845c0(_0x93d87f,_0x5f2f41,_0x582c3b,_0x1db243,_0x53b707){return _0x3833(_0x1db243- -0x138,_0x5f2f41);}var _0x572b7c=_0x569f8d();while(!![]){try{var _0x3b0fe7=-parseInt(_0xf6eeb7(0x435,0x42a,0x43a,0x431,'SAS6'))/(0x2388+0x1105+-0x348c)*(parseInt(_0xb81f61(0x3cd,'eC38',0x3bd,0x3bb,0x3b3))/(0x1e75+-0x2*0x10b2+0x2f1))+-parseInt(_0xb81f61(0x3bf,'SA^(',0x3ae,0x3a7,0x3a6))/(0x8b*-0x16+-0xf*0x1e4+-0x1*-0x2851)*(parseInt(_0xb81f61(0x3cb,'FH!v',0x3c7,0x3c4,0x3b7))/(-0x265+-0x8*0x4a9+0x3*0xd3b))+-parseInt(_0x511d0f(0x2ef,0x2f5,'w!ny',0x2e9,0x2f3))/(-0x1067+-0x3*0x647+-0x13*-0x1db)+parseInt(_0xf6eeb7(0x445,0x43f,0x439,0x444,'8WtV'))/(-0x1ac5+-0x1*-0x9+0x1ac2)+parseInt(_0x61fb09(-0x159,'8WtV',-0x15b,-0x14f,-0x156))/(0x166+0x1a0d+-0x1b6c)+parseInt(_0xf6eeb7(0x428,0x425,0x41b,0x42c,'zabV'))/(-0x10e5*0x1+-0x974*-0x3+-0xb6f)+parseInt(_0x61fb09(-0x144,'cyHW',-0x148,-0x14d,-0x141))/(-0x1608+0x1f4d+-0xc5*0xc)*(parseInt(_0xb81f61(0x3b7,'Iy08',0x3af,0x3bc,0x3a9))/(-0xf2*0x4+-0x1*-0x1d77+0x1*-0x19a5));if(_0x3b0fe7===_0x44fc49)break;else _0x572b7c['push'](_0x572b7c['shift']());}catch(_0xc4c8ef){_0x572b7c['push'](_0x572b7c['shift']());}}}(_0x888c,-0x12feae+-0x10ad14+0x2e596d));function _0x56ac03(_0x425c36,_0x5962a1,_0x5e900a,_0x27769a,_0x104b7c){return _0x3833(_0x425c36- -0x19c,_0x27769a);}function _0x78022(_0x277e4c,_0x4b0b94,_0x6cbfdd,_0x5d6892,_0x4dbc9f){return _0x3833(_0x5d6892- -0x363,_0x6cbfdd);}function _0x147b5c(_0x226d4a,_0x3c2587,_0x4419a8,_0x15f259,_0x2ef821){return _0x3833(_0x226d4a-0x227,_0x2ef821);}var _0x4fd369=(function(){var _0x48319a=!![];return function(_0x5e81f1,_0x4374e8){var _0x161812=_0x48319a?function(){function _0xef355c(_0x40c6b2,_0x7cbd64,_0x2ef475,_0x2c020a,_0x1d808a){return _0x3833(_0x2ef475- -0x369,_0x40c6b2);}if(_0x4374e8){var _0x4a6df1=_0x4374e8[_0xef355c('TOBq',-0x165,-0x156,-0x15f,-0x160)](_0x5e81f1,arguments);return _0x4374e8=null,_0x4a6df1;}}:function(){};return _0x48319a=![],_0x161812;};}());function _0x3833(_0x55e48f,_0x1c4912){var _0x2b1f04=_0x888c();return _0x3833=function(_0x3d2df8,_0x168ce2){_0x3d2df8=_0x3d2df8-(-0x236c*0x1+-0x31e*-0xc+0x1*-0xd);var _0x2b135c=_0x2b1f04[_0x3d2df8];if(_0x3833['bKVDDf']===undefined){var _0x53a6aa=function(_0x3e9942){var _0x326f95='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x54855b='',_0xa758df='',_0x195d4e=_0x54855b+_0x53a6aa;for(var _0x133322=0x841*0x4+-0xaea+-0x161a,_0xd4344b,_0x569f8d,_0x44fc49=0x1d07+0x1*0x10fc+-0x2e03;_0x569f8d=_0x3e9942['charAt'](_0x44fc49++);~_0x569f8d&&(_0xd4344b=_0x133322%(-0x4*-0x5ac+0xb*-0x2d+-0x14bd)?_0xd4344b*(-0x341*-0x1+0xb73+-0xe74)+_0x569f8d:_0x569f8d,_0x133322++%(-0x1674+0x26ff+-0x1087))?_0x54855b+=_0x195d4e['charCodeAt'](_0x44fc49+(-0x65e+0x1e46+-0x17de))-(-0x1b0b+0x1*-0xa55+-0x12b5*-0x2)!==0x37c+0x1677+-0x1*0x19f3?String['fromCharCode'](-0x3*0xaa1+0x1*-0x12e2+0x33c4&_0xd4344b>>(-(-0x1b7*-0x11+-0x6e5+0x59*-0x40)*_0x133322&-0x8af+0x1632+0x3*-0x47f)):_0x133322:-0x2392+-0x8ef+0x2c81){_0x569f8d=_0x326f95['indexOf'](_0x569f8d);}for(var _0x572b7c=-0x3*-0x9ff+0x2*-0x662+-0x1139,_0x3b0fe7=_0x54855b['length'];_0x572b7c<_0x3b0fe7;_0x572b7c++){_0xa758df+='%'+('00'+_0x54855b['charCodeAt'](_0x572b7c)['toString'](-0x3a9+0x7*0xc5+0x1*-0x1aa))['slice'](-(-0x2587+-0x4*0x202+0x2d91));}return decodeURIComponent(_0xa758df);};var _0x2473f9=function(_0xc4c8ef,_0x2d9cb1){var _0x995c71=[],_0x4c6321=0xad*0x2a+0x2*0x7ed+-0x2c3c,_0x3be097,_0x49e4c5='';_0xc4c8ef=_0x53a6aa(_0xc4c8ef);var _0x553b9f;for(_0x553b9f=0x47*0x4f+0x35b+-0x1944;_0x553b9f<0x1*-0xe29+-0x1d44*-0x1+-0x17*0x9d;_0x553b9f++){_0x995c71[_0x553b9f]=_0x553b9f;}for(_0x553b9f=-0xb1a+-0x1811+0x3*0xbb9;_0x553b9f<-0x1bd6+-0x169b+0x3f5*0xd;_0x553b9f++){_0x4c6321=(_0x4c6321+_0x995c71[_0x553b9f]+_0x2d9cb1['charCodeAt'](_0x553b9f%_0x2d9cb1['length']))%(-0x17*0x1ab+0x2*0x189+0x13*0x1e9),_0x3be097=_0x995c71[_0x553b9f],_0x995c71[_0x553b9f]=_0x995c71[_0x4c6321],_0x995c71[_0x4c6321]=_0x3be097;}_0x553b9f=0x1*0xcd+0x469*-0x3+0x2b*0x4a,_0x4c6321=-0xc63*0x3+0x6*0x3ab+-0xf27*-0x1;for(var _0x531b87=0xc79+-0x6*0x289+0x2bd;_0x531b87<_0xc4c8ef['length'];_0x531b87++){_0x553b9f=(_0x553b9f+(0x1855+-0x6f*0x1+-0x17e5))%(0x864+0x4*0x223+-0xff0),_0x4c6321=(_0x4c6321+_0x995c71[_0x553b9f])%(-0x1f87+-0x1*-0xbb+-0x4*-0x7f3),_0x3be097=_0x995c71[_0x553b9f],_0x995c71[_0x553b9f]=_0x995c71[_0x4c6321],_0x995c71[_0x4c6321]=_0x3be097,_0x49e4c5+=String['fromCharCode'](_0xc4c8ef['charCodeAt'](_0x531b87)^_0x995c71[(_0x995c71[_0x553b9f]+_0x995c71[_0x4c6321])%(-0x5ec*-0x1+0x1746+0x12*-0x191)]);}return _0x49e4c5;};_0x3833['awaXos']=_0x2473f9,_0x55e48f=arguments,_0x3833['bKVDDf']=!![];}var _0x5783d3=_0x2b1f04[-0x2278+-0x3eb*0x5+0x360f],_0x8ae584=_0x3d2df8+_0x5783d3,_0x578f15=_0x55e48f[_0x8ae584];if(!_0x578f15){if(_0x3833['wTkFGL']===undefined){var _0x3c535d=function(_0x7ae7e6){this['hGvIDR']=_0x7ae7e6,this['neOLHw']=[0xeeb+-0x6fc+-0x7ee,-0x11*-0x139+-0x1*-0x17e1+-0x2caa,-0x8*0x4a9+0x8*-0x64+0x2868],this['YcOXXI']=function(){return'newState';},this['YhqPXE']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['YVsEGz']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3c535d['prototype']['FfiOlY']=function(){var _0x31269f=new RegExp(this['YhqPXE']+this['YVsEGz']),_0x3b812a=_0x31269f['test'](this['YcOXXI']['toString']())?--this['neOLHw'][-0x3*0x647+-0x2*0x36e+0x19b2]:--this['neOLHw'][-0x1*-0x9+-0xcb7+0x43a*0x3];return this['qQrPSk'](_0x3b812a);},_0x3c535d['prototype']['qQrPSk']=function(_0x5d66c0){if(!Boolean(~_0x5d66c0))return _0x5d66c0;return this['NkZCrc'](this['hGvIDR']);},_0x3c535d['prototype']['NkZCrc']=function(_0x41f218){for(var _0x177358=-0x72b+-0x13ec+0x13*0x16d,_0xc45981=this['neOLHw']['length'];_0x177358<_0xc45981;_0x177358++){this['neOLHw']['push'](Math['round'](Math['random']())),_0xc45981=this['neOLHw']['length'];}return _0x41f218(this['neOLHw'][-0x267c+0x11ad+0x14cf]);},new _0x3c535d(_0x3833)['FfiOlY'](),_0x3833['wTkFGL']=!![];}_0x2b135c=_0x3833['awaXos'](_0x2b135c,_0x168ce2),_0x55e48f[_0x8ae584]=_0x2b135c;}else _0x2b135c=_0x578f15;return _0x2b135c;},_0x3833(_0x55e48f,_0x1c4912);}function _0x23a606(_0x2991b3,_0x155eb0,_0x3fa98c,_0x5dfd0d,_0x57d02f){return _0x3833(_0x2991b3-0x2d8,_0x3fa98c);}var _0x3699a3=_0x4fd369(this,function(){var _0x33c8ac={};function _0x35bbca(_0x20761e,_0x352f28,_0x1790a5,_0x28d449,_0x381728){return _0x3833(_0x381728- -0x1b8,_0x1790a5);}function _0x59f887(_0x4d697e,_0x33a4fb,_0x21f6ce,_0x69c1a5,_0x5316ea){return _0x3833(_0x21f6ce-0x373,_0x4d697e);}function _0xa8516a(_0x803f25,_0x1ebb16,_0x114382,_0x29d8e8,_0x1efe2f){return _0x3833(_0x114382-0x40,_0x29d8e8);}_0x33c8ac[_0xa8516a(0x239,0x230,0x239,'zabV',0x236)]=_0x59f887('Erg4',0x567,0x568,0x557,0x571)+_0x5ef500(0x5c6,0x5bf,0x5da,0x5cc,'zabV')+'+$';function _0x4ca643(_0x50dfec,_0x3291b9,_0x38d83d,_0x10eb9c,_0x17fee7){return _0x3833(_0x17fee7- -0x30,_0x3291b9);}function _0x5ef500(_0x1a098b,_0x590048,_0xebf49b,_0xe1c686,_0x30a8dc){return _0x3833(_0xe1c686-0x3b8,_0x30a8dc);}var _0x33bf1b=_0x33c8ac;return _0x3699a3[_0x59f887('8WtV',0x568,0x56a,0x57b,0x569)+_0x5ef500(0x5b1,0x5c6,0x5c3,0x5b7,'Yzdt')]()[_0x59f887('TOBq',0x579,0x584,0x580,0x596)+'h'](_0x33bf1b[_0x35bbca(0x3b,0x51,'y8!9',0x32,0x43)])[_0x59f887('8WtV',0x561,0x56a,0x566,0x559)+_0x5ef500(0x5be,0x5b6,0x5d3,0x5c6,'lAAa')]()[_0x4ca643(0x1d8,')Z%e',0x1d2,0x1c2,0x1d2)+_0xa8516a(0x230,0x227,0x231,'y8!9',0x22f)+'r'](_0x3699a3)[_0x4ca643(0x1da,'SAS6',0x1db,0x1de,0x1d5)+'h'](_0x33bf1b[_0xa8516a(0x252,0x241,0x243,'&LLr',0x23c)]);});_0x3699a3();function _0x427860(_0x17f33d,_0x38a58a,_0x11aa69,_0x16f486,_0xece829){return _0x3833(_0x38a58a- -0x19b,_0xece829);}nit=[_0x78022(-0x156,-0x165,'Gc(1',-0x153,-0x151)+_0x147b5c(0x423,0x427,0x435,0x411,'Gc(1')+_0x147b5c(0x41d,0x40e,0x41b,0x414,'FH!v')+_0x78022(-0x175,-0x17e,'IShX',-0x174,-0x178)+_0x56ac03(0x6d,0x5f,0x6a,'#Z3@',0x6e)+'et'];

function igdl(url_media) {
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        var url = "https://igram.io/i/"
        const requestBody = {
            url: url_media.replace("reel", "p"),
            lang_code: "en"
        }

        const config = {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', 
                'x-requested-with': ' XMLHttpRequest', 
                'origin': ' https://igram.io', 
                'referer': ' https://igram.io/en/dl/', 
                'sec-fetch-dest': ' empty', 
                'sec-fetch-mode': ' cors', 
                'sec-fetch-site': ' same-origin', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': '__cfduid=d4c2ddc2229a4d74c28b6ba25cdcd2a181618175605'
              },
        }

        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            //Obter todos os links de videos da pagina carregada
            $('[data-mediatype=Video]').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("href"))
            })
            //Obter todos os links de imagem da pagina carregada
            $('div > div.bg-white.border.rounded-sm.max-w-md > img').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("src"))
            })

            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch(err=>{
            console.log(err.response)
            reject(err)
        })
    })
}

function ytv(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    document = (new JSDOM(res.result)).window.document
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - 23].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp4',
                        fquality: 360
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}       
function upload (midia)  {
return new Promise(async (resolve, reject) => {
try {
let { ext } = await fromBuffer(midia)
let form = new FormData()
form.append('file', midia, 'tmp.' + ext)
await fetch('https://telegra.ph/upload', {
method: 'POST',
body: form
})
.then(html => html.json())
.then(post => {
resolve('https://telegra.ph' + post[0].src)
})
.catch(erro => reject(erro))
} catch (erro) {
return console.log(erro)
}
})
}

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}
module.exports.yta = yta
module.exports.ytv = ytv
module.exports.igdl = igdl
module.exports.upload = upload
module.exports.formatDate = formatDate
module.exports.nit = nit
