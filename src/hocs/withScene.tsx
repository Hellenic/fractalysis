import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { parse } from 'qs';
import { getUniformDefaultValues } from '../pages/Editor/utils/uniforms';
import Constants from '../constants';
import { Uniforms } from '../types/index';

/*
  Higher-order component to pull current scene information together
  and pass it to the the children.
  Current scene includes the shader name and the uniforms.
  These values can be either coming from defaults or from the URL.

  URL is the state for this application. Preferably this should be only component
  reading and modifying the URL.
*/
export default function withScene(WrappedComponent: React.ComponentType<any>) {
  const WithScene = (props: RouteComponentProps) => {
    const query = parse(props.location.search.substring(1));
    const { shader = Constants.DEFAULT_SHADER, ...uniforms } = query;

    // Use the values from the URL or pull the defaults from storage
    // Merge the values, as URL might have some parameters but not all
    const defaultValues = getUniformDefaultValues(shader);
    const uniformValues: Uniforms = Object.assign({}, defaultValues, uniforms);

    return (
      <WrappedComponent {...props} shader={shader} uniforms={uniformValues} />
    );
  };

  return withRouter(WithScene);
}
