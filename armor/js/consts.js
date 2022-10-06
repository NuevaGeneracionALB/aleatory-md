const fs = require('fs')
const toMs = require('ms')
const request = require('request')
const ffmpeg = require('fluent-ffmpeg')
const moment = require('moment-timezone')
const _level = JSON.parse(fs.readFileSync('./datab/usuarios/level.json'))
const _limit = JSON.parse(fs.readFileSync('./datab/grupos/limit.json'))
const dindin = JSON.parse(fs.readFileSync('./datab/usuarios/dindin.json'));


const getLevelingXp = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].xp
}
}

const getLevelingLevel = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].level
}
}        

const getLevelingId = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].id
}
}

const addLevelingXp = (userId, amount) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
_level[position].xp += amount
fs.writeFileSync('./datab/usuarios/level.json', JSON.stringify(_level))
}
}

const addLevelingLevel = (userId, amount) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
_level[position].level += amount
fs.writeFileSync('./datab/usuarios/level.json', JSON.stringify(_level))
}
}

const addLevelingId = (idgrupo, userId) => {
const obj = {idgp:idgrupo, id: userId, xp: 1, level: 1}
_level.push(obj)
fs.writeFileSync('./datab/usuarios/level.json', JSON.stringify(_level))
}
 
const bayarLimit = (sender, amount) => {
let position = false
Object.keys(_limit).forEach((i) => {
if (_limit[i].id === sender) {
position = i
}
})
if (position !== false) {
_limit[position].limit -= amount
fs.writeFileSync('./datab/grupos/limit.json', JSON.stringify(_limit))
}
}
        
const limitAdd = (sender) => {
let position = false
Object.keys(_limit).forEach((i) => {
if (_limit[i].id == sender) {
position = i
}
})
if (position !== false) {
_limit[position].limit += 1
fs.writeFileSync('./datab/grupos/limit.json', JSON.stringify(_limit))
}
}
     
const addATM = (sender) => {
const obj = {id: sender, dindin : 0}
dindin.push(obj)
fs.writeFileSync('./datab/usuarios/dindin.json', JSON.stringify(dindin))
}
        
const addKoinUser = (sender, amount) => {
let position = false
Object.keys(dindin).forEach((i) => {
if (dindin[i].id === sender) {
position = i
}
})
if (position !== false) {
dindin[position].dindin += amount
fs.writeFileSync('./datab/usuarios/dindin.json', JSON.stringify(dindin))
}
}
const checkATMuser = (sender) => {
let position = false
Object.keys(dindin).forEach((i) => {
if (dindin[i].id === sender) {
position = i
}
})
if (position !== false) {
return dindin[position].dindin
}
}

const getRegisteredRandomId = () => {
return _registered[Math.floor(Math.random() * _registered.length)].id
}
const addRegisteredUser = (userid, sender, age, time, serials) => {
const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
_registered.push(obj)
fs.writeFileSync('./datab/usuarios/registered.json', JSON.stringify(_registered))
}
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}
const checkRegisteredUser = (sender) => {
let status = false
Object.keys(_registered).forEach((i) => {
if (_registered[i].id === sender) {
status = true
}
})
return status
}

const confirmATM = (sender, amount) => {
let position = false
Object.keys(dindin).forEach((i) => {
if (dindin[i].id === sender) {
position = i
}
})
if (position !== false) {
dindin[position].dindin -= amount
fs.writeFileSync('./datab/usuarios/dindin.json', JSON.stringify(dindin))
}
}

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dia, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Hora, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minuto, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " Segundos") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

supre = `558198923680@s.whatsapp.net`
                         
const getpc = async function(totalchat){
pc = []
a = []
b = []
for (c of totalchat){
a.push(c.id)
}
for (d of a){
if (d && !d.includes('g.us')){
b.push(d)
}
}
return b
}

module.exports = { 
getLevelingXp, 
getLevelingLevel, 
getLevelingId, 
addLevelingXp, 
addLevelingLevel, 
addLevelingId, 
bayarLimit, 
limitAdd, 
addATM, 
addKoinUser, 
checkATMuser, 
getRegisteredRandomId, 
addRegisteredUser, 
createSerial, 
checkRegisteredUser, 
confirmATM, 
runtime,
getpc, 
supre }