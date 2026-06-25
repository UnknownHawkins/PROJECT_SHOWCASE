"use client";

import { create } from "zustand";

type UiState = {
  commandOpen: boolean;
  activeProjectSlug: string | null;
  setCommandOpen: (value: boolean) => void;
  setActiveProjectSlug: (slug: string | null) => void;
};

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  activeProjectSlug: null,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setActiveProjectSlug: (activeProjectSlug) => set({ activeProjectSlug })
}));
