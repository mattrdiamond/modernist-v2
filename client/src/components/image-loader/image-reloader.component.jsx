import React, { useState, useEffect, useRef } from "react";
import Spinner from "../../components/spinner/spinner.component";
import "./image-loader.styles.scss";

/**
 * ImageReloader can update image src without unmounting and show loader while image loads
 * Note: In Safari, when images are loaded from cache, onLoad runs before useEffect,
 * so ref is used to detect when image is loaded rather than state
 */

const ImageReloader = ({ src, srcSet, alt, styles, withSpinner, ...props }) => {
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete || !src) return;
    setLoading(true);
  }, [src]);

  return (
    <>
      {loading && withSpinner && <Spinner />}
      <img
        {...{ src: src, ...props }}
        ref={imgRef}
        className={styles + (loading ? " loading" : "")}
        srcSet={srcSet}
        alt={alt || ""}
        loading='lazy'
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </>
  );
};

export default ImageReloader;
