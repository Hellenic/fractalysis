import React from 'react';
import Editor from './containers/Editor/Editor';
import EditorNav from './containers/Editor/EditorNav';
import Scenes from './containers/Scenes/Scenes';
import ScenesNav from './containers/Scenes/ScenesNav';
import Renders from './containers/Renders/Renders';
import RendersNav from './containers/Renders/RendersNav';

const routes = [
  {
    path: '/',
    exact: true,
    navbar: () => <EditorNav />,
    main: () => <Editor />
  },
  {
    path: '/scenes',
    navbar: () => <ScenesNav />,
    main: () => <Scenes />
  },
  {
    path: '/renders',
    navbar: () => <RendersNav />,
    main: () => <Renders />
  }
];

export default routes;
