export interface Track {
  id: number;
  track_name: string;
  artist: string;
  album_name: string;
  genre: string;
  release_year: number;
  release_date: string;
  rating: number;
  [key: string]: unknown;
}
