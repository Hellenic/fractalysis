import React, { Component } from 'react';
import ShaderUniforms from '../../components/ShaderUniforms/ShaderUniforms';
import Fractal from '../../components/Fractal/Fractal';

class Editor extends Component {
  render() {
    return (
      <section>
        <ShaderUniforms>
          <Fractal />
        </ShaderUniforms>
      </section>
    );
  }
}

export default Editor;
