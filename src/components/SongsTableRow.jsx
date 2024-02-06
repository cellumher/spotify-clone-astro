import { useState } from "react";
import { SongPlayButton } from "./SongPlayButton";
import { usePlayerStore } from "@/store/playerStore";

export function SongsTableRow ({song, index}) {
  const [hover, setHover] = useState(false);
  const { song: currentSong } = usePlayerStore(state => state.currentMusic);
  const isSongSelected = 
  `${currentSong?.albumId}` === `${song.albumId}` 
  && `${currentSong?.id}` === `${song.id}`;

  return (
    <tr className="border-spacing-0 text-gray-300 text-sm font-normal hover:bg-white/10 overflow-hidden transition duration-300" 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}>
      <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-12">
        <SongPlayButton playlistId={song.albumId} id={song.id} order={index+1} hover={hover} />
      </td>
      <td className="px-4 py-2 flex gap-3">
        <picture className="aspect-square">
          <img src={song.image} alt={song.title} className="w-11 h-11 rounded-md" />
        </picture>
        <div className="flex flex-col">
          <h3 className={`text-base font-normal ${isSongSelected ? "text-green-500" : "text-white" }`}>{song.title}</h3>
          <span>{song.artists.join(", ")}</span>
        </div>
      </td>
      <td className="px-4 py-2">{song.album}</td>
      <td className="px-4 py-2 h-full rounded-tr-lg rounded-br-lg tabular-nums text-center">{song.duration}</td>
    </tr>

  )
}