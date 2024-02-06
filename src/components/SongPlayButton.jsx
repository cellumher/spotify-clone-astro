import { Pause, Play } from "@/components/Player";
import { usePlayerStore } from "@/store/playerStore";

export function SongPlayButton ({id, playlistId, order, hover}) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);
  const isSongSelected = 
  `${currentMusic?.playlist?.id}` === `${playlistId}` 
  && `${currentMusic?.song?.id}` === `${id}`;
  const isPlayingSong = isPlaying && isSongSelected;

  const handleClick = (event) => {
    event.preventDefault();
    if (isPlayingSong || isSongSelected) {
      setIsPlaying(!isPlaying);
      return;
    }

    fetch(`/api/get-info-song.json?playlistId=${playlistId}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        const {song, songs, playlist} = data;
        setCurrentMusic({
          songs, 
          playlist, 
          song});
        setIsPlaying(true);
      });


  }


  return (
    <button className="h-full w-full flex items-center cursor-default" onClick={handleClick}>
        {
          (hover) && 
          <div className={"w-full"}>
            {isPlayingSong ? <Pause className="fill-slate-50" /> : <Play className="fill-slate-50" />}
          </div>
        }
        {
          (!hover && !isPlayingSong) && 
          <div className={`text-center text-lg w-full ${isSongSelected ? "text-green-500" : "" }`}>
            {order}
          </div>
        }
        {
          (!hover && isPlayingSong) && 
          <picture className="overflow-hidden">
            <img className="object-cover" src='/equaliser-animated.gif' alt='equaliser animated' />
          </picture>
        }
    </button>

  )
}