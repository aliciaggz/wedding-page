//archivo para hacer saber a astro que existen archivos .vue

/// <reference types="astro/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}