import React, { Component } from 'react';
import ShaderUniforms from './components/ShaderUniforms/ShaderUniforms';
import Fractal from './components/Fractal/Fractal';
import UniformPanel from './components/UniformPanel/UniformPanel';

class Editor extends Component {
  onDownload = async () => {
    const capture = await this.surfaceRef.captureAsBlob('image/png');
    const url = window.URL.createObjectURL(capture);
    window.open(url, '_blank');
    // window.URL.revokeObjectURL(url);
  };
  onSurfaceRef = ref => {
    this.surfaceRef = ref;
  };
  render() {
    return (
      <section>
        <UniformPanel />
        <ShaderUniforms>
          <Fractal onSurfaceRef={this.onSurfaceRef} />
        </ShaderUniforms>
      </section>
    );
  }
}

export default Editor;
