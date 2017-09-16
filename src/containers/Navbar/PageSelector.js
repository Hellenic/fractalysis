import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';

const TextIcon = props => {
  return (
    <Link to={props.to}>
      <Icon name={props.icon} size="huge" />
      <div>{props.title}</div>
    </Link>
  );
};

const options = [
  { key: 0, value: 0, content: <TextIcon icon="eye" title="Editor" to="/" /> },
  { key: 1, value: 1, content: <TextIcon icon="world" title="Scenes" to="/scenes" /> },
  { key: 2, value: 2, content: <TextIcon icon="image" title="Renders" to="/renders" /> }
];

const PageSelector = ({ index }) => (
  <Dropdown
    trigger={options[index].content}
    icon="dropdown"
    options={options}
    defaultValue={0}
  />
);

export default PageSelector;
