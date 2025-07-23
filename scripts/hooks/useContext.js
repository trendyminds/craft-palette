import { atom, useAtom } from 'jotai'

export const contextAtom = atom('ACTIONS')

export default () => useAtom(contextAtom)
