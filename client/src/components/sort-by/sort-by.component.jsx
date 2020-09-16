import React from "react";

const SortBy = ({ handleChange, value }) => (
  <form>
    <label htmlFor="sortBy">
      Sort By:
      <select name="sortBy" value={value} onChange={handleChange}>
        <option value="" disabled>
          Sort by
        </option>
        <option value="name_asc">Name - A-Z</option>
        <option value="name_desc">Name - Z-A</option>
        <option value="price_asc">Price - Lowest to Highest</option>
        <option value="price_desc">Price - Highest to Lowest</option>
      </select>
    </label>
  </form>
);

export default SortBy;
