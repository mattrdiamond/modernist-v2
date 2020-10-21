import React, { useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import CarouselCard from "../carousel-card/carousel-card.component";
import Icon from "../icon/icon.component";
import Spinner from "../spinner/spinner.component";
import useWindowSize from "../../hooks/use-window-size";
import useOnScreen from "../../hooks/use-on-screen";
import "./carousel.styles.scss";

// Determine how many images to display based on window width
export const imagesFitOnScreen = () => {
  const width = window.innerWidth;
  switch (true) {
    case width <= 600:
      return 1;
    case width <= 925:
      return 2;
    case width <= 1200:
      return 3;
    default:
      return 4;
  }
};

const INITIAL_STATE = {
  images: null,
  fetchImageCount: 20,
  visibleImages: 0,
  index: 0,
  sliderPosition: 0,
  imagesLoaded: 0,
};

function carouselReducer(state, action) {
  const {
    fetchImageCount,
    visibleImages,
    index,
    sliderPosition,
    imagesLoaded,
  } = state;
  const currentVisibleImages = imagesFitOnScreen();

  switch (action.type) {
    case "FETCH_IMAGES":
      return {
        ...state,
        images: action.payload,
        imagesLoaded: currentVisibleImages,
        visibleImages: currentVisibleImages,
      };
    case "NEXT_IMAGE":
      return {
        ...state,
        index: index + 1,
        imagesLoaded: imagesLoaded + 1,
        sliderPosition: sliderPosition + 100 / visibleImages, // Add percentage of 1 visible image (e.g. if 4 visible images, move slider 25%)
      };
    case "PREVIOUS_IMAGE":
      return {
        ...state,
        index: index - 1,
        sliderPosition: sliderPosition - 100 / visibleImages,
      };
    case "DISPLAY_CAROUSEL_END":
      return {
        ...state,
        index: fetchImageCount - currentVisibleImages,
        visibleImages: currentVisibleImages,
        imagesLoaded: fetchImageCount,
        sliderPosition:
          (fetchImageCount - currentVisibleImages) *
          (100 / currentVisibleImages),
      };
    case "RESIZE_CAROUSEL":
      return {
        ...state,
        visibleImages: currentVisibleImages,
        imagesLoaded: index + currentVisibleImages,
        sliderPosition: index * (100 / currentVisibleImages),
      };
    default:
      return state;
  }
}

const Carousel = () => {
  const [carouselState, dispatch] = useReducer(carouselReducer, INITIAL_STATE);
  const [setRef, visible] = useOnScreen({
    threshold: 0,
    rootMargin: "0px 0px 200px 0px",
  });

  const {
    images,
    fetchImageCount,
    visibleImages,
    index,
    sliderPosition,
    imagesLoaded,
  } = carouselState;

  // Fetch data and set initial images based on screen size
  useEffect(() => {
    // mounted - only updates state if component is still mounted when fetch call completes
    let mounted = true;
    const collectionId = 1118894; // Unsplash 'superior-interior' collection

    if (visible) {
      axios
        .get(
          `/api/photos?id=${collectionId}&page=1&perPage=${fetchImageCount}&orderBy=popular`
        )
        .then((res) => {
          if (mounted) {
            dispatch({ type: "FETCH_IMAGES", payload: res.data });
          }
        });
    }

    // set mounted = false when component unmounts
    return () => (mounted = false);
  }, [fetchImageCount, visible]);

  const updateScreenSize = useCallback(() => {
    const currentVisibleImages = imagesFitOnScreen();
    // 1. Only update if number of visible images changed
    if (visibleImages === currentVisibleImages) return;
    // 2. When widening the screen and there are NOT enough images to display after current index,
    //    move index back and display the last number of visibleImages
    else if (
      visibleImages < currentVisibleImages &&
      index + currentVisibleImages > fetchImageCount
    ) {
      return dispatch({ type: "DISPLAY_CAROUSEL_END" });
    }
    // 3. When widening the screen and there ARE enough images to display after current index
    //    or when narrowing the screen, add new images
    return dispatch({ type: "RESIZE_CAROUSEL" });
  }, [fetchImageCount, index, visibleImages]);

  // useWindowSize hook - keeps track of window dimensions and calls updateScreenSize when window resized
  useWindowSize(updateScreenSize);

  const nextImage = () => {
    // If we've reached the end, return
    if (index + visibleImages === fetchImageCount) return;
    dispatch({ type: "NEXT_IMAGE" });
  };

  const previousImage = () => {
    if (index === 0) return;
    dispatch({ type: "PREVIOUS_IMAGE" });
  };

  return (
    <section className="carousel-component" ref={setRef}>
      <div className="carousel-text page-width">
        <h2>Share the love.</h2>
        <p>
          Great home decorating ideas are meant to be shared. Check out our
          customer gallery below for design inspiration in a variety of styles.
          Use <span className="bold">#Modernist</span> to share ideas of your
          own!
        </p>
      </div>
      {!images ? (
        <Spinner height="350px" />
      ) : (
        <div className="carousel">
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
                    carouselState={carouselState}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carousel;
