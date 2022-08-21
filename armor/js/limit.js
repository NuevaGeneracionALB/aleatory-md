const fs = require('fs')

const addLimit = (userId, _dir) => {
const obj = { id: userId, time: Date.now() }
_dir.push(obj)
fs.writeFileSync('./datab/usuarios/diario.json', JSON.stringify(_dir))
}

const getLimit = (userId, _dir) => {
let position = false
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
position = i
}
})

if (position !== false) {
return _dir[position].time
}
}  

module.exports = {
	addLimit,
	getLimit,
}
