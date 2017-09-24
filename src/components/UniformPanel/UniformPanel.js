import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import UniformControl from '../UniformControl/UniformControl';
import './UniformPanel.css';

class UniformPanel extends Component {
  state = {}
  static propTypes = {
    uniforms: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  handleChange(value, name) {
    this.setState({
      [name]: value
    });
    this.props.onChange(this.state);
  }
  render() {
    const { uniforms } = this.props;
    return (
      <aside className="panel" >
        <Segment>
          <h2>Settings</h2>
          <section>
            {
              uniforms && Object.keys(uniforms).map(key => (
                <UniformControl
                  key={`uniform-${key}`}
                  {...uniforms[key]}
                  onChange={v => this.handleChange(v, key)}
                />
              ))
            }
          </section>
        </Segment>
      </aside>
    );
  }
}

export default UniformPanel;
