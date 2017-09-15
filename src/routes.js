import React from 'react';
import Editor from './containers/Editor/Editor';
import Scenes from './containers/Scenes/Scenes';
import Renders from './containers/Renders/Renders';

const routes = [
  { path: '/',
    exact: true,
    sidebar: <h3>Editor!</h3>,
    main: () => <Editor />
  },
  { path: '/scenes',
    sidebar: <h3>Scenes!</h3>,
    main: () => <Scenes />
  },
  { path: '/renders',
    sidebar: <h3>Renders!</h3>,
    main: () => <Renders />
  }
]

export default routes;
