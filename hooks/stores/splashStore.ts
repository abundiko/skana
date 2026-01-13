import { create } from "zustand";

type SplashState = {
  isAppReady: boolean;
  setInitializedFonts: (ready: boolean) => void;
  initializedFonts: boolean;
  setAssetsLoaded: (loaded: boolean) => void;
  areAssetsLoaded: boolean;
};

function computeAppReady(state: SplashState) {
  return state.initializedFonts && state.areAssetsLoaded;
}

export const useSplashStore = create<SplashState>((set, get) => ({
  isAppReady: false,
  initializedFonts: false,
  areAssetsLoaded: false,
  setInitializedFonts: (ready: boolean) =>
    set(() => ({
      initializedFonts: ready,
      isAppReady: computeAppReady({ ...get(), initializedFonts: ready }),
    })),
  setAssetsLoaded: (loaded: boolean) =>
    set(() => ({
      areAssetsLoaded: loaded,
      isAppReady: computeAppReady({ ...get(), areAssetsLoaded: loaded }),
    })),
}));
