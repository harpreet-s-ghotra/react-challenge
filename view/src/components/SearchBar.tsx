import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search by track, artist, or album..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
