import type { Track } from '../types';
import './TrackDetailsModal.scss';

interface TrackDetailsModalProps {
  track: Track;
  onClose: () => void;
}

export default function TrackDetailsModal({ track, onClose }: TrackDetailsModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{track.track_name}</h2>
        <ul>
          <li><strong>Artist:</strong> {track.artist}</li>
          <li><strong>Album:</strong> {track.album_name}</li>
          <li><strong>Genre:</strong> {track.genre}</li>
          <li><strong>Release Year:</strong> {track.release_year}</li>
          <li><strong>Release Date:</strong> {track.release_date}</li>
          <li><strong>Rating:</strong> {track.rating}</li>
        </ul>
      </div>
    </div>
  );
}
