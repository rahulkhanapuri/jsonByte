import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

type ValidatorState = {
    jsonInput: string;
    setJsonInput: (input: string) => void;
    reset:() => void;
}


export const useValidatorStore = create<ValidatorState>((set) => ({
            jsonInput: '',
            setJsonInput: (input: string) => set({ jsonInput: input }),
            reset: () => set({ 
                jsonInput: '' 
            }),
        }
    ),  
);