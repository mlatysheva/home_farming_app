function objectToArray(plantData: object) {
  /**
   * Converts the plant data object to an array of objects
   * @param  {String} plantData  - the plant data object received from the
   * local JSON file or the external API
   * @return {Array} - an array of objects each representing a plant
   */
  return Object.entries(plantData).map(([id, obj]) => ({ id, ...obj }));
}

export { objectToArray };