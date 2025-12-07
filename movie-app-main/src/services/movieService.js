export const loadMovies = async (jsonFileName) => {
  try {
    let jsonData;
    switch (jsonFileName) {
      case "movies":
        jsonData = require("../data/movies.json");
        return jsonData;
      case "Xu huong":
        jsonData = require("../../assets/media/Xu huong/xuhuong.json");
        return jsonData;
      case "Hai huoc":
        jsonData = require("../../assets/media/Hai huoc/haihuoc.json");
        return jsonData;
      case "De xuat cho ban":
        jsonData = require("../../assets/media/De xuat cho ban/dexuatchoban.json");
        return jsonData;
      case "Hanh dong":
        jsonData = require("../../assets/media/Hanh dong/hanhdong.json");
        return jsonData;
      case "Hoat hinh":
        jsonData = require("../../assets/media/Hoat hinh/hoathinh.json");
        return jsonData;
      case "Moi phat hanh":
        jsonData = require("../../assets/media/Moi phat hanh/moiphathanh.json");
        return jsonData;
      case "Pho bien":
        jsonData = require("../../assets/media/Pho bien/phobien.json");
        return jsonData;
      case "Tinh cam":
        jsonData = require("../../assets/media/Tinh cam/tinhcam.json");
        return jsonData;
      default:
        jsonData = require("../data/movies.json");
        return jsonData.movies;
    }
  } catch (error) {
    console.error(`Error loading movies from ${jsonFileName}:`, error);
    return [];
  }
};
