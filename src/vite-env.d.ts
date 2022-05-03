/// <reference types="vite/client" />

declare type AnyFunction = (...args: any[]) => any;
interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  // other env
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
