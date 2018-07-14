import configurations from '../configurations.json';

const isInt = v => /^-?[0-9]+$/.test(`${v}`);

// TODO Is there a library already for this?
export function getUniformType(value) {
  switch (typeof value) {
    case 'boolean':
      return 'bool';
    case 'number':
      return isInt(value) ? 'int' : 'float';
    case 'object':
      return Array.isArray(value) ? 'vec2' : null;
    default:
      console.warn(
        `Unsupported value type for value: ${value}. Add a new type configuration.`
      );
      return null;
  }
}

export function getInputTypeForUniform(type) {
  switch (type) {
    case 'int':
    case 'float':
      return 'range';
    case 'bool':
      return 'checkbox';
    default:
      return null;
  }
}

export function getUniformDefaultValues(shaderName) {
  // Pull default uniform values from the configurations
  const { uniforms } = configurations[shaderName];

  // Collect the default values from the uniforms configs
  return Object.keys(uniforms).reduce((acc, key) => {
    const config = uniforms[key];
    acc[key] = config.defaultValue;
    return acc;
  }, {});
}
