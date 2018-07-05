import React from 'react';

const Loading = ({ loading }) => (loading ? (
  <span className="icon has-text-gray is-medium" style={{ marginLeft: 10 }}>
    <i className="fas fa-spinner fa-spin fa-lg" />
  </span>
) : false);

export default Loading;
