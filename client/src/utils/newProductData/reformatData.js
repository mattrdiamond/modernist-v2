export const reformatOptions = (originalData) => {
  const updatedData = {};

  Object.keys(originalData).forEach((key) => {
    const originalItem = originalData[key];
    if (originalItem.options) {
      const updatedOptions = Object.keys(originalItem.options).map(
        (optionName) => ({
          name: optionName,
          choices: originalItem.options[optionName],
        })
      );

      updatedData[key] = {
        options: updatedOptions,
      };
    }
  });

  return updatedData;
};
