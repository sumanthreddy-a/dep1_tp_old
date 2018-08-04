const crypto = require('crypto')
const cbor = require('cbor')
const decodeData = (payload) => {
    // return new Promise((reject, resolve) => {
        let result = cbor.decodeFirst(payload)
    //     result ? resolve(result) : reject(result)
    // })
    return result
}
const hash = data => crypto.createHash('sha512').update(data).digest('hex').toLowerCase()

module.exports = {
    decodeData,
    hash
}