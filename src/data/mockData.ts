import { faker } from '@faker-js/faker';
import { Article, Category } from '../types/Article';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    description: 'Latest trends in tech and innovation',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    name: 'Design',
    description: 'UI/UX, visual design, and creativity',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    name: 'Business',
    description: 'Entrepreneurship and business insights',
    icon: '💼',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: '4',
    name: 'Lifestyle',
    description: 'Health, wellness, and life tips',
    icon: '🌟',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: '5',
    name: 'Science',
    description: 'Scientific discoveries and research',
    icon: '🔬',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: '6',
    name: 'Travel',
    description: 'Destinations and travel experiences',
    icon: '✈️',
    color: 'from-red-500 to-pink-500'
  }
];

const generateArticles = (): Article[] => {
  const articles: Article[] = [];
  
  for (let i = 0; i < 24; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const publishedAt = faker.date.recent({ days: 30 });
    
    articles.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 4, max: 8 }).slice(0, -1),
      excerpt: faker.lorem.paragraph({ min: 2, max: 3 }),
      content: faker.lorem.paragraphs(8, '\n\n'),
      author: {
        name: faker.person.fullName(),
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=100&h=100&fit=crop&crop=face`,
        bio: faker.lorem.sentence()
      },
      category: category.name,
      tags: faker.lorem.words(3).split(' '),
      publishedAt,
      readTime: faker.number.int({ min: 2, max: 12 }),
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=400&fit=crop`,
      featured: Math.random() < 0.2
    });
  }
  
  return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};

export const articles = generateArticles();
export const featuredArticles = articles.filter(article => article.featured);
