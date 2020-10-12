import React, { Component } from 'react';
import withScene from '../../hocs/withScene';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import { getUniformType } from '../../utils/uniforms';
import configurations from '../../configurations.json';

class RandomizeUniforms extends Component {
  randomizeUniforms() {
    const { shader } = this.props;
    const { randomizable, uniforms } = configurations[shader];
    const randomUniforms = {};

    // Randomize a value for each whitelisted uniforms based on it's type and given min/max
    Object.keys(uniforms).forEach(key => {
      const conf = uniforms[key];
      if (!Array.isArray(randomizable) || !randomizable.includes(key)) {
        randomUniforms[key] = conf.defaultValue;
        return;
      }
      const uniformType = getUniformType(conf.defaultValue);
      switch (uniformType) {
        case 'int':
          randomUniforms[key] = Math.round(
            Math.random() * (conf.max - conf.min - 1) + conf.min
          );
          return;
        case 'float':
          randomUniforms[key] =
            Math.random() * (conf.max - conf.min - 1) + conf.min;
          return;
        case 'bool':
          randomUniforms[key] = Math.random() >= 0.5;
          return;
        case 'vec2':
          // TODO Not sure if this would work correctly for all the vec2 uniforms
          randomUniforms[key] = conf.defaultValue.map(v => Math.random());
          return;
        default:
          console.warn(
            'Unknown uniform, add handling',
            uniformType,
            conf.defaultValue
          );
          randomUniforms[key] = conf.defaultValue;
          return;
      }
    });

    // Update the scene with new randomized uniforms
    this.props.updateUniforms(randomUniforms);
  }

  resetUniforms() {
    const { shader } = this.props;
    const { uniforms } = configurations[shader];
    const uniformDefaults = {};
    Object.keys(uniforms).forEach(key => {
      const conf = uniforms[key];
      uniformDefaults[key] = conf.defaultValue;
    });

    // Update the scene with default uniforms to reset
    this.props.updateUniforms(uniformDefaults);
  }
  render() {
    return (
      <React.Fragment>
        <TextIcon
          icon="random"
          title="Randomize"
          onClick={() => this.randomizeUniforms()}
        />
        <TextIcon
          icon="refresh"
          title="Reset"
          size="small"
          onClick={() => this.resetUniforms()}
        />
      </React.Fragment>
    );
  }
}

export default withScene(RandomizeUniforms);
