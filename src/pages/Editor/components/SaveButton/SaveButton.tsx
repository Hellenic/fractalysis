import React, { Component } from 'react';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import withUniforms from '../../../../hocs/withUniforms';
import { Uniforms, WithUniformsProps } from '../../../../types/index';

class SaveButton extends Component<WithUniformsProps> {
  handleClick = () => {
    const { uniforms, shader } = this.props;
    console.log('TODO Save this fractal to a user preset', shader, uniforms);
  };

  render() {
    return (
      <TextIcon
        icon="save"
        size="big"
        title="Save"
        onClick={this.handleClick}
      />
    );
  }
}

export default withUniforms(SaveButton);
