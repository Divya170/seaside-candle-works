import 'react';

// `text-wrap` (balance / pretty) is used by the design but missing from older csstype releases.
declare module 'react' {
  interface CSSProperties {
    textWrap?: any;
  }
}
