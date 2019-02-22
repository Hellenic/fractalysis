import React, { Component } from 'react';
import { Confirm, Modal, Input, InputOnChangeData } from 'semantic-ui-react';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import withUniforms from '../../../../hocs/withUniforms';
import { Uniforms, WithUniformsProps } from '../../../../types/index';

interface IState {
  dialogOpen: boolean;
}

class SaveButton extends Component<WithUniformsProps, IState> {
  state = {
    dialogOpen: false
  };

  handleConfirm = () => {
    const { uniforms, shader } = this.props;
    console.log('TODO Save this fractal to a user preset', shader, uniforms);

    this.setState({ dialogOpen: false });
  };

  handleInput = (event: React.SyntheticEvent, data: InputOnChangeData) => {
    const { value } = data;
    console.log('Data', value);
  };

  render() {
    const { dialogOpen } = this.state;
    return (
      <React.Fragment>
        <Confirm
          open={dialogOpen}
          header="Save scene as a preset"
          content={
            <Modal.Content>
              <Modal.Description>
                <p>Give a name for the preset</p>
                <Input placeholder="Preset name" onChange={this.handleInput} />
              </Modal.Description>
            </Modal.Content>
          }
          onCancel={() => this.setState({ dialogOpen: false })}
          onConfirm={this.handleConfirm}
        />
        <TextIcon
          icon="save"
          size="big"
          title="Save"
          onClick={() => this.setState({ dialogOpen: true })}
        />
      </React.Fragment>
    );
  }
}

export default withUniforms(SaveButton);
