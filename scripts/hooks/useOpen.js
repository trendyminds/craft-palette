import { atom, useAtom } from 'jotai'

export const openAtom = atom(false)

export default () => useAtom(openAtom)
