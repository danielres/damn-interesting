import crypto from 'crypto'

import { env as private_env } from '$env/dynamic/private'

const SALT = private_env.ENCRYPTION_SALT
const SECRET = private_env.ENCRYPTION_SECRET

const ALGORITHM = 'aes-192-cbc'
// const ENCODING = 'base64'
const ENCODING = 'hex'

const encrypt = (clearText: string) => {
	const key = crypto.scryptSync(SECRET, SALT, 24)
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
	const encrypted = cipher.update(clearText, 'utf8', ENCODING)
	return [encrypted + cipher.final(ENCODING), Buffer.from(iv).toString(ENCODING)].join('_')
}

const decrypt = (encryptedText: string) => {
	const key = crypto.scryptSync(SECRET, SALT, 24)
	const [encrypted, iv] = encryptedText.split('_')
	if (!iv) throw new Error('IV not found')
	const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, ENCODING))
	return decipher.update(encrypted, ENCODING, 'utf8') + decipher.final('utf8')
}

type EncryptableObject = {
	[index: string]: string | EncryptableObject
}

export const encryptObject = (object: EncryptableObject) => encrypt(JSON.stringify(object))
export const decryptObject = (string: string) => JSON.parse(decrypt(string))
