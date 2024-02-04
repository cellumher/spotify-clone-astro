import { Pause, Play } from "@/components/Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton ({id, size = "small"}) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist || currentMusic.playlist?.id === id) {
      setIsPlaying(!isPlaying);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const {songs, playlist} = data;
        setIsPlaying(true);
        setCurrentMusic({songs, playlist, song: songs[0]});

        setCurrentMusic({
          playlist,
          songs,
          song: songs[0]
        })
        setIsPlaying(true);
      });


  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'


  return (
    <button onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-3 font-xl">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}