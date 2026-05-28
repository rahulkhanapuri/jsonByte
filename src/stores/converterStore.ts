import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

type converterState = {
    jsonInput: string;
    setJsonInput: (input: string) => void;
    reset:() => void;
}

export const useConverterStore = create<converterState>((set, get) => ({
            jsonInput: '',
            setJsonInput: (input: string) => set({ jsonInput: input }),
            reset: () => set({ 
                jsonInput: '' 
            }),
        }
    ),  
);