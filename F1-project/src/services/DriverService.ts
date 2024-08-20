import MainService from "./MainService";

const DriverService = (() => {
  const API_URL = "drivers";
  const { getAll, getById, post, editTable, deleteById, getImageUrl } =
    MainService(API_URL);

  return {
    getAll,
    getById,
    post,
    editTable,
    deleteById,
    getImageUrl,
  };
})();

export default DriverService;
