exports.getRouteParts = function getRouteParts(url) {
  const dynamicIndex = url.indexOf("/dynamic/");
  if (dynamicIndex === -1) {
    return []; // Return an empty array if "dynamic" is not in the URL
  }
  const routePart = url.substring(dynamicIndex + 9); // 9 is the length of "/dynamic/"
  return routePart.split("/").filter(Boolean); // Split by "/" and filter out empty strings
};
