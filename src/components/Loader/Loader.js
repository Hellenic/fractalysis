import PropTypes from 'prop-types';
import React from 'react';
import './Loader.css';

const Loader = props => (
  <div className="loader">
    <div className="lds-dual-ring" />
  </div>
);

Loader.propTypes = {
  visible: PropTypes.bool
};

Loader.defaultProps = {
  visible: true
};

export default Loader;
