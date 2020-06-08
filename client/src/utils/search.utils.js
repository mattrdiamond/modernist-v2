// remove any special characters or extra spaces
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

export default getSearchResults;
