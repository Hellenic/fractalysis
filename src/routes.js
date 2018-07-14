import React from 'react';
import Editor from './pages/Editor/Editor';
import EditorNav from './pages/Editor/EditorNav';
import Scenes from './pages/Scenes/Scenes';
import ScenesNav from './pages/Scenes/ScenesNav';
import Renders from './pages/Renders/Renders';
import RendersNav from './pages/Renders/RendersNav';

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
