import {
  sofas2x,
  sofas1x,
  sofasMobile2x,
  sofasMobile1x,
  lighting2x,
  lighting1x,
  lightingMobile2x,
  lightingMobile1x,
  tables2x,
  tables1x,
  tablesMobile2x,
  tablesMobile1x,
  bedding2x,
  bedding1x,
  beddingMobile2x,
  beddingMobile1x,
  decor2x,
  decor1x,
  decorMobile2x,
  decorMobile1x,
  chairs2x,
  chairs1x,
  chairsMobile2x,
  chairsMobile1x,
} from "../../assets/img/_images";

const INITIAL_STATE = {
  sections: [
    {
      title: "Sofas & Sectionals",
      images: {
        large: sofas2x,
        small: sofas1x,
        mobile2x: sofasMobile2x,
        mobile1x: sofasMobile1x,
      },
      id: 1,
      linkUrl: "shop/hats",
    },
    {
      title: "Lighting",
      images: {
        large: lighting2x,
        small: lighting1x,
        mobile2x: lightingMobile2x,
        mobile1x: lightingMobile1x,
      },
      id: 2,
      linkUrl: "shop/jackets",
    },
    {
      title: "Tables",
      images: {
        large: tables2x,
        small: tables1x,
        mobile2x: tablesMobile2x,
        mobile1x: tablesMobile1x,
      },
      id: 3,
      linkUrl: "shop/sneakers",
    },
    {
      title: "Bedding",
      images: {
        large: bedding2x,
        small: bedding1x,
        mobile2x: beddingMobile2x,
        mobile1x: beddingMobile1x,
      },
      size: "large",
      id: 4,
      linkUrl: "shop/womens",
    },
    {
      title: "Decor",
      images: {
        large: decor2x,
        small: decor1x,
        mobile2x: decorMobile2x,
        mobile1x: decorMobile1x,
      },
      id: 5,
      linkUrl: "shop/mens",
    },
    {
      title: "Chairs & Ottomans",
      images: {
        large: chairs2x,
        small: chairs1x,
        mobile2x: chairsMobile2x,
        mobile1x: chairsMobile1x,
      },
      id: 6,
      linkUrl: "shop/mens",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
