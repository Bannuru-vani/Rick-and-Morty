import React from "react";
import { IoIosCalendar, IoIosPeople } from "react-icons/io";

interface EpisodeProps {
  id: number;
  name: string;
  air_date: string;
  charactersCount: number;
  selected: boolean;
  onSelectEpisode: (id: number) => void;
  selectedEpisode: number;
}

// Episode component
const Episode: React.FC<EpisodeProps> = ({
  id,
  name,
  air_date,
  charactersCount,
  selected,
  onSelectEpisode,
  selectedEpisode,
}) => {
  const onToggeleEpisode = (id: number) => {
    if (selectedEpisode === id) {
      onSelectEpisode(0);
    } else {
      onSelectEpisode(id);
    }
  };
  return (
    <li
      className={`cursor-pointer p-2 ${
        selected
          ? "border rounded-md border-slate-400"
          : "border border-transparent"
      }`}
      onClick={() => onToggeleEpisode(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div>{name}</div>
          <span className="text-xs text-slate-500 flex gap-1 items-center">
            <IoIosCalendar /> {air_date}
          </span>
        </div>
        <p className="text-xs text-slate-500 flex gap-1 items-center">
          <span>{charactersCount}</span> <IoIosPeople className="text-sm" />
        </p>
      </div>
    </li>
  );
};

export default Episode;
