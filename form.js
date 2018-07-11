import React from 'react';
import {
  View
} from 'react-native';

export default class Form extends React.Component {
  static defaultProps = {
    focusOn: ['TextInput']
  }

  constructor() {
    super();
    this.inputs = [];
  }

  renderChildren(children, focusOn, recursiveIndex = 0) {
    return React.Children.map(children, (child, index) => {
      if (!child) {
        return;
      }

      if (child.props.children && child.props.children.props) {
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children, index)
        });
      }

      if (!focusOn.includes(child.type.name)) {
        return child;
      }

      let realIndex = index + recursiveIndex;

      return React.cloneElement(child, {
        onEnter: () => {
          for (i = ++realIndex; i < this.inputs.length; i++) {
            const input = this.inputs[i];

            if (input && input.props.editable) {
              input.focus();

              return;
            }
          }
        },
        inputRef: ref => (this.inputs[realIndex] = ref),
      });
    });
  }

  render() {
    let { children, focusOn, ...props } = this.props;
	
    return (
      <View {...props}>
        {this.renderChildren(children, focusOn)}
      </View>
    );
  }
}
