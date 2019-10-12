import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import TextIcon from '../../components/TextIcon/TextIcon';
import routes from '../../routes';

const DROPDOWN_MENU = [
  { icon: 'eye', title: 'Editor', to: process.env.PUBLIC_URL + '/' },
  { icon: 'world', title: 'Scenes', to: process.env.PUBLIC_URL + '/scenes' }
  // { icon: 'image', title: 'Renders', to: '/renders' }
];

const PageSelector = ({ location, history }) => {
  const currentIndex = routes.findIndex(r => r.path == location.pathname);
  const activeMenu = DROPDOWN_MENU[currentIndex];
  return (
    <Dropdown
      labeled
      trigger={<TextIcon icon={activeMenu.icon} title={activeMenu.title} />}
      icon="dropdown"
    >
      <Dropdown.Menu>
        {DROPDOWN_MENU.map(item => (
          <Dropdown.Item
            key={`link-${item.to}`}
            active={item.to === activeMenu.to}
            disabled={item.to === activeMenu.to}
            icon={item.icon}
            text={item.title}
            onClick={() => history.push(item.to)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withRouter(PageSelector);
