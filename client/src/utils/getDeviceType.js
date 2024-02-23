export const breakpoints = {
  mobile: 700,
  tablet: 1000,
};

export function getDeviceType(width) {
  if (width <= breakpoints.mobile) {
    return "mobile";
  } else if (width <= breakpoints.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
}
