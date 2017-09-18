import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const TextIcon = props => {
  return (
    <Link to={props.to}>
      <Icon name={props.icon} size="huge" />
      <div>{props.title}</div>
    </Link>
  );
};

TextIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string
};

TextIcon.defaultProps = {
  icon: 'sticky note outline',
  title: ''
};

export default TextIcon;
