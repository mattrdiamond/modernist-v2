import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import "./directory.styles.scss";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {/* ES6: spreading otherSectionProps (name we created) just adds
    remaining key/value pairs from sections state object. We can then spread those
    same values into MenuItem. This just cleans up the syntax - no longer need
    to list out title={title} size={size} linkUrl=(linkUrl) etc.*/}
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});
export default connect(mapStateToProps)(Directory);
