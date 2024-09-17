// Preamble taken from vite index.html
// @ts-ignore
import RefreshRuntime from 'http://localhost:5173/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type: any) => type;
window.__vite_plugin_react_preamble_installed__ = true;

// After loading react refresh, import the actual component
// @ts-ignore
await import('http://localhost:5173/src/bento.ts');

declare namespace global {}

declare global {
  interface Window {
    $RefreshReg$: any;
    $RefreshSig$: (type: any) => any;
    __vite_plugin_react_preamble_installed__: boolean;
  }
}
