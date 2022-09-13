import * as fs from 'node:fs'

export const doesFileExist = async (path: string) => {
	try {
		await fs.promises.access(path, fs.constants.F_OK)
		return true
	} catch (error) {
		return false
	}
}
