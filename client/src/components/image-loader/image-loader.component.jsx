import React, { useState } from "react";
import Spinner from "../../components/spinner/spinner.component";
import "./image-loader.styles.scss";

const ImageLoader = ({ src, alt, styles, srcSet, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className='image-loader-wrapper'>
      {loading && <Spinner />}
      <img
        {...{ src: src, srcSet: srcSet, ...props }}
        className={styles + (loading ? " loading" : "")}
        alt={alt || ""}
        loading='lazy'
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageLoader;
