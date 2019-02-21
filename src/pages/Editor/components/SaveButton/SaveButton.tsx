import React, { Component } from 'react';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import withUniforms from '../../../../hocs/withUniforms';
import { Uniforms } from '../../../../types/index';

interface IProps {
  uniforms: Uniforms;
}

class SaveButton extends Component<IProps> {
  handleClick = () => {
    const { uniforms } = this.props;
    console.log('TODO Save this fractal to a user preset', uniforms);
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
