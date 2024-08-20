import MainService from "./MainService";

const CustomDriverService = (() => {
  const API_URL = "customdrivers";
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

export default CustomDriverService;
