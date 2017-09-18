import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import TextIcon from '../../components/TextIcon/TextIcon';
import routes from '../../routes';

const options = [
  { key: 0, value: 0, content: <TextIcon icon="eye" title="Editor" to="/" /> },
  { key: 1, value: 1, content: <TextIcon icon="world" title="Scenes" to="/scenes" /> },
  { key: 2, value: 2, content: <TextIcon icon="image" title="Renders" to="/renders" /> }
];

const PageSelector = ({ location }) => {
  const currentIndex = routes.findIndex(r => r.path === location.pathname);
  return (
    <Dropdown
      trigger={options[currentIndex].content}
      icon="dropdown"
      options={options}
      defaultValue={0}
    />
  );
};

export default withRouter(PageSelector);
