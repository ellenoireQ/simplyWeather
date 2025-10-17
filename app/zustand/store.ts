import { create } from "zustand"

interface WindowState {
    isOpened: boolean
    setOpened: () => void
    setWeatherValues: (clr: string, bg: string) => void,
    clr: string,
    bg: string
}


export const useZusState = create<WindowState>((set) =>({
    clr: 'white',
    bg: 'black',
    isOpened: false,
    setOpened: () => set((state) => ({ isOpened: state.isOpened = !state.isOpened })),
    setWeatherValues(clr, bg) {
     set(() => ({clr: clr, bg: bg}))   
    },
}))