import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const TextIcon = props => {
  if (!props.to) {
    return (
      <span>
        <Icon name={props.icon} size="huge" />
        <span>{props.title}</span>
      </span>
    );
  }
  return (
    <Link to={props.to}>
      <Icon name={props.icon} size="huge" />
      <span>{props.title}</span>
    </Link>
  );
};

TextIcon.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
};

TextIcon.defaultProps = {
  icon: 'sticky note outline',
  title: ''
};

export default TextIcon;
