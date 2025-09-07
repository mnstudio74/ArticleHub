import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Github, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Mobile App']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Guidelines', 'Terms', 'Privacy']
    },
    {
      title: 'Community',
      links: ['Writers', 'Publishers', 'Events', 'Partners']
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Github, href: '#', color: 'hover:text-gray-900' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Mail, href: '#', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">ArticleHub</span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              The world's most beautiful publishing platform where writers and readers connect 
              through amazing stories and insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-12 mb-8">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay updated
              </h3>
              <p className="text-gray-400">
                Get the latest articles and insights delivered to your inbox.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 ArticleHub. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by the ArticleHub team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
