// Type definitions for react-native-autofocus
// Project: https://github.com/zackify/react-native-autofocus
// Definitions by: Felipe Ghiggi <https://github.com/fghiggi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.7.2
declare module 'react-native-autofocus' {
  interface FormProps {
    focusOn?: Array<React.ComponentType>;
  }

  export declare class Form extends React.Component<FormProps> {}
}
