import { atom, useRecoilState } from 'recoil'

export const openState = atom({
	key: 'open',
	default: false,
})

export default () => useRecoilState(openState)
