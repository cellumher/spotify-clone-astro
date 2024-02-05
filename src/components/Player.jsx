import { usePlayerStore } from "@/store/playerStore";
import { useRef, useEffect, useState } from "react";
import { Slider } from "@/components/Slider";

export const Pause = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 
    0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z">
    </path>
  </svg>
)

export const Play = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 
    0 0 1 3 14.288V1.713z">
    </path>
  </svg>
)

export const Previous = ({ className }) => (
  <svg className={className} data-encore-id="icon" role="img" aria-hidden="true" height="16" width="16" viewBox="0 0 16 16">
    <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 
    0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z">
    </path>
  </svg>
)

export const Next = ({ className }) => (
  <svg className={className} data-encore-id="icon" role="img" aria-hidden="true" height="16" width="16" viewBox="0 0 16 16">
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 
    1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z">
    </path>
  </svg>
)

export const VolumeSilence = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" 
  aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 
  0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 
  1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z">
    </path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 
    1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 
    1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z">
    </path>
  </svg>
) 

export const Volume = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" 
  aria-label="Volumen alto" id="volume-icon" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 
    0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 
    5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
    </path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z">
    </path>
  </svg>
  )


const CurrentSong = ({ image, title, artists }) => {

  const artistsString = artists?.join(", ");

  return (
    <div className={`flex items-center gap-4 relative overflow-hidden`}>

      <picture className="flex-shrink-0 w-14 h-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </picture>

      <div className="flex flex-col truncate">
        <h3 className="text-sm font-semibold block truncate">
          {title}
        </h3>
        <span className="text-xs text-gray-400 truncate">
          { artistsString }
        </span>
      </div>

    </div>
  )
}

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    audio?.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio?.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(!!audio.current.src ? audio.current.currentTime : null);
  }

  const formatTime = time => {
    if (time == null || Number.isNaN(time)) return "-:--";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const songDuration = audio?.current?.duration;

  return (
    <div className="flex w-full gap-x-1 text-sm text-zinc-400 pt-1">
      <span className="whitespace-nowrap min-w-10 text-right">{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        max={songDuration}
        min={0}
        value={[currentTime]}
        className="w-full"
        onValueChange={(value) => {
          audio.current.currentTime = value
        }}
      />

      <span className="whitespace-nowrap min-w-10 text-left">{ formatTime(songDuration) }</span>
    </div>
  )
}


const VolumeControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumeRef = useRef(volume)

  const isVolumeSilenced = volume === 0;

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className="flex justify-end items-center gap-x-2 text-white group w-full">
      <button className="opacity-70 hover:opacity-100 transition cursor-default py-2 ps-2" onClick={handleClickVolumen}>
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>
    
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-3/5"
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>
  )
}


export function Player () {
  
  const { currentMusic, isPlaying, setIsPlaying, volume, setCurrentMusic } = usePlayerStore(state => state);
  const audioRef = useRef();

  useEffect(() => {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume])

  useEffect(() => {
    const { song, playlist } = currentMusic;

    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }

  }, [currentMusic]);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  }

  const findNewSongIndex = (currentSongIndex, changeType, songs, endPlaylist) => {
    switch (changeType) {
      case 'next':
        return currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : (endPlaylist ? -1 : 0);
      case 'previous':
        return currentSongIndex > 0 ? currentSongIndex - 1 : (songs.length - 1);
      default:
        return currentSongIndex;
    }
  };
  
  const handleEndOfPlaylist = (newSongIndex) => {
    if (newSongIndex === -1) {
      setIsPlaying(false);
      return true;
    }
    return false;
  };
  
  const handleSongChange = ({ changeType, endPlaylist }) => {
    const { song, songs } = currentMusic;
    const currentSongIndex = songs.findIndex((playlistSong) => song.id === playlistSong.id);
  
    const newSongIndex = findNewSongIndex(currentSongIndex, changeType, songs, endPlaylist);
  
    if (!handleEndOfPlaylist(newSongIndex)) {
      setCurrentMusic({ ...currentMusic, song: songs[newSongIndex] });
    }
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 pt-2 z-50">
      <div className="w-[30%]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="flex place-content-center gap-4 flex-1 w-[40%]">
        <div className="flex flex-col justify-center items-center w-full">
          <div>
          <button className="p-2 mx-4 fill-zinc-400 hover:fill-zinc-50"
            onClick={() => handleSongChange({changeType: 'previous', endPlaylist: false})}>
            <Previous className={"fill-inherit"}/>
          </button>
          <button className="bg-white rounded-full p-2" 
          onClick={handlePlayClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button className="p-2 mx-4 fill-zinc-400 hover:fill-zinc-50"
            onClick={() => handleSongChange({changeType: 'next', endPlaylist: false})}>
            <Next className={"fill-inherit"}/>
          </button>

          </div>
          <SongControl audio={audioRef}/>
        </div>
      </div>
      <div className="flex items-center w-[30%]">
        <VolumeControl />
      </div>

      <audio ref={audioRef} onEnded={() => handleSongChange({changeType: 'next', endPlaylist: true})}></audio>
    </div>
  )
}