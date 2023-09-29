import PropTypes from "prop-types";

/**
 * Removes special characters and extra whitespace from a string.
 *
 * @param {string} input - The input string to process.
 * @returns {string} - The input string with special characters and extra whitespace removed.
 */

const removeSpecialChars = (input) =>
  input.replace(/\s\s+|[^a-zA-Z0-9 ]/gi, "");

/**
 * Compares a search input to an array of shop items and returns words that begin with the input.
 *
 * @param {string} input - The search input.
 * @param {Array} shopItems - An array of shop items to search through.
 * @returns {Array} - An array of words from shop item names that begin with the input.
 */
export default function getSearchResults(input, shopItems) {
  if (!input || !shopItems) return;
  const userInput = removeSpecialChars(input.toLowerCase());

  return shopItems.filter((item) => {
    const itemName = removeSpecialChars(item.name.toLowerCase());
    const wordsThatStartWithQuery = new RegExp(
      "\\b" + userInput + "\\S*",
      "gi"
    );
    return itemName.match(wordsThatStartWithQuery);
  });
}

getSearchResults.propTypes = {
  input: PropTypes.string,
  shopItems: PropTypes.arrayOf(PropTypes.object),
};
