import React from "react";
import PropTypes from "prop-types";
import Accordion from "../../../components/accordion/accordion.component";
import AccordionGroup from "../../../components/accordion/accordion-group.component";
import Reviews from "../../../components/reviews/reviews.component";
import Dimensions from "../../../components/dimensions/dimensions.component";
import "./product-page-accordions.styles.scss";
import ShippingAccordionContent from "./shipping-accordion-content.component";
import { WindowSizeProvider } from "../../../contexts/WindowSizeContext";

const testDimensions = [
  { type: "Overall", value: '87"w x 78"d x 31"h' },
  { type: "Lorem Depth", value: '63"' },
  { type: "Ipsum Height", value: '45"' },
  { type: "Dolor Width", value: '29"' },
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
            <p className='product-description grey-text'>{description}</p>
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
          <WindowSizeProvider debounceDelay={1000}>
            <Reviews {...props} />
          </WindowSizeProvider>
        </Accordion>
        <Accordion title='Shipping & Returns'>
          <ShippingAccordionContent />
        </Accordion>
        <Accordion title='Materials & Care'>
          <section className='care-section'>
            <p className='grey-text'>
              You've put a lot of care into choosing your furnishings. And with
              continued care at home, they should share your address for many
              years to come. Now for your owner's manual...
            </p>
            <ul className='grey-text'>
              <li>Do not leave spills unattended.</li>
              <li>Do not use abrasive cleaner.</li>
              <li>
                Blot spills immediately with a clean, absorbent white cloth.
              </li>
              <li>Cleaning code will vary depending on material selected.</li>
              <li>Slight fading may occur in direct sunlight.</li>
            </ul>
            <h5>Fabric Care Instructions</h5>
            <p className='grey-text'>
              Blot spills immediately with a clean, absorbent cloth. Spot clean
              with a water-free stain remover. For stubborn or set stains, work
              with a professional upholstery cleaning service.
            </p>
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
