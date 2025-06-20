import type { Track } from '../types';
import './TrackDetailsModal.scss';
import { STRINGS } from '../strings';

interface TrackDetailsModalProps {
  track: Track;
  onClose: () => void;
}

const details = STRINGS.details;

export default function TrackDetailsModal({ track, onClose }: TrackDetailsModalProps) {
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-btn' onClick={onClose}>
          X
        </button>
        <h2>{track.track_name}</h2>
        <ul>
          <li>
            <strong>{details.artist}:</strong> {track.artist}
          </li>
          <li>
            <strong>{details.album}:</strong> {track.album_name}
          </li>
          <li>
            <strong>{details.genre}:</strong> {track.genre}
          </li>
          <li>
            <strong>{details.releaseYear}:</strong> {track.release_year}
          </li>
          <li>
            <strong>{details.releaseDate}:</strong> {track.release_date}
          </li>
          <li>
            <strong>{details.rating}:</strong> {track.rating}
          </li>
        </ul>
      </div>
    </div>
  );
}
