import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import Footer from './components/Footer';
import { articles, featuredArticles } from './data/mockData';
import { Article } from './types/Article';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
      
      {!searchQuery && !selectedCategory && (
        <>
          <Hero />
          <CategoryGrid onCategorySelect={handleCategorySelect} />
        </>
      )}

      {/* Results Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-12">
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-gray-600">
                  Found {filteredArticles.length} articles
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}

            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedCategory} Articles
                </h2>
                <p className="text-gray-600">
                  {filteredArticles.length} articles in this category
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View all articles
                </button>
              </motion.div>
            )}

            {!searchQuery && !selectedCategory && (
              <>
                {/* Featured Articles */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredArticles.slice(0, 2).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        featured={true}
                        onClick={handleArticleClick}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Latest Articles
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover fresh insights and perspectives from our community of writers.
                  </p>
                </motion.div>
              </>
            )}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard
                  article={article}
                  onClick={handleArticleClick}
                />
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (searchQuery || selectedCategory) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse all articles.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Articles
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />

      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
