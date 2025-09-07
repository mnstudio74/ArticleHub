import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false, onClick }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (featured) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => onClick(article)}
        className="cursor-pointer group"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="aspect-w-16 aspect-h-9 h-80 lg:h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="flex items-center space-x-1 text-sm">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-200 mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
                <div>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-sm text-gray-300">{formatDate(article.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-white/80">
                <button className="hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(article)}
      className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 h-48">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <span className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min</span>
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{article.author.name}</p>
              <p className="text-xs text-gray-500">{formatDate(article.publishedAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <button className="hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
