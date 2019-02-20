import PropTypes from 'prop-types';
import React from 'react';
import './Loader.css';

const Loader = props => <div className="lds-dual-ring" />;

Loader.propTypes = {
  visible: PropTypes.bool
};

Loader.defaultProps = {
  visible: true
};

export default Loader;
