// src/components/EpisodeList.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { fetchEpisodes } from "../services";
import EpisodeComp from "./Episode";

interface Episode {
  characters: Array<string>;
  air_date: string;
  id: number;
  name: string;
}

interface Props {
  selectedEpisode: number;
  onSelectEpisode: (id: number) => void;
}

const getUniqueEpisodes = (arr: Episode[]): Episode[] => {
  const uniqueIds = new Set<number>();
  return arr.filter((episode) => {
    if (!uniqueIds.has(episode.id)) {
      uniqueIds.add(episode.id);
      return true;
    }
    return false;
  });
};

const EpisodeList: React.FC<Props> = ({ selectedEpisode, onSelectEpisode }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);

  // Ref to catch the scroll for pagination
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (page > maxPage) {
      return;
    }
    // Fetch all the Episodes
    const getEpisodes = async () => {
      setLoading(true);
      const res = await fetchEpisodes(page);
      setMaxPage(res.maxPage);
      setTotalEpisodes(res.totalEpisodes);
      // just in case duplicate episodes fetched, removing duplicates
      setEpisodes((prevEpisodes) =>
        getUniqueEpisodes([...prevEpisodes, ...res.data])
      );
      setLoading(false);
    };
    getEpisodes();
  }, [page, maxPage]);

  useEffect(() => {
    const ulElement = ulRef.current;

    const handleScroll = () => {
      if (!ulRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = ulRef.current;
      // Check if the user has scrolled near the bottom (within 100px of the bottom)
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    if (ulElement) {
      ulElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  return (
    <div className="w-1/4 p-4 border rounded-md border-slate-200 shadow-md h-full">
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-lg mb-2 text-gray-950">Episodes</h2>

        <p className="text-md text-slate-500 flex gap-1 items-center">
          <span>{totalEpisodes}</span> <FaPhotoVideo className="text-md" />
        </p>
      </div>
      <hr className="py-2" />
      <ul ref={ulRef} className="h-screen overflow-auto">
        {episodes.map((episode) => (
          <EpisodeComp
            key={episode.id}
            id={episode.id}
            name={episode.name}
            air_date={episode.air_date}
            charactersCount={episode.characters.length}
            selected={selectedEpisode === episode.id}
            selectedEpisode={selectedEpisode}
            onSelectEpisode={onSelectEpisode}
          />
        ))}
      </ul>
      {loading && <p className="text-center mt-4">Loading more episodes...</p>}
    </div>
  );
};

export default EpisodeList;
