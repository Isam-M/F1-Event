import MainService from "./MainService";

const TeamService = (() => {
  const API_URL = "teams";
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

export default TeamService;
