import { create } from "zustand";

type GraphViewState = {
  jsonInput: string;
  setJsonInput: (input: string) => void;
  reset: () => void;
};

export const useGraphViewStore = create<GraphViewState>((set) => ({
  jsonInput: "",
  setJsonInput: (input: string) => set({ jsonInput: input }),
  reset: () =>
    set({
      jsonInput: "",
    }),
   
}));
