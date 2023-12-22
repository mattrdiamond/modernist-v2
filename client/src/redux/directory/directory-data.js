const mobileLarge = 471;
const tablet = 801;
const desktop = 1001;

const directoryData = [
  {
    title: "Sofas & Sectionals",
    images: [
      {
        media: `(min-width: ${desktop}px)`,
        srcSet:
          "/images/home/directory/sofas_2x.webp 2x, /images/home/directory/sofas_2x.jpg 2x, /images/home/directory/sofas_1x.webp 1x, /images/home/directory/sofas_1x.jpg 1x",
      },
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/sofas_tablet_2x.webp 2x, /images/home/directory/sofas_tablet_2x.jpg 2x, /images/home/directory/sofas_tablet_1x.webp 1x, /images/home/directory/sofas_tablet_1x.jpg 1x",
      },
      {
        media: `(min-width: ${mobileLarge}px)`,
        srcSet:
          "/images/home/directory/sofas_mobilelarge_2x.webp 2x, /images/home/directory/sofas_mobilelarge_2x.jpg 2x, /images/home/directory/sofas_mobilelarge_1x.webp 1x, /images/home/directory/sofas_mobilelarge_1x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/sofas_mobile_2x.webp 2x, /images/home/directory/sofas_mobile_2x.jpg 2x, /images/home/directory/sofas_mobile_1x.webp 1x, /images/home/directory/sofas_mobile_1x.jpg 1x",
      },
    ],

    id: 1,
    linkUrl: "shop/sofas",
  },
  {
    title: "Lighting",
    images: [
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/lighting_2x.webp 2x, /images/home/directory/lighting_2x.jpg 2x, /images/home/directory/lighting_1x.webp 1x, /images/home/directory/lighting_1x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/lighting_mobile_2x.webp 2x, /images/home/directory/lighting_mobile_2x.jpg 2x, /images/home/directory/lighting_mobile_1x.webp 1x, /images/home/directory/lighting_mobile_1x.jpg 1x",
      },
    ],
    id: 2,
    linkUrl: "shop/lighting",
  },
  {
    title: "Tables",
    images: [
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/tables_2x.webp 2x, /images/home/directory/tables_2x.jpg 2x, /images/home/directory/tables_1x.webp 1x, /images/home/directory/tables_1x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/tables_mobile_2x.webp 2x, /images/home/directory/tables_mobile_2x.jpg 2x, /images/home/directory/tables_mobile_1x.webp 1x, /images/home/directory/tables_mobile_1x.jpg 1x",
      },
    ],
    id: 3,
    linkUrl: "shop/tables",
  },
  {
    title: "Bedding",
    images: [
      {
        media: `(min-width: ${desktop}px)`,
        srcSet:
          "/images/home/directory/bedding_2x.webp 2x, /images/home/directory/bedding_2x.jpg 2x, /images/home/directory/bedding_1x.webp 1x, /images/home/directory/bedding_1x.jpg 1x",
      },
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/bedding_tablet_2x.webp 2x, /images/home/directory/bedding_tablet_2x.jpg 2x, /images/home/directory/bedding_tablet_1x.webp 1x, /images/home/directory/bedding_tablet_1x.jpg 1x",
      },
      {
        media: `(min-width: ${mobileLarge}px)`,
        srcSet:
          "/images/home/directory/bedding_mobilelarge_2x.webp 2x, /images/home/directory/bedding_mobilelarge_2x.jpg 2x, /images/home/directory/bedding_mobilelarge_1x.webp 1x, /images/home/directory/bedding_mobilelarge_1x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/bedding_mobile_2x.webp 2x, /images/home/directory/bedding_mobile_2x.jpg 2x, /images/home/directory/bedding_mobile_2x.webp 1x, /images/home/directory/bedding_mobile_2x.jpg 1x",
      },
    ],
    size: "large",
    id: 4,
    linkUrl: "shop/bedding",
  },
  {
    title: "Decor",
    images: [
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/decor_2x.webp 2x, /images/home/directory/decor_2x.jpg 2x, /images/home/directory/decor_2x.webp 1x, /images/home/directory/decor_2x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/decor_mobile_2x.webp 2x, /images/home/directory/decor_mobile_2x.jpg 2x, /images/home/directory/decor_mobile_1x.webp 1x, /images/home/directory/decor_mobile_1x.jpg 1x",
      },
    ],
    id: 5,
    linkUrl: "shop/decor",
  },
  {
    title: "Chairs & Ottomans",
    images: [
      {
        media: `(min-width: ${tablet}px)`,
        srcSet:
          "/images/home/directory/chairs_2x.webp 2x, /images/home/directory/chairs_2x.jpg 2x, /images/home/directory/chairs_1x.webp 1x, /images/home/directory/chairs_1x.webp 1x",
      },
      {
        media: `(min-width: ${mobileLarge}px)`,
        srcSet:
          "/images/home/directory/chairs_mobilelarge_2x.webp 2x, /images/home/directory/chairs_mobilelarge_2x.jpg 2x, /images/home/directory/chairs_mobilelarge_1x.webp 1x, /images/home/directory/chairs_mobilelarge_1x.jpg 1x",
      },
      {
        srcSet:
          "/images/home/directory/chairs_mobile_2x.webp 2x, /images/home/directory/chairs_mobile_2x.jpg 2x, /images/home/directory/chairs_mobile_1x.webp 1x, /images/home/directory/chairs_mobile_1x.jpg 1x",
      },
    ],
    id: 6,
    linkUrl: "shop/chairs",
  },
];
export default directoryData;
