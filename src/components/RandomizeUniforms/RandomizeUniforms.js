import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { parse, stringify } from 'qs';
import TextIcon from '../TextIcon/TextIcon';
import { getUniformType } from '../../utils/uniforms';

class RandomizeUniforms extends Component {
  randomizeUniforms() {
    // Pull the config from sessionStorage
    const shaderConfiguration = JSON.parse(sessionStorage.getItem('shader'));
    const { config: { uniforms } } = shaderConfiguration;
    const randomUniforms = {};

    // Randomize a value for each uniforms based on it's type and given min/max
    Object.keys(uniforms).forEach(key => {
      const conf = uniforms[key];
      const uniformType = getUniformType(conf.defaultValue);
      switch (uniformType) {
        case 'int':
          randomUniforms[key] = Math.round((Math.random() * (conf.max - conf.min - 1)) + conf.min);
          return;
        case 'float':
          randomUniforms[key] = (Math.random() * (conf.max - conf.min - 1)) + conf.min;
          return;
        case 'boolean':
          randomUniforms[key] = (Math.random() >= 0.5);
          return;
        case 'vec2':
          // TODO Not sure if this would work correctly for all the vec2 uniforms
          randomUniforms[key] = conf.defaultValue.map(v => Math.random());
          return;
        default:
          console.warn('Unknown uniform, add handling', uniformType, conf.defaultValue);
          randomUniforms[key] = conf.defaultValue;
          return;
      }
    });

    // Push the new randomized uniforms into the URL
    const { history, location } = this.props;
    const currentQuery = parse(location.search.substring(1));
    const fullQuery = Object.assign({}, { shader: currentQuery.shader }, randomUniforms);
    history.push(`?${stringify(fullQuery)}`);
  }
  render() {
    return (
      <TextIcon icon="video play" title="Randomize" onClick={() => this.randomizeUniforms()} />
    )
  }
}

export default withRouter(RandomizeUniforms);
