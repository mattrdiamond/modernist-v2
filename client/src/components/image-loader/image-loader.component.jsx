import React, { useState } from "react";
import Spinner from "../../components/spinner/spinner.component";
import "./image-loader.styles.scss";

const ImageLoader = ({ src, alt, styles, withSpinner, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && withSpinner && <Spinner />}
      <img
        {...{ src: src, ...props }}
        className={styles + (loading ? " loading" : "")}
        alt={alt || ""}
        loading='lazy'
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </>
  );
};

export default ImageLoader;
