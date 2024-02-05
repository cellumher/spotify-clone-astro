import { Pause, Play } from "@/components/Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton ({id, size = "small"}) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  const handleClick = (event) => {
    event.preventDefault();
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

  const buttonPadding = size === 'small' ? 'p-3' : 'p-4'


  return (
    <button onClick={handleClick}
      className={`card-play-button rounded-full bg-green-500 font-xl ${buttonPadding}`}>
      {isPlayingPlaylist ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
    </button>
  )
}