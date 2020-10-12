import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { stringify } from 'qs';
import { getUniformDefaultValues } from '../utils/uniforms';
import Constants from '../../../constants';
import { Uniforms } from '../../../types/index';
import parse from '../../../utils/query-parser';

/*
  Higher-order component to pull current scene information together
  and pass it to the the children.
  Current scene includes the shader name and the uniforms.
  These values can be either coming from defaults or from the URL.

  URL is the state for this application. Preferably this should be only component
  reading and modifying the URL (with exception of routing itself)

  Note: In the URL the uniforms are spread out, so the URL is not 1:1
  stringification of Scene object
*/
// TODO Verify that shaderId is no longer needed in the URL
export default function withScene(WrappedComponent: React.ComponentType<any>) {
  const WithScene = (props: RouteComponentProps) => {
    const query = parse(props.location.search.substring(1));
    // TODO Verify given shader name exists
    const {
      shader = Constants.DEFAULT_SHADER,
      download = false,
      ...uniforms
    } = query;

    // Use the values from the URL or pull the defaults from storage
    // Merge the values, as URL might have some parameters but not all
    const defaultValues = getUniformDefaultValues(shader);
    const uniformValues: Uniforms = Object.assign({}, defaultValues, uniforms);

    const handleShaderSwitch = (name: string) => {
      const updatedScene = Object.assign({}, { shader: name });
      const queryString = stringify(updatedScene);
      props.history.push(`?${queryString}`);
    };

    const handleUpdateUniform = (name: string, value: any) => {
      // Merge the given uniform to rest of the current values
      const updatedScene = Object.assign(
        {},
        { shader, ...uniformValues },
        {
          [name]: value
        }
      );

      // Push the uniform key-value into the URL
      const queryString = stringify(updatedScene);
      props.history.replace(`?${queryString}`);
    };

    const handleUpdateUniforms = (uniforms: Uniforms) => {
      // Merge the given uniforms to rest of the current values (in case given uniforms does not contain all necessary ones)
      const updatedScene = Object.assign(
        {},
        { shader, ...uniformValues },
        uniforms
      );

      // Push the uniform key-value into the URL
      const queryString = stringify(updatedScene);
      props.history.replace(`?${queryString}`);
    };

    return (
      <WrappedComponent
        {...props}
        shader={shader}
        download={download}
        uniforms={uniformValues}
        switchShader={handleShaderSwitch}
        updateUniform={handleUpdateUniform}
        updateUniforms={handleUpdateUniforms}
      />
    );
  };

  return withRouter(WithScene);
}
