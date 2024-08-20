import MainService from "./MainService";

const RaceService = (() => {
  const API_URL = "races";
  const {
    getAll,
    getById,
    postWithoutImage,
    editTable,
    deleteById,
    getImageUrl,
    getByName,
  } = MainService(API_URL);

  return {
    getAll,
    getById,
    postWithoutImage,
    editTable,
    deleteById,
    getImageUrl,
    getByName,
  };
})();

export default RaceService;
