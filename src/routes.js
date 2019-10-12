import React from 'react';
import Editor from './pages/Editor/Editor';
import EditorNav from './pages/Editor/EditorNav';
import Scenes from './pages/Scenes/Scenes';
import ScenesNav from './pages/Scenes/ScenesNav';
import Renders from './pages/Renders/Renders';
import RendersNav from './pages/Renders/RendersNav';

const routes = [
  {
    path: process.env.PUBLIC_URL + '/',
    exact: true,
    navbar: () => <EditorNav />,
    main: () => <Editor />
  },
  {
    path: process.env.PUBLIC_URL + '/scenes',
    navbar: () => <ScenesNav />,
    main: () => <Scenes />
  },
  {
    path: process.env.PUBLIC_URL + '/renders',
    navbar: () => <RendersNav />,
    main: () => <Renders />
  }
];

export default routes;
