import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({request}) {
  // get the id from the url (query param)
  const {url} = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get('id')
  const playlistId = urlObject.searchParams.get('playlistId')
  
  const playlist = allPlaylists.find((playlist) => playlist.id === playlistId);
  const playlistSongs = allSongs.filter(song => song.albumId === playlist?.albumId);
  const song = playlistSongs.filter(song => `${song.id}` === `${id}`)[0];

  return new Response(JSON.stringify({ playlist, songs: playlistSongs, song }), {
    headers: { "content-type": "application/json" }
  })
}