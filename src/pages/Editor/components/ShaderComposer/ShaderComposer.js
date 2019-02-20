import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Dropdown } from 'semantic-ui-react';
import { stringify } from 'qs';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import configurations from '../../configurations.json';

// TODO Currently this is just a dropdown menu of all possible shaders
// but the goal in the future is that this component could be used to:
// First; Select main shader (e.g. 2D or 3D)
// Second; Select secondary shader (e.g. Mandelbrot)
// Lastlyt; Select optional shaders like bloom or blur (and the order their applied in)
class ComposingShader extends Component {
  state = {
    shaderKey: null
  };

  switchShader(shaderKey) {
    const { push } = this.props.history;
    const queryString = stringify({ shader: shaderKey });
    push(`?${queryString}`);
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
                onClick={(e, { value }) => this.switchShader(key)}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withRouter(ComposingShader);
