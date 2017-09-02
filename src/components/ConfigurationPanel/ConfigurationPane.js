import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UniformControl from '../UniformControl/UniformControl';

class ConfigurationPane extends Component {
  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    config: {}
  }
  render() {
    const { label, defaultValue, ...rest } = this.props.config;
    return (
      <div>
        <h5>{label}</h5>
        <UniformControl
          defaultValue={defaultValue}
          {...rest}
          onChange={v => this.props.onChange(v)}
        />
      </div>
    );
  }
}

export default ConfigurationPane;
