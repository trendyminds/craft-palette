import { atom, useRecoilState } from 'recoil'

export const contextState = atom({
	key: 'context',
	default: 'ACTIONS',
})

export default () => useRecoilState(contextState)
