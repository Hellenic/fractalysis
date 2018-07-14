import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Segment, Tab } from 'semantic-ui-react';
import { stringify } from 'qs';
import parse from '../../../../utils/query-parser';
import UniformPane from './UniformPane';
import configurations from '../../configurations.json';
import './UniformPanel.css';

class UniformPanel extends Component {
  handleChange(value, name, currentQuery) {
    // Push the uniform key-value into the URL
    const queryString = stringify(
      Object.assign({}, currentQuery, { [name]: value })
    );
    this.props.history.push(`?${queryString}`);
  }

  getValuesForUniforms(uniforms, urlUniforms) {
    const uniformValues = {};
    // TODO Use reduce
    Object.keys(uniforms).forEach(key => {
      const defaultValue = uniforms[key].defaultValue;
      const uniformValue = key in urlUniforms ? urlUniforms[key] : defaultValue;
      uniformValues[key] = uniformValue;
    });
    return uniformValues;
  }

  createTabPane(group, uniforms, uniformValues, opts, key) {
    const paneUniforms = {};
    const paneUniformValues = {};
    group.uniforms.forEach(uniformKey => {
      paneUniforms[uniformKey] = uniforms[uniformKey];
      paneUniformValues[uniformKey] = uniformValues[uniformKey];
    });

    return {
      menuItem: { key, icon: group.icon || null, content: group.label },
      render: () => (
        <UniformPane
          uniforms={paneUniforms}
          uniformValues={paneUniformValues}
          onChange={(value, key) => this.handleChange(value, key, opts)}
        />
      )
    };
  }

  render() {
    const { location } = this.props;
    const { shader, shaderId, ...urlUniforms } = parse(
      location.search.substring(1)
    );
    if (!shader || !configurations[shader]) {
      return null;
    }

    const { groups = [], uniforms = {} } = configurations[shader];
    // Read uniforms values from the URL or default from configurations
    const uniformValues = this.getValuesForUniforms(uniforms, urlUniforms);
    // Create uniform object to be used when a value changes
    const opts = { shader, shaderId, ...uniformValues };

    // Divide all uniforms into groups
    let groupedUniforms = [];
    const panes = groups.map((group, index) => {
      groupedUniforms = groupedUniforms.concat(group.uniforms);
      return this.createTabPane(group, uniforms, uniformValues, opts, index);
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
      this.createTabPane(restGroup, uniforms, uniformValues, opts, 99)
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

export default withRouter(UniformPanel);
