import type { User } from '../db/types'

export type Locals = App.Locals & {
	user?: User
}
