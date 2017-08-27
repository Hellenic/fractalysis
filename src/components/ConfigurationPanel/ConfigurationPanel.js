import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Colors, Slider } from "@blueprintjs/core";
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component {
  state = {
    scale: 2.0,
    surfaceDetail: 1.0,
    surfaceSmoothness: 0.6,
    boundingRadius: 5
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
    const { scale, surfaceDetail, surfaceSmoothness, boundingRadius } = this.state;
    return (
      <aside className="panel" style={{ backgroundColor: Colors.DARK_GRAY3 }}>
        <h2>Settings</h2>
        <hr />
        <section>
          <small>Scale</small>
          <Slider min={0} max={10} stepSize={0.1} labelStepSize={10} value={scale} onChange={v => this.handleChange(v, 'scale')} />
          <small>Surface detail</small>
          <Slider min={0} max={10} stepSize={0.1} labelStepSize={10} value={surfaceDetail} onChange={v => this.handleChange(v, 'surfaceDetail')} />
          <small>Surface smoothness</small>
          <Slider min={0} max={10} stepSize={0.1} labelStepSize={10} value={surfaceSmoothness} onChange={v => this.handleChange(v, 'surfaceSmoothness')} />
          <small>Bounding radius</small>
          <Slider min={0} max={10} stepSize={0.1} labelStepSize={10} value={boundingRadius} onChange={v => this.handleChange(v, 'boundingRadius')} />
        </section>
      </aside>
    );
  }
}

export default ConfigurationPanel;
