import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { parse, stringify } from 'qs';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import Constants from '../../../../constants';
import { getUniformType } from '../../utils/uniforms';
import configurations from '../../configurations.json';

class RandomizeUniforms extends Component {
  randomizeUniforms() {
    const { history, location } = this.props;
    const { shader = Constants.DEFAULT_SHADER } = parse(
      location.search.substring(1)
    );
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

    // Push the new randomized uniforms into the URL
    const queryString = stringify(
      Object.assign({}, { shader }, randomUniforms)
    );
    history.push(`?${queryString}`);
  }
  resetUniforms() {
    const { history, location } = this.props;
    const { shader = Constants.DEFAULT_SHADER, shaderId } = parse(
      location.search.substring(1)
    );
    const { uniforms } = configurations[shader];
    const uniformDefaults = {};
    Object.keys(uniforms).forEach(key => {
      const conf = uniforms[key];
      uniformDefaults[key] = conf.defaultValue;
    });

    // Push the new randomized uniforms into the URL
    const queryString = stringify(
      Object.assign({}, { shader, shaderId }, uniformDefaults)
    );
    history.push(`?${queryString}`);
  }
  render() {
    return (
      <React.Fragment>
        <TextIcon
          icon="video play"
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

export default withRouter(RandomizeUniforms);
