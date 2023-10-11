/**
 * Formats a date difference in a human-readable way.
 *
 * @param {string} isoDateString - The ISO date string to calculate the difference from.
 * @returns {string} A formatted string indicating the time difference in days, weeks, months, or years.
 */

export const formatDateDifference = (isoDateString) => {
  const reviewDate = new Date(isoDateString);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - reviewDate;

  // Calculate the time units
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInWeek = 7 * millisecondsInDay;
  const millisecondsInMonth = 30 * millisecondsInDay;
  const millisecondsInYear = 365 * millisecondsInDay;

  if (timeDifference < millisecondsInWeek) {
    const daysAgo = Math.floor(timeDifference / millisecondsInDay);
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < millisecondsInMonth) {
    const weeksAgo = Math.floor(timeDifference / millisecondsInWeek);
    return `${weeksAgo === 1 ? "1 week" : `${weeksAgo} weeks`} ago`;
  } else if (timeDifference < millisecondsInYear) {
    const monthsAgo = Math.floor(timeDifference / millisecondsInMonth);
    return `${monthsAgo === 1 ? "1 month" : `${monthsAgo} months`} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / millisecondsInYear);
    return `${yearsAgo === 1 ? "1 year" : `${yearsAgo} years`} ago`;
  }
};
