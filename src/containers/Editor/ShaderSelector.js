import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import TextIcon from '../../components/TextIcon/TextIcon';

const options = [
  { key: 0, value: 0, content: <TextIcon icon="cubes" title="2D" /> },
  { key: 1, value: 1, content: <TextIcon icon="linode" title="3D" /> }
];

const ShaderSelector = () => (
  <Dropdown
    trigger={<TextIcon icon="eye" title="Shader" />}
    icon="dropdown"
    options={options}
  />
);

export default ShaderSelector;
