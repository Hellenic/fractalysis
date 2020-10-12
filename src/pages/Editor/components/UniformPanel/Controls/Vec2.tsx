import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import './Vec2.css';

interface IProps {
  label: string;
  value: Array<number>;
  onChange: (value: Array<number>) => void;
}

interface IState {
  values: Array<number>;
}

class Vec2 extends Component<IProps, IState> {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func
  };
  state = {
    values: this.props.value
  };
  handleChange(value1: number | null, value2: number | null) {
    const values = [
      value1 || this.state.values[0],
      value2 || this.state.values[1]
    ];
    this.props.onChange(values);
  }
  render() {
    const { label, value } = this.props;

    return (
      <div className="uniform-control__vec2">
        <strong>{label}</strong>
        <div>
          <Input
            type="number"
            value={value[0]}
            onChange={e => this.handleChange(parseInt(e.target.value), null)}
          />
          <Input
            type="number"
            value={value[1]}
            onChange={e => this.handleChange(null, parseInt(e.target.value))}
          />
        </div>
      </div>
    );
  }
}

export default Vec2;
