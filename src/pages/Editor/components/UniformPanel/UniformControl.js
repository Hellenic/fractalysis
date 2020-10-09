import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from 'react-precision-slider';
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
    const uniformType = getUniformType(value);
    let type = inputType;
    if (!type) {
      type = getInputTypeForUniform(uniformType);
    }

    if (type === 'range') {
      return (
        <div className="uniform-control__slider">
          <span>{label}</span>
          <Slider value={value} onChange={v => onChange(v)} {...rest} />
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

    if (['color'].includes(inputType)) {
      return (
        <div className="uniform-control__color">
          <strong>{label}</strong>
          <input
            type={type}
            value={floatToHex(value)}
            {...rest}
            onChange={e => onChange(hexToFloat(e.target.value))}
          />
        </div>
      );
    }

    // TODO Support for rest of uniform types
    return null;
  }
}

export default UniformControl;
