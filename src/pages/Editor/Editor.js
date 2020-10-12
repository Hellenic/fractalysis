import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Scene from './components/Scene/Scene';
import CameraControl from './components/Controls/CameraControl';
import Fractal from '../../components/Fractal/Fractal';
import UniformPanel from './components/UniformPanel/UniformPanel';
import withScene from './hocs/withScene';

class Editor extends Component {
  onDraw = async () => {
    const { download } = this.props;
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
    const { download } = this.props;
    return (
      <div>
        <UniformPanel />
        <Scene>
          <CameraControl>
            <Fractal onSurfaceRef={this.onSurfaceRef} onDraw={this.onDraw} />
          </CameraControl>
        </Scene>
        <Dimmer active={download} page onClickOutside={() => window.close()}>
          <Loader indeterminate size="big">
            Rendering image for download...
          </Loader>
        </Dimmer>
      </div>
    );
  }
}

export default withScene(Editor);
