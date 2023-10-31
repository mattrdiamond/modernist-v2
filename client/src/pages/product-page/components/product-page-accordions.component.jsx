import React from "react";
import PropTypes from "prop-types";
import Accordion from "../../../components/accordion/accordion.component";
import AccordionGroup from "../../../components/accordion/accordion-group.component";
import Reviews from "../../../components/reviews/reviews.component";
import Dimensions from "../../../components/dimensions/dimensions.component";
import "./product-page-accordions.styles.scss";
import ShippingAccordionContent from "./shipping-accordion-content.component";

const testDimensions = [
  { type: "Overall", value: '87"w x 78"d x 31"h' },
  { type: "Lorem depth", value: '63"' },
  { type: "Ipsum height", value: '45"' },
  { type: "Dolor width", value: '29"' },
  { type: "Weight", value: "60 lbs." },
];

export default function ProductPageAccordions({
  reviewCount,
  description,
  ...props
}) {
  return (
    <div className='product-page-accordion-wrapper'>
      <AccordionGroup
        initialOpen='Product Description'
        allowMultipleOpen={true}
      >
        <Accordion title='Product Description'>
          <section className='description-section'>
            <p className='product-description'>{description}</p>
          </section>
        </Accordion>
        <Accordion title='Dimensions'>
          <section className='dimensions-section'>
            <Dimensions dimensions={testDimensions} />
          </section>
        </Accordion>
        <Accordion
          customTitle={
            <>
              Reviews{" "}
              <span className='font-normal review-count'>({reviewCount})</span>
            </>
          }
          title='Reviews'
        >
          <Reviews {...props} />
        </Accordion>
        <Accordion title='Shipping & Returns'>
          <ShippingAccordionContent />
        </Accordion>
        <Accordion title='Materials & Care'>
          <section className='care-section'>
            <p>
              You've put a lot of care into choosing your furnishings. And with
              continued care at home, they should share your address for many
              years to come. Now for your owner's manual...
            </p>
            <ul>
              <li>Do not leave spills unattended.</li>
              <li>Do not use abrasive cleaner.</li>
              <li>
                Blot spills immediately with a clean, absorbent white cloth.
              </li>
              <li>Cleaning code will vary depending on material selected.</li>
              <li>Slight fading may occur in direct sunlight.</li>
              <h5>Fabric Care Instructions</h5>
              <p>
                Blot spills immediately with a clean, absorbent cloth. Spot
                clean with a water-free stain remover. For stubborn or set
                stains, work with a professional upholstery cleaning service.
              </p>
            </ul>
          </section>
        </Accordion>
      </AccordionGroup>
    </div>
  );
}

ProductPageAccordions.propTypes = {
  reviewCount: PropTypes.number,
  description: PropTypes.string.isRequired,
};
