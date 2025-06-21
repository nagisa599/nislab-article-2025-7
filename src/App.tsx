import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import StatsCard from "./components/StatsCard";
import { useCalendar } from "./hooks/useCalendar";

function App() {
  const {
    searchQuery,
    selectedTags,
    currentDate,
    availableTags,
    filteredArticles,
    handleSearchChange,
    handleTagToggle,
  } = useCalendar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <CalendarHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={availableTags}
        />

        <StatsCard articles={filteredArticles} currentDate={currentDate} />

        <CalendarGrid articles={filteredArticles} currentDate={currentDate} />

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Zenn Articles Advent Calendar 2025 - Built with React & Vite
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
