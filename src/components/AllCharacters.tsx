import React, { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { fetchCharacters } from "../services";
import CharacterComp from "./Character";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

const AllCharacters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);

  useEffect(() => {
    fetchAllCharacters(currentPage);
  }, [currentPage]);

  // Fetching All Characters
  const fetchAllCharacters = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCharacters(page);
      setCharacters(response.data);
      setTotalPages(response.maxPage);
      setTotalCharacters(response.totalCharacters);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load characters. Please try again later.");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // To not to show all the page numbers on the screen at once, we
  const getPageNumbersAround = (
    currentPage: number,
    totalPages: number
  ): number[] => {
    const pageNumbers: number[] = [];

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="w-3/4 p-4">
      {/* Heading with number of chanracters */}
      <div className="flex gap-4 items-center mb-4 justify-between">
        <h2 className="text-lg ">All Characters </h2>
        <p className="text-md text-slate-500 flex gap-1 items-center">
          <span>{totalCharacters}</span> <IoIosPeople className="text-xl" />
        </p>
      </div>
      {/* Show error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show loading spinner */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {characters.map((character) => (
              <CharacterComp
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
              />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
            {/* Page Numbers */}
            {currentPage > 5 ? "..." : null}
            {getPageNumbersAround(currentPage, totalPages).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 mx-2 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md hover:bg-gray-300`}
              >
                {pageNumber}
              </button>
            ))}
            {currentPage < totalPages - 4 ? "..." : null}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
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

export default AllCharacters;
