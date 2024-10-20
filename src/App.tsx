import React, { useState } from "react";
import EpisodeList from "./components/EpisodeList";
import CharacterListByEpisode from "./components/CharacterListByEpisode";
import AllCharacters from "./components/AllCharacters";

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  // If no selected Episode then All Characters will be shown else Characters in the selected episode
  return (
    <div className="p-2 max-h-screen">
      <h2 className="text-center my-2 text-2xl text-gray-700">
        Rick and Morty Characters
      </h2>
      <div className="flex">
        <EpisodeList
          selectedEpisode={selectedEpisode as number}
          onSelectEpisode={(id) => setSelectedEpisode(id)}
        />
        {selectedEpisode ? (
          <CharacterListByEpisode episodeId={selectedEpisode as number} />
        ) : (
          <AllCharacters />
        )}
      </div>
    </div>
  );
};

export default App;
