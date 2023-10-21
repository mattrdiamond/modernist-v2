import React, { useState } from "react";
import Accordion from "../../components/accordion/accordion.component";
import Reviews from "../../components/reviews/reviews.component";
import Dimensions from "../../components/dimensions/dimensions.component";
import "./product-page-accordions.styles.scss";

const testDimensions = [
  { type: "Overall", value: '87"w x 78"d x 31"h' },
  { type: "Lorem depth", value: '63"' },
  { type: "Ipsum height", value: '45"' },
  { type: "Dolor width", value: '29"' },
  { type: "Weight", value: "60 lbs." },
];

export default function ProductPageAccordions({ reviewCount, ...props }) {
  const [openAccordion, setOpenAccordion] = useState("Product Description");
  const handleToggle = (title) => {
    if (title === openAccordion) {
      return setOpenAccordion(null);
    }
    setOpenAccordion(title);
  };

  return (
    <div className='product-page-accordion-wrapper'>
      <Accordion
        title='Product Description'
        toggle={handleToggle}
        openAccordion={openAccordion}
      >
        <section className='description-section'>
          <p className='product-description'>
            Lorem ipsum dolor volupta temposam eosa consequid maxim res derum id
            mos por ratem. Ficiis mil moloria nonsectatur sequuntori nistia aut
            aut lit harumque etumquu ntustia pe volores sin pratem quo ipsume
            nimoditatem eaquas et odignih ilibusdae audis esse laborio quiam eum
            voluptaet vel molupta pernat litatquam idunt molo quiaeptat earum,
            aut omnih.
          </p>
        </section>
      </Accordion>
      <Accordion
        title='Dimensions'
        toggle={handleToggle}
        openAccordion={openAccordion}
      >
        <section className='dimensions-section'>
          <Dimensions dimensions={testDimensions} />
        </section>
      </Accordion>
      <Accordion
        customTitle={
          <>
            Reviews <span className='font-normal'>({reviewCount})</span>
          </>
        }
        title='Reviews'
        toggle={handleToggle}
        openAccordion={openAccordion}
      >
        <Reviews {...props} />
      </Accordion>
    </div>
  );
}
