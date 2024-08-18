/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOGIN_URL: string;
    readonly VITE_SIGNUP_URL: string;
    readonly VITE_WEBSOCKET_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }