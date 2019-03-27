import * as React from 'react';
import { TextInput, View, ViewProperties } from 'react-native';

export interface FormProperties extends ViewProperties {
  focusOn?: Array<React.ComponentType>;
}

export class Form extends React.Component<FormProperties> {
  static defaultProps = {
    focusOn: [TextInput]
  };

  inputs: Array<any> = [];
  count = 0;

  renderChildren(children: any, focusOn: Array<React.ComponentType>): any {
    // Counter is reset so it does not have duplicate components
    this.count = 0;

    return React.Children.map(children, child => {
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

      if (!child.props.editable && child.props.hasOwnProperty('editable')) {
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
        inputRef: (ref: any) => (this.inputs[realIndex] = ref)
      });
    });
  }

  render() {
    let { children, focusOn, ...props } = this.props;

    return <View {...props}>{this.renderChildren(children, focusOn!)}</View>;
  }
}
