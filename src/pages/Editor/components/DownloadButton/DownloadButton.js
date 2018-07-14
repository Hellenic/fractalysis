import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { parse, stringify } from 'qs';
import TextIcon from '../../../../components/TextIcon/TextIcon';
import { getUniformDefaultValues } from '../../utils/uniforms';

class DownloadButton extends Component {
  onDownload = () => {
    const query = parse(this.props.location.search.substring(1));
    const { shader, shaderId, ...rest } = query;

    // Use the values from the URL or pull the defaults from storage
    // TODO Duplicate with ShaderUniforms
    // TODO Should be merger instead (e.g. URL can have some params but not all)
    let uniformValues = Object.assign({}, rest);
    if (Object.keys(uniformValues).length === 0) {
      uniformValues = getUniformDefaultValues(shader);
    }
    // Push the new randomized uniforms into the URL
    const queryString = stringify(
      Object.assign({}, { shader, shaderId }, uniformValues, { download: true })
    );

    window.open(`${window.location.origin}/?${queryString}`, '_blank');
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

export default withRouter(DownloadButton);
