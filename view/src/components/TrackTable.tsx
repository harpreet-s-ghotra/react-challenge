import type { Track } from '../types';
import './TrackTable.scss';

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
            <th scope='col'>Track Name</th>
            <th scope='col'>Artist</th>
            <th scope='col'>Album Name</th>
            <th scope='col'>Genre</th>
            <th scope='col'>Release Year</th>
            <th scope='col'>Rating</th>
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
