import React, { Component } from 'react';
import ComposingShader from '../../components/ComposingShader/ComposingShader';
import ShaderUniforms from '../../components/ShaderUniforms/ShaderUniforms';
import Fractal from '../../components/Fractal/Fractal';

class Editor extends Component {
  render() {
    return (
      <section>
        <ComposingShader>
          <ShaderUniforms>
            <Fractal />
          </ShaderUniforms>
        </ComposingShader>
      </section>
    );
  }
}

export default Editor;
