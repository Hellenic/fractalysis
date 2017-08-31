import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component {
  state = {
    power: 2.0,
    bailout: 11.1
  }
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }
  handleChange(e, name) {
    this.setState({
      [name]: parseFloat(e.target.value)
    });
    this.props.onChange(this.state);
  }
  render() {
    const { power, bailout } = this.state;
    return (
      <aside className="panel" style={{ backgroundColor: '#293742' }}>
        <h2>Settings</h2>
        <hr />
        <section>
          <h5>Power</h5>
          <input type="range" value={power} min={1} max={3} step={0.01}  onChange={e => this.handleChange(e, 'power')} />
          <h5>Bailout</h5>
          <input type="range" value={bailout} min={0} max={20} step={0.1} onChange={e => this.handleChange(e, 'bailout')} />
        </section>
      </aside>
    );
  }
}

export default ConfigurationPanel;
