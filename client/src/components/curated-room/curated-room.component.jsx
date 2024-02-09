import React from "react";
import { hotspotData } from "./hotspot-data";
import { curatedRoomImage } from "./curated-room-image";

import HotspotImage from "../hotspot-image/hotspot-image.component";
import SectionHeading from "../section-heading/section-heading.component";
import "./curated-room.styles.scss";

export default function CuratedRoom() {
  return (
    <section className='curated-section-wrapper page-width'>
      <SectionHeading
        heading='Shop the look.'
        subheading='Explore our carefully curated collection of modern designs.'
        hideSubheadingOnMobile
        buttonText='Shop All'
        linkDestination='/shop/shop-the-look'
      />
      <HotspotImage backgroundImage={curatedRoomImage} hotspots={hotspotData} />
    </section>
  );
}
