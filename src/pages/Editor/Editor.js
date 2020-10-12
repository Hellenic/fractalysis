import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';
import ShaderUniforms from './components/ShaderUniforms/ShaderUniforms';
import CameraControl from './components/Controls/CameraControl';
import Fractal from '../../components/Fractal/Fractal';
import UniformPanel from './components/UniformPanel/UniformPanel';
import parse from '../../utils/query-parser';

class Editor extends Component {
  onDraw = async () => {
    const query = parse(this.props.location.search.substring(1));
    const { download = false } = query;
    // After each draw, initiate a download if appropriate
    if (download === true) {
      const capture = await this.surfaceRef.captureAsBlob('image/png');
      const url = window.URL.createObjectURL(capture);
      window.location.replace(url);
      // window.URL.revokeObjectURL(url);
      // window.close()
    }
  };
  onSurfaceRef = ref => {
    this.surfaceRef = ref;
  };
  render() {
    const query = parse(this.props.location.search.substring(1));
    const { download = false } = query;
    return (
      <div>
        <UniformPanel />
        <ShaderUniforms>
          {/* <CameraControl> */}
          <Fractal onSurfaceRef={this.onSurfaceRef} onDraw={this.onDraw} />
          {/* </CameraControl> */}
        </ShaderUniforms>
        <Dimmer active={download} page onClickOutside={() => window.close()}>
          <Loader indeterminate size="big">
            Rendering image for download...
          </Loader>
        </Dimmer>
      </div>
    );
  }
}

export default withRouter(Editor);
