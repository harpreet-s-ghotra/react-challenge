import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Track } from '../types';
import Loader from '../components/Loader';
import './TrackDetailsPage.scss';

const API_URL = 'http://localhost:3001/tracks';

export default function TrackDetailsPage() {
  const { id } = useParams();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data: Track) => {
        setTrack(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!track) return <div>Track not found</div>;

  return (
    <div className='track-details-page'>
      <h2>{track.track_name}</h2>
      <ul>
        <li>
          <strong>Artist:</strong> {track.artist}
        </li>
        <li>
          <strong>Album:</strong> {track.album_name}
        </li>
        <li>
          <strong>Genre:</strong> {track.genre}
        </li>
        <li>
          <strong>Release Year:</strong> {track.release_year}
        </li>
        <li>
          <strong>Release Date:</strong> {track.release_date}
        </li>
        <li>
          <strong>Rating:</strong> {track.rating}
        </li>
      </ul>
    </div>
  );
}
