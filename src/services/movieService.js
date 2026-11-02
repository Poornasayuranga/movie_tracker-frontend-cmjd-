import axiosClient from "../api/axiosClient";

export const getAllMovies = async () => {
    const response = await axiosClient.get("/api/movies");

    return response.data;
};