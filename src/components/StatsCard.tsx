import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import { Article } from '../types/Article';

interface StatsCardProps {
  articles: Article[];
  currentDate: Date;
}

const StatsCard: React.FC<StatsCardProps> = ({ articles, currentDate }) => {
  const totalArticles = articles.length;
  const uniqueAuthors = [...new Set(articles.map(article => article.author))].length;
  
  const unlockedArticles = articles.filter(article => {
    const articleDate = new Date(article.publishDate);
    return articleDate <= currentDate;
  }).length;

  const progressPercentage = Math.round((unlockedArticles / totalArticles) * 100);

  const stats = [
    {
      icon: BookOpen,
      label: '総記事数',
      value: totalArticles,
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: '執筆者数',
      value: uniqueAuthors,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
      
      <div className="md:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">アドベントカレンダー進捗</h3>
          <span className="text-2xl font-bold">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-blue-100 mt-2">
          {unlockedArticles} / {totalArticles} 記事が公開されました
        </p>
      </div>
    </div>
  );
};

export default StatsCard;