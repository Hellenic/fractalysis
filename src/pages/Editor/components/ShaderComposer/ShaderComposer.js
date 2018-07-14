import React, { Component } from 'react';
import superagent from 'superagent';
import { Shaders } from 'gl-react';
import { withRouter } from 'react-router';
import { Dropdown } from 'semantic-ui-react';
import { parse, stringify } from 'qs';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import configurations from '../../configurations.json';

const DEFAULT_SHADER = 'Mandelbrot';

// TODO Currently this is just a dropdown menu of all possible shaders
// but the goal in the future is that this component could be used to:
// First; Select main shader (e.g. 2D or 3D)
// Second; Select secondary shader (e.g. Mandelbrot)
// Lastlyt; Select optional shaders like bloom or blur (and the order their applied in)
class ComposingShader extends Component {
  state = {
    shaderKey: null
  };

  async loadShader(shaderKey) {
    // TODO Shaders could be cached (no need to load and create if it's already there)
    const hostname = window.location.hostname;
    const shaderResponse = await superagent.get(
      `http://${hostname}:3001/compile/${shaderKey}`
    );
    const shaders = await Shaders.create({
      [shaderKey]: {
        frag: shaderResponse.text
      }
    });
    const shaderDef = shaders[shaderKey];

    // If whole shader changed, we should reset the URL uniforms
    const resetUniforms =
      this.state.shaderKey !== null && this.state.shaderKey !== shaderKey;
    this.setState({ shaderKey });

    const {
      history: { push },
      location
    } = this.props;
    const search = resetUniforms ? {} : parse(location.search.substring(1));
    // Store shader information into the URL
    const query = Object.assign({}, search, {
      shader: shaderKey,
      shaderId: shaderDef.id
    });
    const queryString = stringify(query);
    push(`?${queryString}`);
  }

  // Load either URL defined or default shader on initial load
  async componentWillMount() {
    const { location } = this.props;
    const query = parse(location.search.substring(1));
    await this.loadShader(query.shader || DEFAULT_SHADER);
  }

  render() {
    return (
      <Dropdown
        trigger={<TextIcon icon="eye" title="Shader" />}
        icon="dropdown"
      >
        <Dropdown.Menu>
          {Object.keys(configurations).map(key => {
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
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withRouter(ComposingShader);
