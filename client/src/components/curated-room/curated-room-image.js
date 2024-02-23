import { breakpoints } from "../../utils/getDeviceType";
import {
  curatedMobile_400w,
  curatedMobile_800w,
  curatedMobile_1400w,
  curatedTablet_1000w,
  curatedTablet_2000w,
  curatedDesktop_1200w,
  curatedDesktop_1800w,
  curatedDesktop_2400w,
  curatedDesktop_3000w,
} from "../../assets/img/_images";

export const curatedRoomImage = {
  sources: [
    {
      media: `(max-width: ${breakpoints.mobile}px)`,
      srcSet: `${curatedMobile_400w} 400w, ${curatedMobile_800w} 800w, ${curatedMobile_1400w} 1400w`,
    },
    {
      media: `(max-width: ${breakpoints.tablet}px)`,
      srcSet: `${curatedTablet_1000w} 1x, ${curatedTablet_2000w} 2x`,
    },
    {
      srcSet: `${curatedDesktop_1200w} 1200w, ${curatedDesktop_1800w} 1800w, ${curatedDesktop_2400w} 2400w, ${curatedDesktop_3000w} 3000w`,
    },
  ],
  alt: "A curated room",
  styles: "curated-image",
};
