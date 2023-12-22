import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectSortParam } from "../../redux/shop/shop.selectors";
import { setSortParam } from "../../redux/shop/shop.actions";
import { sortOptions } from "../../utils/constants";

import SelectDropdown from "../select-dropdown/select-dropdown.component";
import ItemCount from "../item-count/item-count.component";
import Breadcrumb from "../breadcrumb/breadcrumb.component";
import useIntersectionObserver from "../../hooks/use-intersection-observer";

import "./breadcrumb-sort-header.styles.scss";

const BreadcrumbSortHeader = ({ resultsCount, sortParam, setSortParam }) => {
  const history = useHistory();
  const [isSticky, setIsSticky] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "-66px 0px 0px 0px", // navheight (65px) + 1px border = 66px
    threshold: 1,
  });

  useEffect(() => {
    // Clear sort param when url changes
    let unlisten = history.listen(() => {
      if (sortParam) {
        setSortParam("");
      }
    });

    // When component unmounts, stop listening for changes
    return () => unlisten();
  }, [history, sortParam, setSortParam]);

  useEffect(() => {
    setIsSticky(!isIntersecting);
  }, [isIntersecting]);

  return (
    <div
      className={`breadcrumb-sort-header ${isSticky ? "sticky" : ""}`}
      ref={targetRef}
    >
      <div className='breadcrumb-sort-wrapper page-width'>
        <Breadcrumb />
        <div className='breadcrumb-sort-right-col'>
          <ItemCount count={resultsCount} />
          <div className='dropdown-wrapper'>
            <SelectDropdown
              options={sortOptions}
              handleSelect={setSortParam}
              selectedValue={sortParam.value}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sortParam: selectSortParam,
});

const mapDispatchToProps = (dispatch) => ({
  setSortParam: (param) => dispatch(setSortParam(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreadcrumbSortHeader);

BreadcrumbSortHeader.propTypes = {
  resultsCount: PropTypes.number.isRequired,
  sortParam: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      direction: PropTypes.string.isRequired,
      sortBy: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
    PropTypes.string,
  ]),
  setSortParam: PropTypes.func.isRequired,
};
