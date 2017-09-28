import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import { withRouter } from 'react-router';
import { Dropdown } from 'semantic-ui-react';
import { parse, stringify } from 'qs';
import TextIcon from '../../components/TextIcon/TextIcon';
import configurations from '../configurations.json';

const DEFAULT_SHADER = 'default2D';

class ComposingShader extends Component {
  state = {
    shaderName: null,
    shaderId: null,
    resetUniforms: false
  }
  handleShadersCompiled(err, result) {
    if (err) {
      // TODO Handle errors
      return;
    }
    const { shaderName, shaderId, resetUniforms } = this.state;
    const { history: { push }, location } = this.props;
    const search = resetUniforms ? {} : parse(location.search.substring(1));
    // Store shader information into the URL
    const query = Object.assign({}, search, { shader: shaderName, shaderId });
    const queryString = stringify(query);
    push(`?${queryString}`);
  }

  async loadShader(shaderName) {
    const config = configurations[shaderName];
    // TODO This should be cached. I think we can check it with GL.Shaders, if it's already there
    const shaderResponse = await superagent.get(config.shader);
    // TODO This method is async, but the callback does not return the ID...
    // Setup some state for this
    const shaderId = await GL.Shaders.create({
      [shaderName]: {
        frag: shaderResponse.text
      }
    }, (err, res) => this.handleShadersCompiled(err, res))[shaderName];
    // If whole shader changed, we should reset the URL uniforms
    const resetUniforms = (this.state.shaderName !== null && this.state.shaderName !== shaderName);
    this.setState({ shaderName, shaderId, resetUniforms });
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
                  text={conf.name}
                  value={key}
                  onClick={(e, { value }) => this.loadShader(value)}
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
