import './Filters.scss';

interface FiltersProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  decades: string[];
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
}

export default function Filters({ genres, selectedGenre, onGenreChange, decades, selectedDecade, onDecadeChange, sort, onSortChange }: FiltersProps) {
  return (
    <div className="filters">
      <select value={selectedGenre} onChange={e => onGenreChange(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select value={selectedDecade} onChange={e => onDecadeChange(e.target.value)}>
        <option value="">All Decades</option>
        {decades.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select value={sort} onChange={e => onSortChange(e.target.value)}>
        <option value="release_year">Release Year</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}
