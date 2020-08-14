import React from "react";
import "./test-btn.styles.scss";

// otherProps includes button type (i.e. submit) and value (submit form)
// children -> <CustomButton>children</CustomButton>
const TestBtn = React.forwardRef((props, ref) => {
  console.log("props", props);
  return (
    <button className="custom-button" ref={ref} {...props}>
      {/*<button className="custom-button" {...otherProps}>*/}
      {props.children}
    </button>
  );
});

export default TestBtn;
