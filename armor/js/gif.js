const fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('node-fetch')
const FormData = require('form-data')
const { default: Axios } = require('axios');
const { exec } = require('child_process');
const { spawn } = require('child_process')
const BodyForm = require('form-data')
const axios = require('axios')

function webp2gifFile(path) {
return new Promise((resolve, reject) => {
const form = new BodyForm()
form.append('new-image-url', '')
form.append('new-image', fs.createReadStream(path))
axios({method: 'post', url: 'https://s6.ezgif.com/webp-to-mp4', data: form, headers: {'Content-Type': `multipart/form-data; boundary=${form._boundary}`}}).then(({ data }) => {
const bodyFormThen = new BodyForm()
const $ = cheerio.load(data)
const file = $('input[name="file"]').attr('value')
bodyFormThen.append('file', file)
bodyFormThen.append('convert', "Convert WebP to MP4!")
axios({method: 'post', url: 'https://ezgif.com/webp-to-mp4/' + file, data: bodyFormThen, headers: {'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
resolve({result: result})
}).catch(reject)
}).catch(reject)
})
}

module.exports = {webp2gifFile}