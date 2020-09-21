/*
 * Remove any special characters or extra spaces
 */
const removeSpecialChars = (input) =>
  input.replace(/\s\s+|[^a-zA-Z0-9 ]/gi, "");

// compare search input to shop items and return words that begin with input
export const getSearchResults = (input, shopItems) => {
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
};

/*
 * Debounce
 */
export function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

/*
 * Sort Ascending
 */
export const sortAsc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? 1 : -1));

/*
 * Sort Descending
 */
export const sortDesc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? -1 : 1));
