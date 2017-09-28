import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { stringify } from 'qs';
import parse from '../../utils/query-parser';
import UniformControl from '../UniformControl/UniformControl';
import configurations from '../configurations.json';
import './UniformPanel.css';

class UniformPanel extends Component {
  handleChange(value, name, currentQuery) {
    // Push the uniform key-value into the URL
    const queryString = stringify(Object.assign({}, currentQuery, { [name]: value }));
    this.props.history.push(`?${queryString}`);
  }
  render() {
    const { location } = this.props;
    const { shader, shaderId, ...urlUniforms } = parse(location.search.substring(1));
    if (!shader || !configurations[shader]) {
      return null;
    }

    const { uniforms } = configurations[shader];
    const opts = { shader, shaderId, ...urlUniforms };
    // Read uniforms values from the URL or default from configurations
    const uniformValues = {};
    Object.keys(uniforms).forEach(key => {
      const defaultValue = uniforms[key].defaultValue;
      const uniformValue = (key in urlUniforms) ? urlUniforms[key] : defaultValue;
      uniformValues[key] = uniformValue;
    });

    return (
      <aside className="panel" >
        <Segment>
          <h2>Settings</h2>
          <section>
            {
              Object.keys(uniforms).map(key => (
                <UniformControl
                  key={`uniform-${key}`}
                  label={uniforms[key].label}
                  value={uniformValues[key]}
                  onChange={v => this.handleChange(v, key, opts)}
                />
              ))
            }
          </section>
        </Segment>
      </aside>
    );
  }
}

export default withRouter(UniformPanel);
