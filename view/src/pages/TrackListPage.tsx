import { useEffect, useState } from 'react';
import type { Track } from '../types';
import TrackTable from '../components/TrackTable';
import TrackCard from '../components/TrackCard';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import './TrackListPage.scss';

const API_URL = 'http://localhost:3001/tracks';
const PAGE_SIZE = 30;

function getDecades(tracks: Track[]): string[] {
  const years = Array.from(new Set(tracks.map((t) => t.release_year)));
  const decades = Array.from(new Set(years.map((y) => `${Math.floor(y / 10) * 10}s`)));
  return decades.sort();
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function TrackListPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [genre, setGenre] = useState('');
  const [decade, setDecade] = useState('');
  const [sort, setSort] = useState('release_year');
  const [selected, setSelected] = useState<Track | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [decades, setDecades] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const isMobile = useIsMobile();

  // Fetch genres and decades for filters (from first page only)
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?_page=1&_limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data: Track[]) => {
        setGenres(Array.from(new Set(data.map((t) => t.genre))).sort());
        setDecades(getDecades(data));
        setLoading(false);
      });
  }, []);

  // Fetch tracks with filters and pagination (reset on filter/search/sort)
  useEffect(() => {
    setLoading(true);
    setPage(1);
    let url = `${API_URL}?_page=1&_limit=${PAGE_SIZE}`;
    if (debouncedSearch) url += `&q=${encodeURIComponent(debouncedSearch)}`;
    if (genre) url += `&genre=${encodeURIComponent(genre)}`;
    if (decade) {
      const start = parseInt(decade.slice(0, 4));
      url += `&release_year_gte=${start}&release_year_lte=${start + 9}`;
    }
    if (sort) url += `&_sort=${sort}&_order=desc`;
    fetch(url, { method: 'GET' }).then(async (res) => {
      const data = await res.json();
      setTracks(data);
      setHasMore(data.length === PAGE_SIZE);
      setLoading(false);
    });
  }, [debouncedSearch, genre, decade, sort]);

  // Load more handler
  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    let url = `${API_URL}?_page=${nextPage}&_limit=${PAGE_SIZE}`;
    if (debouncedSearch) url += `&q=${encodeURIComponent(debouncedSearch)}`;
    if (genre) url += `&genre=${encodeURIComponent(genre)}`;
    if (decade) {
      const start = parseInt(decade.slice(0, 4));
      url += `&release_year_gte=${start}&release_year_lte=${start + 9}`;
    }
    if (sort) url += `&_sort=${sort}&_order=desc`;
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data: Track[]) => {
        setTracks((prev) => [...prev, ...data]);
        setPage(nextPage);
        setHasMore(data.length === PAGE_SIZE);
        setLoadingMore(false);
      });
  };

  if (loading && tracks.length === 0) return <Loader />;

  return (
    <div className='track-list-page'>
      <div className='controls'>
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          genres={genres}
          selectedGenre={genre}
          onGenreChange={setGenre}
          decades={decades}
          selectedDecade={decade}
          onDecadeChange={setDecade}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
      {isMobile ? (
        <div className='card-list grid gap-4'>
          {loading && tracks.length > 0 && <Loader />}
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <>
          {loading && tracks.length > 0 && <Loader />}
          <TrackTable tracks={tracks} onRowClick={setSelected} />
        </>
      )}
      {hasMore && (
        <button className='load-more' onClick={loadMore} disabled={loadingMore} style={{ margin: '2rem auto', display: 'block' }}>
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent showCloseButton>
          {selected && (
            <>
              <h2 className='font-bold text-lg mb-2' id='track-dialog-title'>
                {selected.track_name}
              </h2>
              <div id='track-dialog-desc'>
                <div className='mb-1'>Artist: {selected.artist}</div>
                <div className='mb-1'>Album: {selected.album_name}</div>
                <div className='mb-1'>Genre: {selected.genre}</div>
                <div className='mb-1'>Release Year: {selected.release_year}</div>
                <div className='mb-1'>Release Date: {selected.release_date}</div>
                <div>Rating: {selected.rating}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
