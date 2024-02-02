/**
 * Handles key press events, triggering a callback function when the Enter key is pressed.
 *
 * @param {Event} e - The key press event.
 * @param {function} callback - The callback function to be triggered.
 */

export default function handleKeyPress(e, callback) {
  if (e.key !== "Enter") return;
  callback(e);
}
