import crypto from 'crypto'
import { ENCRYPTION_SALT, ENCRYPTION_SECRET } from '$env/static/private'

const SALT = ENCRYPTION_SALT
const SECRET = ENCRYPTION_SECRET

const ALGORITHM = 'aes-192-cbc'
const ENCODING = 'hex'
// const ENCODING = 'base64'

const encrypt = (clearText) => {
	const key = crypto.scryptSync(SECRET, SALT, 24)
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
	const encrypted = cipher.update(clearText, 'utf8', ENCODING)
	return [encrypted + cipher.final(ENCODING), Buffer.from(iv).toString(ENCODING)].join('_')
}

const decrypt = (encryptedText) => {
	const key = crypto.scryptSync(SECRET, SALT, 24)
	const [encrypted, iv] = encryptedText.split('_')
	if (!iv) throw new Error('IV not found')
	const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, ENCODING))
	return decipher.update(encrypted, ENCODING, 'utf8') + decipher.final('utf8')
}

export const encryptObject = (object) => encrypt(JSON.stringify(object))
export const decryptObject = (string) => JSON.parse(decrypt(string))
