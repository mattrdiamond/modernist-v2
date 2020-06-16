import React, { useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import CarouselCard from "../carousel-card/carousel-card.component";
import Icon from "../icon/icon.component";
import Spinner from "../with-spinner/spinner.component";
import useWindowSize from "../../utils/use-window-size";
import "./carousel.styles.scss";

const imagesFitOnScreen = () => {
  const width = window.innerWidth;
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

const INITIAL_STATE = {
  images: [],
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
        images: state.images.concat(action.payload),
        imagesLoaded: currentVisibleImages,
        visibleImages: currentVisibleImages,
      };
    case "NEXT_IMAGE":
      return {
        ...state,
        index: index + 1,
        imagesLoaded: imagesLoaded + 1,
        sliderPosition: sliderPosition + 100 / visibleImages, // add percentage of 1 visible image (i.e. 4 visible images, move slider 25%)
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

  const {
    images,
    fetchImageCount,
    visibleImages,
    index,
    sliderPosition,
    imagesLoaded,
  } = carouselState;

  // fetch data and set initial images based on screen size
  useEffect(() => {
    const collectionId = 1118894; // Unsplash 'superior-interior' collection
    axios
      .get(
        `/api/photos?id=${collectionId}&page=1&perPage=${fetchImageCount}&orderBy=popular`
      )
      .then((res) => {
        dispatch({ type: "FETCH_IMAGES", payload: res.data });
      });
  }, [fetchImageCount]);

  const updateScreenSize = useCallback(() => {
    const currentVisibleImages = imagesFitOnScreen();
    // 1. Only update if number of visible images changed
    if (visibleImages === currentVisibleImages) return;
    // 2. When widening the screen and there are NOT enough images to display after current index,
    //    move index back and display last (n) number of visible images in fetchImageCount
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

  // useWindowSize - Keeps track of window dimensions so we can adjust the number of photos when window resized
  // call updateScreenSize when window is resized
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

  if (!images) return <Spinner />;
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
                carouselState={carouselState}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
