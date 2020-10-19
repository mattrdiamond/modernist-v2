import React, { useState } from "react";
import Spinner from "../../components/spinner/spinner.component";
import "./image-loader.styles.scss";

const ImageLoader = ({ src, alt, styles }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading ? <Spinner /> : null}
      <img
        className={styles}
        style={{ display: isLoading ? "none" : "block" }}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default ImageLoader;
