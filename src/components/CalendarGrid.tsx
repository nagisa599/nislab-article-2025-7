import React from "react";
import CalendarDay from "./CalendarDay";
import { Article } from "../types/Article";

interface CalendarGridProps {
  articles: Article[];
  currentDate: Date;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  articles,
  currentDate,
}) => {
  const year = 2025;
  const month = 6; // July (0-indexed)

  // Create a map of articles by day
  const articlesByDay = articles.reduce((acc, article) => {
    const day = parseInt(article.publishDate.split("-")[2]);
    acc[day] = article;
    return acc;
  }, {} as Record<number, Article>);

  // Get the first day of July 2025 (Tuesday = 2)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculate previous month days to show
  const prevMonthDays = new Date(year, month, 0).getDate();
  const startingDayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Make Monday = 0

  const days = [];

  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      isToday: false,
      article: undefined,
      isUnlocked: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const articleDate = new Date(year, month, day);
    const isToday = articleDate.toDateString() === currentDate.toDateString();
    const isUnlocked = articleDate <= currentDate;

    days.push({
      day,
      isCurrentMonth: true,
      isToday,
      article: articlesByDay[day],
      isUnlocked,
    });
  }

  // Next month days to fill the grid
  const remainingDays = 35 - days.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      article: undefined,
      isUnlocked: false,
    });
  }

  const weekdays = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayData, index) => (
          <div key={index} className="aspect-square">
            <CalendarDay
              day={dayData.day}
              article={dayData.article}
              isCurrentMonth={dayData.isCurrentMonth}
              isToday={dayData.isToday}
              isUnlocked={dayData.isUnlocked}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
