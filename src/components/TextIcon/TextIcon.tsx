import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

interface IProps {
  to?: string;
  icon: any;
  title: string;
  size: any;
  onClick: () => React.MouseEvent | void;
}

const TextIcon = (props: IProps) => {
  if (!props.to) {
    return (
      <button
        style={{ cursor: 'pointer', border: 'none', backgroundColor: 'white' }}
        onClick={props.onClick}
      >
        <Icon name={props.icon} size={props.size} />
        <span>{props.title}</span>
      </button>
    );
  }
  return (
    <Link to={props.to}>
      <Icon name={props.icon} size={props.size} />
      <span>{props.title}</span>
    </Link>
  );
};

TextIcon.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string
};

TextIcon.defaultProps = {
  icon: 'sticky note outline',
  title: '',
  size: 'huge'
};

export default TextIcon;
