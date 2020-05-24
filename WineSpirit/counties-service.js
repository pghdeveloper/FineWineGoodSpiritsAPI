const counties = [
    {county: "Allegheny"},
    {county: "Armstrong"},
    {county: "Beaver"},
    {county: "Bedford"},
    {county: "Blair"},
    {county: "Butler"},
    {county: "Cambria"},
    {county: "Crawford"},
    {county: "Erie"},
    {county: "Fayette"},
    {county: "Greene"},
    {county: "Indiana"},
    {county: "Lawrence"},
    {county: "Mercer"},
    {county: "Philadelphia"},
    {county: "Somerset"},
    {county: "Washington"},
    {county: "Westmoreland"},
    {county: "Westmoreland1"}
  ]; 

const getCounties = async () => {
    return JSON.stringify(counties);
}

module.exports = {
    getCounties
}