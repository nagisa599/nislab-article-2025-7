import React, { useState } from 'react';
import { Calendar, ExternalLink, Tag } from 'lucide-react';
import { Article } from '../types/Article';

interface CalendarDayProps {
  day: number;
  article?: Article;
  isCurrentMonth: boolean;
  isToday: boolean;
  isUnlocked: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  article,
  isCurrentMonth,
  isToday,
  isUnlocked
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (article && isUnlocked) {
      setIsExpanded(!isExpanded);
    }
  };

  const dayClasses = `
    relative group cursor-pointer transition-all duration-300 transform
    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
    ${isToday ? 'ring-2 ring-blue-500' : ''}
    ${isUnlocked && article ? 'hover:scale-102 hover:shadow-lg' : ''}
    ${!isUnlocked && article ? 'opacity-60' : ''}
  `;

  const cardClasses = `
    bg-white rounded-xl p-4 h-full border-2 transition-all duration-300
    ${article ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50' : 'border-gray-200'}
    ${isUnlocked && article ? 'hover:border-blue-300 hover:shadow-md' : ''}
    ${!isUnlocked && article ? 'bg-gray-50' : ''}
  `;

  return (
    <div className={dayClasses} onClick={handleClick}>
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </span>
        </div>
        
        {article && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                {article.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-6 h-6 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="text-xs text-gray-600 font-medium">{article.author}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {!isUnlocked && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 rounded-xl flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <Calendar className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {isExpanded && article && isUnlocked && (
        <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white rounded-xl shadow-xl border-2 border-blue-200 p-4 animate-in slide-in-from-top-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900">{article.title}</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(article.url, '_blank');
                }}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {article.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                <span className="text-sm text-gray-700 font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 text-gray-400" />
                <div className="flex gap-1">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;