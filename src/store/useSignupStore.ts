import { create } from "zustand";

interface SignupState {
  step: number;
  formData: {
    nickname: string;
    userRole: string;
    userCategory: {
      career: boolean;
      mental: boolean;
      relationship: boolean;
      love: boolean;
      life: boolean;
      finance: boolean;
      housing: boolean;
      other: boolean;
    };
    birdName: string;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<SignupState["formData"]>) => void;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  step: 0,
  formData: {
    nickname: "",
    userRole: "",
    userCategory: {
      career: false,
      mental: false,
      relationship: false,
      love: false,
      life: false,
      finance: false,
      housing: false,
      other: false,
    },
    birdName: "",
  },
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetSignup: () =>
    set({
      step: 0,
      formData: {
        nickname: "",
        userRole: "",
        userCategory: {
          career: false,
          mental: false,
          relationship: false,
          love: false,
          life: false,
          finance: false,
          housing: false,
          other: false,
        },
        birdName: "",
      },
    }),
}));
