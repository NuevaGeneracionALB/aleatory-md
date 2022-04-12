const fs = require('fs')
const toMs = require('ms')

/**
 * Add user to bannedList datauser
 * @param {String} userId
 * @param {String} expired
 * @param {Object} _data
 */
 const addBanned = (userId, expired, _data) => {
    let success = false
    if (expired === undefined) {
        expired = 'PERMANENT'
    } else {
        expired = expired
    }
    
    let expired_at = 'PERMANENT'
    
    if (expired === 'PERMANENT') {
        expired_at = 'PERMANENT'
    } else {
        expired_at = Date.now() + toMs(expired)
    }
    
    const obj = {
        id: userId,
        expired: expired_at
    }
    
    _data.push(obj)
    fs.writeFileSync('./database/user/banned.json', JSON.stringify(_data))
}
/**
 * Unbanned someone.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
 const unBanned = (userId, _data) => {
    let position = null
    Object.keys(_data).forEach((i) => {
        if (_data[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _data.splice(position, 1)
        fs.writeFileSync('./database/user/banned.json', JSON.stringify(_data))
    }
    return true
}
const BannedExpired = (_dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].expired === 'PERMANENT') {
                position = null
            } else if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Banned expired: ${_dir[position].id}`)
            _dir.splice(position, 1)
            fs.writeFileSync('./database/user/banned.json', JSON.stringify(_dir))
        }
    }, 1000)
}
/**
 * Check user is premium.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
 const cekBannedUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

module.exports = {
    addBanned,
    unBanned,
    BannedExpired,
    cekBannedUser
}