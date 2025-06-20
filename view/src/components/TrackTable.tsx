import type { Track } from '../types';
import './TrackTable.scss';

interface TrackTableProps {
  tracks: Track[];
  onRowClick: (track: Track) => void;
}

export default function TrackTable({ tracks, onRowClick }: TrackTableProps) {
  return (
    <div className="track-table-wrapper">
      <table className="track-table">
        <thead>
          <tr>
            <th>Track Name</th>
            <th>Artist</th>
            <th>Album Name</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map(track => (
            <tr key={track.id} onClick={() => onRowClick(track)}>
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
