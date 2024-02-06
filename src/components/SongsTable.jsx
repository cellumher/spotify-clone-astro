import { SongsTableRow } from "./SongsTableRow";

export const Time = () => (
  <svg
  role="img"
  height="16"
  width="16"
  aria-hidden="true"
  viewBox="0 0 16 16"
  fill="currentColor"
  ><path
    d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
  ></path><path
    d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
  ></path></svg>
) 


export function SongsTable ({songs}) {

  return (
    <table class="table-auto text-left min-w-full divide-y divide-gray-500/20 cursor-default">
      <thead class="">
        <tr class="text-zinc-300 text-sm">
          <th class="px-4 py-2 font-normal">#</th>
          <th class="px-4 py-2 font-normal">Título</th>
          <th class="px-4 py-2 font-normal">Álbum</th>
          <th class="px-4 py-2 font-normal flex justify-center"><Time /></th>
        </tr>
      </thead>

      <tbody>
        <tr class="h-[16px]"></tr>
        {
          songs.map((song, index) => (
            <SongsTableRow song={song} index={index} key={index} />
          ))
        }
      </tbody>
    </table>
  )
}