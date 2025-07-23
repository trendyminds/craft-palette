import { atom, useAtom } from 'jotai'

export const queryState = atom('')

export default () => useAtom(queryState)
