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

import "./breadcrumb-sort-header..styles.scss";

const BreadcrumbSortHeader = ({
  resultsCount,
  sortParam,
  setSortParam,
  heading,
}) => {
  const history = useHistory();
  const [isSticky, setIsSticky] = useState(false);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin:
      window.innerWidth <= 450 ? "-61px 0px 0px 0px" : "-66px 0px 0px 0px", // 60px mobile navheight + 1px border = 61px
    threshold: 1,
  });

  useEffect(() => {
    let unlisten = history.listen(() => {
      if (sortParam) {
        setSortParam("");
      }
    });

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
      <div className={`header-flex-container page-width`}>
        <div className='header-col-left'>
          {/* {heading && !isSticky && <h2>{heading}</h2>} */}
          {/* {(!heading || isSticky) && <Breadcrumb />} */}
          <Breadcrumb />
        </div>
        <div className='header-col-right'>
          <ItemCount count={resultsCount} />
          <div className='sort-dropdown-wrapper'>
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
  heading: PropTypes.string,
};
