import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import UniformControl from './UniformControl';

class UniformPane extends Component {
  render() {
    const { uniforms, uniformValues, onChange } = this.props;

    return (
      <Tab.Pane>
        <section className="panel-tab">
          {Object.keys(uniforms).map(key => (
            <UniformControl
              key={`uniform-${key}`}
              value={uniformValues[key]}
              {...uniforms[key]}
              onChange={v => onChange(v, key)}
            />
          ))}
        </section>
      </Tab.Pane>
    );
  }
}

export default UniformPane;
