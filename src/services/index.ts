import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

// API call to get episodes
export const fetchEpisodes = async (page: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode?page=${page}`);
    return {
      data: response.data.results,
      maxPage: response.data.info.pages,
      totalEpisodes: response.data.info.count,
    };
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw new Error("Could not fetch episodes. Please try again later.");
  }
};

// API call to get episodes
export const fetchCharacters = async (page: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/character?page=${page}`);
    return {
      data: response.data.results,
      maxPage: response.data.info.pages,
      totalCharacters: response.data.info.count,
    };
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw new Error("Could not fetch episodes. Please try again later.");
  }
};

// API call to fetch character by URL
export const fetchCharactersByEpisodeId = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/episode/${id}`);
    const characterUrls = response.data.characters;
    // get each character
    let list = await Promise.all(
      characterUrls.map((url: string) => axios.get(url))
    );

    return {
      data: list.map((res) => res.data),
      episodeName: response.data.name,
    };
  } catch (error) {
    throw new Error("Could not fetch character data. Please try again later.");
  }
};
