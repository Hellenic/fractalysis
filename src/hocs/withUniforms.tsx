import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { parse } from 'qs';
import { getUniformDefaultValues } from '../pages/Editor/utils/uniforms';
import { Uniforms } from '../types/index';

const DEFAULT_SHADER = 'Mandelbrot';

export default function withUniforms(
  WrappedComponent: React.ComponentType<any>
) {
  const WithUniforms = (props: RouteComponentProps) => {
    const query = parse(props.location.search.substring(1));
    const { shader = DEFAULT_SHADER, ...uniforms } = query;

    // Use the values from the URL or pull the defaults from storage
    // Merge the values, as URL might have some parameters but not all
    const defaultValues = getUniformDefaultValues(shader);
    const uniformValues: Uniforms = Object.assign({}, defaultValues, uniforms);

    return (
      <WrappedComponent {...props} shader={shader} uniforms={uniformValues} />
    );
  };

  return withRouter(WithUniforms);
}
