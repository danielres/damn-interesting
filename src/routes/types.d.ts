import type { CurrentUserView } from '../db/types'

export type Locals = App.Locals & {
	user?: CurrentUserView
}
