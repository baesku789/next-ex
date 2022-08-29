/**
 * @param unformattedPageId {string}
 */
export function getPageID(unformattedPageId) {
  if (unformattedPageId.length < 32) return false;
  const first = unformattedPageId.slice(0, 8);
  const second = unformattedPageId.slice(8, 12);
  const third = unformattedPageId.slice(12, 16);
  const fourth = unformattedPageId.slice(16, 20);
  const fifth = unformattedPageId.slice(20, 32);

  return first + "-" + second + "-" + third + "-" + fourth + "-" + fifth;
}
