import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner/spinner.component";
import "./image-loader.styles.scss";

const ImageLoader = ({ src, srcSet, alt, styles, withSpinner, ...props }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <>
      {loading && withSpinner && <Spinner />}
      <img
        {...{ src: src, ...props }}
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

export default ImageLoader;
