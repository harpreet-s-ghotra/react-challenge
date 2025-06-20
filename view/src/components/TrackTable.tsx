import type { Track } from '../types';
import './TrackTable.scss';
import { STRINGS } from '../strings';

const { details } = STRINGS;

interface TrackTableProps {
  tracks: Track[];
  onRowClick: (track: Track) => void;
}

export default function TrackTable({ tracks, onRowClick }: TrackTableProps) {
  return (
    <div className='track-table-wrapper' role='region' aria-label='Track list'>
      <table className='track-table'>
        <thead>
          <tr>
            <th scope='col'>{details.trackName}</th>
            <th scope='col'>{details.artist}</th>
            <th scope='col'>{details.album}</th>
            <th scope='col'>{details.genre}</th>
            <th scope='col'>{details.releaseYear}</th>
            <th scope='col'>{details.rating}</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr
              key={track.id}
              tabIndex={0}
              role='button'
              aria-label={`View details for ${track.track_name} by ${track.artist}`}
              onClick={() => onRowClick(track)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick(track);
                }
              }}
            >
              <td>{track.track_name}</td>
              <td>{track.artist}</td>
              <td>{track.album_name}</td>
              <td>{track.genre}</td>
              <td>{track.release_year}</td>
              <td>{track.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
