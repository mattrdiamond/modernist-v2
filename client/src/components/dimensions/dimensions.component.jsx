import React from "react";
import "./dimensions.styles.scss";
import PropTypes from "prop-types";

export default function Dimensions({ dimensions }) {
  if (!dimensions || !Array.isArray(dimensions) || dimensions.length === 0) {
    return (
      <div className='product-dimensions'>
        <p>No dimensions available.</p>
      </div>
    );
  }

  return (
    <table className='product-dimensions'>
      <thead>
        <tr>
          <th>Dimension Type</th>
          <th>Dimension Value</th>
        </tr>
      </thead>
      <tbody>
        {dimensions.map((dimension, index) => (
          <tr key={index} className='dimension-row'>
            <td className='dimension-type'>{dimension.type}</td>
            <td className='dimension-value'>{dimension.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Dimensions.propTypes = {
  dimensions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};
