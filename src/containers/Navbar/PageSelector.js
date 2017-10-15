import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import TextIcon from '../../components/TextIcon/TextIcon';
import routes from '../../routes';

const links = [
  { icon: 'eye', title: 'Editor', to: '/' },
  { icon: 'world', title: 'Scenes', to: '/scenes' },
  { icon: 'image', title: 'Renders', to: '/renders' }
];

const PageSelector = ({ location, history }) => {
  const currentIndex = routes.findIndex(r => r.path === location.pathname);
  const link = links[currentIndex];
  return (
    <Dropdown labeled trigger={<TextIcon icon={link.icon} title={link.title} />} icon="dropdown">
      <Dropdown.Menu>
        {
          links.map(link => (
            <Dropdown.Item
              key={`link-${link.to}`}
              icon={link.icon}
              text={link.title}
              onClick={() => history.push(link.to)}
            />
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withRouter(PageSelector);
