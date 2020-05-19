import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselCard from "../carousel-card/carousel-card.component";
import Icon from "../icon/icon.component";
import "./carousel.styles.scss";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Carousel = () => {
  const [sliderState, setSliderState] = useState({
    images: [],
    fetchImageCount: 20,
    // start: 1,
    visibleImages: 0,
    page: 1,
    index: 0,
    sliderPosition: 0,
    imagesLoaded: 0,
  });

  // fetch data and set initial images based on screen size
  useEffect(() => {
    const { page, images, fetchImageCount } = sliderState;
    const collectionId = 1118894; // Unsplash 'superior-interior' collection
    const imageCount = imagesFitOnScreen();

    axios
      .get(
        `/api/photos?id=${collectionId}&page=${page}&perPage=${fetchImageCount}&orderBy=popular`
      )
      .then((res) => {
        console.log("response", res);
        setSliderState({
          ...sliderState,
          images: images.concat(res.data),
          imagesLoaded: imageCount,
          visibleImages: imageCount,
        });
      });
  }, []);

  // Keep track of window dimensions so we can adjust the number of photos when window resized
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 250);

    window.addEventListener("resize", debouncedHandleResize);

    updateScreenSize();

    return (_) => {
      console.log("remove listener");
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [dimensions]);

  const updateScreenSize = () => {
    console.log("update Screen size");
    const { visibleImages, index, fetchImageCount } = sliderState;
    const currentVisibleImages = imagesFitOnScreen();
    // 1. Only update if number of visible images changed
    if (visibleImages === currentVisibleImages) return;
    // 2. When widening the screen and there are NOT enough images to display after current index,
    //    move index back and display last (n) number of visible images in fetchImageCount
    else if (
      visibleImages < currentVisibleImages &&
      index + currentVisibleImages > fetchImageCount
    ) {
      return setSliderState({
        ...sliderState,
        index: fetchImageCount - currentVisibleImages,
        visibleImages: currentVisibleImages,
        imagesLoaded: fetchImageCount,
        sliderPosition:
          (fetchImageCount - currentVisibleImages) *
          (100 / currentVisibleImages),
      });
    }
    // 3. When widening the screen and there ARE enough images to display after current index
    //    or when narrowing the screen, add new images
    return setSliderState({
      ...sliderState,
      visibleImages: currentVisibleImages,
      imagesLoaded: index + currentVisibleImages,
      sliderPosition: index * (100 / currentVisibleImages),
    });
  };

  const imagesFitOnScreen = () => {
    const width = dimensions.width;
    switch (true) {
      case width <= 500:
        return 1;
      case width <= 800:
        return 2;
      case width <= 1100:
        return 3;
      case width <= 1300:
        return 4;
      default:
        return 5;
    }
  };

  const nextImage = () => {
    const {
      index,
      visibleImages,
      fetchImageCount,
      imagesLoaded,
      sliderPosition,
    } = sliderState;

    // If we've reached the end, return
    if (index + visibleImages === fetchImageCount) return;

    setSliderState({
      ...sliderState,
      index: index + 1,
      imagesLoaded: imagesLoaded + 1,
      sliderPosition: sliderPosition + 100 / visibleImages, // add percentage of 1 visible image (i.e. 4 visible images, move slider 25%)
    });
  };

  const previousImage = () => {
    const { index, sliderPosition, visibleImages } = sliderState;

    if (index === 0) return;

    setSliderState({
      ...sliderState,
      index: index - 1,
      sliderPosition: sliderPosition - 100 / visibleImages,
    });
  };

  const {
    index,
    images,
    fetchImageCount,
    imagesLoaded,
    sliderPosition,
    visibleImages,
  } = sliderState;

  console.log("render");

  if (!images) return <span>loading...</span>;

  return (
    <div className="carousel-component">
      <div className="cards-slider">
        <button
          className="circle-button right"
          onClick={nextImage}
          disabled={index + visibleImages === fetchImageCount}
        >
          <Icon icon="arrow-right" />
        </button>
        <button
          className="circle-button left"
          onClick={previousImage}
          disabled={index === 0}
        >
          <Icon icon="arrow-left" />
        </button>
        <div
          className="cards-slider-wrapper"
          style={{ transform: `translateX(-${sliderPosition}%)` }}
        >
          {images
            .filter((image, index) => index < imagesLoaded)
            .map((image, index) => (
              <CarouselCard
                key={image.id}
                index={index}
                image={image}
                sliderState={sliderState}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
