import { create } from 'zustand';

interface SizeInfo {
    bytes: number;
    kb: string;
    mb: string;
    characters: number;
    lines: number;
}
type ValidatorState = {
    jsonInput: string;
    setJsonInput: (input: string) => void;
    minifiedSize: SizeInfo | null;
    setMinifiedSize: (sizeInfo: SizeInfo | null) => void;
    sizeInfo: SizeInfo | null;
    setSizeInfo: (sizeInfo: SizeInfo | null) => void;
    reset: () => void;
}

export const usesizeValidatorStore = create<ValidatorState>()((set, get) => ({
    jsonInput: "",
    setJsonInput: (input: string) => set({ jsonInput: input }),
    minifiedSize: null,
    setMinifiedSize: (sizeInfo: SizeInfo | null) => set({ minifiedSize: sizeInfo }),
    sizeInfo: null,
    setSizeInfo: (sizeInfo: SizeInfo | null) => set({ sizeInfo: sizeInfo }),
    reset: () => set({
        jsonInput: '',
        minifiedSize: null,
        sizeInfo: null,
    })
}));