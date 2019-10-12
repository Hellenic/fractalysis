import React, { Component } from 'react';
import { stringify } from 'qs';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import withUniforms from '../../../../hocs/withUniforms';
import { WithUniformsProps } from '../../../../types/index';

class DownloadButton extends Component<WithUniformsProps> {
  onDownload = () => {
    const { uniforms, shader } = this.props;

    const queryString = stringify(
      Object.assign({}, { shader }, uniforms, { download: true })
    );

    window.open(
      `${window.location.origin}${process.env.PUBLIC_URL}/?${queryString}`,
      '_blank'
    );
  };

  render() {
    return (
      <TextIcon
        icon="download"
        size="big"
        title="Download"
        onClick={this.onDownload}
      />
    );
  }
}

export default withUniforms(DownloadButton);
