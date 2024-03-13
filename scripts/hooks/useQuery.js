import { atom, useRecoilState } from 'recoil'

export const queryState = atom({
	key: 'query',
	default: '',
})

export default () => useRecoilState(queryState)
