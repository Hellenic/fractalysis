import React from 'react';
import { withRouter } from 'react-router';
import { parse } from 'qs';
import { getUniformDefaultValues } from '../pages/Editor/utils/uniforms';
import { Uniforms, RouterProps } from '../types/index.tsx';

const DEFAULT_SHADER = 'Mandelbrot';

export default function withUniforms(WrappedComponent) {
  const WithUniforms = (props: RouterProps) => {
    const query = parse(props.location.search.substring(1));
    const { shader = DEFAULT_SHADER, ...uniforms } = query;

    // Use the values from the URL or pull the defaults from storage
    // Merge the values, as URL might have some parameters but not all
    const defaultValues = getUniformDefaultValues(shader);
    const uniformValues: Uniforms = Object.assign({}, defaultValues, uniforms);

    return <WrappedComponent {...props} uniforms={uniformValues} />;
  };

  return withRouter(WithUniforms);
}
