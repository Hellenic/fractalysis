import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import { withRouter } from 'react-router';
import { Dropdown } from 'semantic-ui-react';
import { parse, stringify } from 'qs';
import TextIcon from '../../components/TextIcon/TextIcon';
import configurations from '../configurations.json';

const DEFAULT_SHADER = 'Mandelbrot';

class ComposingShader extends Component {
  state = {
    shaderKey: null,
    shaderId: null,
    resetUniforms: false
  }
  handleShadersCompiled(err, result) {
    if (err) {
      // TODO Handle errors
      return;
    }
    const { shaderKey, shaderId, resetUniforms } = this.state;
    const { history: { push }, location } = this.props;
    const search = resetUniforms ? {} : parse(location.search.substring(1));
    // Store shader information into the URL
    const query = Object.assign({}, search, { shader: shaderKey, shaderId });
    const queryString = stringify(query);
    push(`?${queryString}`);
  }

  async loadShader(shaderKey) {
    // TODO This should be cached. I think we can check it with GL.Shaders, if it's already there
    const hostname = window.location.hostname;
    const shaderResponse = await superagent.get(`http://${hostname}:3001/compile/${shaderKey}`);
    const shaders = await GL.Shaders.create({
      [shaderKey]: {
        frag: shaderResponse.text
      }
    }, (err, res) => this.handleShadersCompiled(err, res));
    const shaderId = shaders[shaderKey];
    // If whole shader changed, we should reset the URL uniforms
    const resetUniforms = (this.state.shaderKey !== null && this.state.shaderKey !== shaderKey);
    this.setState({ shaderKey, shaderId, resetUniforms });
  }

  // Load either URL defined or default shader on initial load
  async componentWillMount() {
    const { location } = this.props;
    const query = parse(location.search.substring(1));
    await this.loadShader(query.shader || DEFAULT_SHADER);
  }

  render() {
    return (
      <Dropdown trigger={<TextIcon icon="eye" title="Shader" />} icon="dropdown">
        <Dropdown.Menu>
          {
            Object.keys(configurations).map(key => {
              const conf = configurations[key];
              return (
                <Dropdown.Item
                  key={`shader-${key}`}
                  icon={conf.icon}
                  text={key}
                  value={conf.shader}
                  onClick={(e, { value }) => this.loadShader(key)}
                />
              );
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default withRouter(ComposingShader);
