/// <reference types="vite/client" />

export {};

declare global {
  interface Math {
    seed: (seed: number) => () => number;
  }
}
