import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Colors, Slider } from "@blueprintjs/core";
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component {
  state = {
    power: 2.0,
    bailout: 11.1
  }
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }
  handleChange(value, name) {
    this.setState({
      [name]: value
    });
    this.props.onChange(this.state);
  }
  render() {
    const { power, bailout } = this.state;
    return (
      <aside className="panel" style={{ backgroundColor: Colors.DARK_GRAY3 }}>
        <h2>Settings</h2>
        <hr />
        <section>
          <small>Power</small>
          <Slider min={1} max={3} stepSize={0.01} labelStepSize={0.5} value={power} onChange={v => this.handleChange(v, 'power')} />
          <small>Bailout</small>
          <Slider min={0} max={20} stepSize={0.1} labelStepSize={5} value={bailout} onChange={v => this.handleChange(v, 'bailout')} />
        </section>
      </aside>
    );
  }
}

export default ConfigurationPanel;
