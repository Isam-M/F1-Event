import axios, { AxiosResponse } from "axios";

const MainService = (API_URL: string) => {
  //REMEMBER TO CHANGE THIS TO THE CORRECT PORT
  const port = "5192";
  const tableController = `http://localhost:${port}/api/${API_URL}`;
  const imageController = `http://localhost:${port}/api/imageUpload`;
  const imageUrl = `http://localhost:${port}/images`;

  const getAll = async (): Promise<any[]> => {
    try {
      const result: AxiosResponse<any[]> = await axios.get(tableController);
      return result.data;
    } catch (error) {
      return [];
    }
  };

  const getById = async (id: number): Promise<any> => {
    try {
      const result: AxiosResponse<any> = await axios.get(
        `${tableController}/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const post = async (table: any, image: File | null): Promise<void> => {
    const result: AxiosResponse<any> = await axios.post(tableController, table);
    try {
      if (image) {
        const formData = new FormData();
        formData.append("formFile", image);

        const uploadResult = await axios({
          method: "POST",
          url: imageController,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        formData.delete("formFile");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postWithoutImage = async (table: any): Promise<void> => {
    try {
      const result: AxiosResponse<any> = await axios.post(
        tableController,
        table
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editTable = async (tableToUpdate: any) => {
    try {
      const result: AxiosResponse<any> = await axios.put(
        tableController,
        tableToUpdate
      );
      console.log(result.data);
    } catch (error) {
      throw error;
    }
  };

  const deleteById = async (id: number): Promise<any> => {
    try {
      const result: AxiosResponse<any> = await axios.delete(
        `${tableController}/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const getImageUrl = () => {
    return imageUrl;
  };

  const getByName = async (name: string): Promise<any> => {
    try {
      const result: AxiosResponse<any> = await axios.get(
        `${tableController}/${name}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  return {
    getAll,
    getById,
    post,
    editTable,
    deleteById,
    getImageUrl,
    postWithoutImage,
    getByName,
  };
};

export default MainService;
