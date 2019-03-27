# react-native-autofocus

`npm install @secullum/react-native-autofocus`

Autofocus the next input field on enter in React Native.

Have you started with React Native, added a few inputs, and then realized you had to add refs just to focus onto the next input field? This little package solves that problem. Import your text input from and wrap them in a form:

```js
import { Form } from '@secullum/react-native-autofocus'

export default () => (
  <Form focusOn={[MyTextInput]}>
    <MyTextInput placeholder="test" />
    <MyTextInput placeholder="test 2" />
  </Form>
)
```

Hit enter inside your first input, and the next field will be focused. The logic is all abstracted for you!
