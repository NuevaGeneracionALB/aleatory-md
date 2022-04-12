const fs = require('fs')
const crypto = require('crypto')

const tictactoe = JSON.parse(fs.readFileSync('./datab/ttt/tictactoe.json'));

const addTTTId = (userId) => {
	const obj = {jid: userId, wins: 0, defeats: 0, ties: 0, points: 0}
    tictactoe.push(obj)
	fs.writeFileSync('./datab/ttt/tictactoe.json', JSON.stringify(tictactoe))
}

const addTTTwin = (userId, amount) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		tictactoe[position].wins += amount
		fs.writeFileSync('./datab/ttt/tictactoe.json', JSON.stringify(tictactoe))
	}
}

const addTTTdefeat = (userId, amount) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		tictactoe[position].defeats += amount
		fs.writeFileSync('./datab/ttt/tictactoe.json', JSON.stringify(tictactoe))
	}
}

const addTTTtie = (userId, amount) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		tictactoe[position].ties += amount
		fs.writeFileSync('./datab/ttt/tictactoe.json', JSON.stringify(tictactoe))
	}
}

const addTTTpoints = (userId, amount) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		tictactoe[position].points += amount
		fs.writeFileSync('./datab/ttt/tictactoe.json', JSON.stringify(tictactoe))
	}
}

const getTTTId = (userId) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return tictactoe[position].jid
	}
}

const getTTTwins = (userId) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return tictactoe[position].wins
	}
}

const getTTTdefeats = (userId) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return tictactoe[position].defeats
	}
}

const getTTTties = (userId) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return tictactoe[position].ties
	}
}

const getTTTpoints = (userId) => {
	let position = false
	Object.keys(tictactoe).forEach((i) => {
		if (tictactoe[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return tictactoe[position].points
	}
}

module.exports = {
	addTTTId, 
    addTTTwin,
    addTTTdefeat,
    addTTTtie, 
    addTTTpoints, 
    getTTTId, 
    getTTTwins, 
    getTTTdefeats, 
    getTTTties, 
    getTTTpoints,
}
