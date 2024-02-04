const crypto = require('crypto')

const generateTemporaryPassword = () => {
    const buffer = crypto.randomBytes(8)
    const temporaryPassword = buffer.toString('hex')
    return temporaryPassword
}

module.exports = generateTemporaryPassword