import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from 'react-precision-slider';
import Vec2 from './Controls/Vec2';
import { getUniformType, getInputTypeForUniform } from '../../utils/uniforms';
import { floatToHex, hexToFloat } from '../../../../utils/colors';
import './UniformControl.css';

class UniformControl extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    inputType: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };
  render() {
    const {
      label,
      value,
      defaultValue,
      onChange,
      inputType,
      ...rest
    } = this.props;

    if (inputType === 'color') {
      return (
        <div className="uniform-control__color">
          <strong>{label}</strong>
          <input
            type={inputType}
            value={floatToHex(value)}
            {...rest}
            onChange={e => onChange(hexToFloat(e.target.value))}
          />
        </div>
      );
    }

    const uniformType = getUniformType(value);
    let type = inputType || getInputTypeForUniform(uniformType);

    if (type === 'range') {
      return (
        <div className="uniform-control__slider">
          <span>{label}</span>
          <Slider value={value} onChange={onChange} {...rest} />
        </div>
      );
    }

    if (type === 'checkbox') {
      return (
        <div className="uniform-control__checkbox">
          <strong>{label}</strong>
          <input
            type={type}
            checked={value}
            {...rest}
            onChange={e => onChange(!value)}
          />
        </div>
      );
    }

    if (uniformType === 'vec2') {
      return <Vec2 label={label} value={value} onChange={onChange} />;
    }

    // TODO Support for rest of uniform types
    console.log('Unsupported uniform', this.props, uniformType, type);
    return null;
  }
}

export default UniformControl;
