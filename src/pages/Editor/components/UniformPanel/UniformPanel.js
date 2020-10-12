import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import UniformPane from './UniformPane';
import withScene from '../../hocs/withScene';
import configurations from '../../configurations.json';
import './react-precision-slider.css';
import './UniformPanel.css';

class UniformPanel extends Component {
  createTabPane(group, uniforms, uniformConfigurations, key) {
    // TODO This could use a clean up, names are confusing
    const paneUniforms = {};
    const paneUniformValues = {};
    group.uniforms.forEach(uniformKey => {
      paneUniforms[uniformKey] = uniformConfigurations[uniformKey];
      paneUniformValues[uniformKey] = uniforms[uniformKey];
    });

    return {
      menuItem: { key, icon: group.icon || null, content: group.label },
      render: () => (
        <UniformPane
          uniforms={paneUniforms}
          uniformValues={paneUniformValues}
          onChange={(value, key) => this.props.updateUniform(key, value)}
        />
      )
    };
  }

  render() {
    const { shader, uniforms } = this.props;
    if (!configurations[shader]) {
      return null;
    }

    // Here we need also the uniform configuration (with labels, defaults, etc.)
    const { groups = [], uniforms: uniformConfigurations } = configurations[
      shader
    ];

    // Divide all uniforms into groups and create tab for each
    let groupedUniforms = [];
    const panes = groups.map((group, index) => {
      groupedUniforms = groupedUniforms.concat(group.uniforms);
      return this.createTabPane(group, uniforms, uniformConfigurations, index);
    });

    // Create one more tab for uniforms that didn't have any tab assigned
    const restUniformsKeys = Object.keys(uniforms).filter(
      u => !groupedUniforms.includes(u)
    );
    const restGroup = {
      icon: 'ellipsis horizontal',
      uniforms: restUniformsKeys
    };
    panes.push(
      this.createTabPane(restGroup, uniforms, uniformConfigurations, 99)
    );

    return (
      <aside className="panel">
        <Segment>
          <h2>Settings</h2>
          <Tab panes={panes} />
        </Segment>
      </aside>
    );
  }
}

export default withScene(UniformPanel);
