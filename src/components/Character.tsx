import React from "react";

interface CharacterProps {
  id: number;
  name: string;
  image: string;
  species: string;
}
// Single Character Component can be reused
const Character: React.FC<CharacterProps> = ({ id, name, image, species }) => {
  return (
    <div key={id} className="border p-2 rounded-md border-slate-200 shadow">
      <img src={image} alt={name} className="w-full h-auto rounded-md" />
      <h3 className="mt-2">{name}</h3>
      <p className="text-xs text-slate-500">{species}</p>
    </div>
  );
};

export default Character;
