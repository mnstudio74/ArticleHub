import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          
          {/* Modal */}
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header Image */}
                <div className="aspect-w-16 aspect-h-9 h-80">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Article Content */}
                <div className="p-8">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min read</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {article.title}
                  </h1>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{article.author.name}</h3>
                      <p className="text-gray-600 mb-2">{article.author.bio}</p>
                      <p className="text-sm text-gray-500">Published on {formatDate(article.publishedAt)}</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      Follow
                    </button>
                  </div>

                  {/* Article Body */}
                  <div className="prose max-w-none">
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="text-gray-800 leading-relaxed space-y-6">
                      {article.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Bar */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span>246</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>23</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;
