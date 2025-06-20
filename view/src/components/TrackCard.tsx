import type { Track } from '../types';
import { Card } from '@/components/ui/card';
import { STRINGS } from '../strings';

interface TrackCardProps {
  track: Track;
  onClick: (track: Track) => void;
}

const { details } = STRINGS;
const trackCss = `text-sm text-gray-600 mb-1 min-h-[20px]`;

export default function TrackCard({ track, onClick }: TrackCardProps) {
  return (
    <Card
      className='mb-4 min-h-[120px] flex flex-col justify-center cursor-pointer transition-shadow hover:shadow-md'
      tabIndex={0}
      role='button'
      aria-label={`View details for ${track.track_name} by ${track.artist}`}
      onClick={() => onClick(track)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(track);
        }
      }}
      style={{ minHeight: 120 }}
    >
      <div className='p-4'>
        <div className='font-bold text-lg mb-2 min-h-[28px]'>{track.track_name}</div>
        <div className={trackCss}>
          {details.artist}: {track.artist}
        </div>
        <div className={trackCss}>
          {details.album}: {track.album_name}
        </div>
        <div className={trackCss}>
          {details.genre}: {track.genre}
        </div>
        <div className={trackCss}>
          {details.releaseYear}: {track.release_year}
        </div>
        <div className={trackCss}>
          {details.rating}: {track.rating}
        </div>
      </div>
    </Card>
  );
}
