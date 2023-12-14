import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import SectionHeading from "../section-heading/section-heading.component";
import "./directory.styles.scss";

const Directory = ({ sections }) => {
  return (
    <div className='directory-wrapper page-width'>
      <SectionHeading
        heading='Shop by category.'
        subheading='Modern designs, crafted for every day adventures.'
        buttonText='Shop All'
        linkDestination='/shop'
      />
      <section className='directory-menu'>
        {sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
