import React from "react";
import { TextInput, View } from "react-native";

export default class Form extends React.Component {
  static defaultProps = {
    focusOn: [TextInput]
  };

  constructor() {
    super();
    this.inputs = [];
  }

  renderChildren(children, focusOn) {
    // Counter is reset so it does not have duplicate components
    this.count = 0;

    return React.Children.map(children, (child, index) => {
      if (!child) {
        return;
      }

      if (child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children, focusOn)
        });
      }

      if (!focusOn.some(input => input === child.type)) {
        return child;
      }

      if (!child.props.editable && child.props.hasOwnProperty("editable")) {
        return child;
      }

      const realIndex = this.count;

      this.count++;

      return React.cloneElement(child, {
        onSubmitEditing: () => {
          if (child.props.onSubmitEditing) {
            child.props.onSubmitEditing();
          } else if (this.inputs[realIndex + 1]) {
            this.inputs[realIndex + 1].focus();
          }
        },
        inputRef: ref => (this.inputs[realIndex] = ref)
      });
    });
  }

  render() {
    let { children, focusOn, ...props } = this.props;

    return <View {...props}>{this.renderChildren(children, focusOn)}</View>;
  }
}
