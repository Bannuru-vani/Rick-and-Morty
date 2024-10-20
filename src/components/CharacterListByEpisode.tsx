// src/components/CharacterListByEpisode.tsx
import React, { useEffect, useState } from "react";
import { fetchCharactersByEpisodeId } from "../services";
import CharacterComp from "./Character";

interface Character {
  gender: string;
  id: number;
  name: string;
  image: string;
  species: string;
}

interface Props {
  episodeId: number;
}

const CharacterListByEpisode: React.FC<Props> = ({ episodeId }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [episodeName, setEpisodeName] = useState<string | null>(null);

  useEffect(() => {
    if (episodeId) {
      // Fetch characters from the selected Episode
      const getCharacters = async () => {
        try {
          setLoading(true);
          setError(null);
          let { data, episodeName } = await fetchCharactersByEpisodeId(
            episodeId
          );
          setCharacters(data);
          setEpisodeName(episodeName);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError("Failed to load characters. Please try again later.");
        }
      };
      getCharacters();
    }
  }, [episodeId]);

  // Pagination logic
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <div className="w-3/4 p-4">
      {/* Heasding with Episode name */}
      <h2 className="text-lg mb-4">Characters - {episodeName}</h2>

      {/* Display error message if API fails */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Display loading message while characters are being fetched */}
      {loading ? (
        <p className="text-center">Loading characters...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {currentCharacters.map((character) => (
              <CharacterComp
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-md hover:bg-gray-300`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterListByEpisode;
