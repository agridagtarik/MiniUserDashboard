import "../styles/globals.css";
export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Ara..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
  );
}
