import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ConfigurationInput from './ConfigurationInput';
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component {
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
      <aside className="panel" style={{ backgroundColor: '#293742' }}>
        <h2>Settings</h2>
        <hr />
        <section>
          {
            uniforms && Object.keys(uniforms).map(key => (
              <ConfigurationInput key={`uniform-${key}`} config={uniforms[key]} onChange={v => this.handleChange(v, key)} />
            ))
          }
        </section>
      </aside>
    );
  }
}

export default ConfigurationPanel;
