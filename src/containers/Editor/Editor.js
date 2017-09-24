import React, { Component } from 'react';
import ShaderUniforms from '../../components/ShaderUniforms/ShaderUniforms';
import Fractal from '../../components/Fractal/Fractal';
import UniformPanel from '../../components/UniformPanel/UniformPanel';

class Editor extends Component {
  render() {
    return (
      <section>
        <UniformPanel />
        <ShaderUniforms>
          <Fractal />
        </ShaderUniforms>
      </section>
    );
  }
}

export default Editor;
