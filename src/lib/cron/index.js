const cron = require('node-cron');
const { db } = require('../firebase');
const { notifyBlogAdded, notifyNewsAdded } = require('../websocket/server');
const fetch = require('node-fetch');

// Content auto-generation and sync system
class ContentManager {
  constructor() {
    this.newsAPISources = [
      'https://newsapi.org/v2/everything?q=tax&apiKey=' + process.env.NEWS_API_KEY,
      'https://rss.cnn.com/rss/money_taxes.rss',
    ];
  }

  // Fetch latest tax news and update database
  async syncNewsFromAPI() {
    try {
      console.log('🔄 Syncing news from external APIs...');
      
      for (const source of this.newsAPISources) {
        const response = await fetch(source);
        const data = await response.json();
        
        if (data.articles) {
          for (const article of data.articles.slice(0, 5)) { // Only take latest 5
            await this.createNewsPost({
              title: article.title,
              content: article.description || article.content,
              source: article.source.name,
              url: article.url,
              publishedAt: new Date(article.publishedAt),
              category: 'Tax News'
            });
          }
        }
      }
      
      console.log('✅ News sync completed');
    } catch (error) {
      console.error('❌ Error syncing news:', error);
    }
  }

  // Create new news post
  async createNewsPost(newsData) {
    try {
      const newsRef = db.collection('news');
      
      // Check if news already exists
      const existingNews = await newsRef
        .where('title', '==', newsData.title)
        .limit(1)
        .get();
      
      if (existingNews.empty) {
        const newNews = await newsRef.add({
          ...newsData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        // Notify clients about new news
        const newsWithId = { id: newNews.id, ...newsData };
        notifyNewsAdded(newsWithId);
        
        console.log('📰 New news post created:', newsData.title);
        return newsWithId;
      }
    } catch (error) {
      console.error('Error creating news post:', error);
    }
  }

  // Auto-generate blog content based on trending topics
  async generateBlogContent() {
    try {
      console.log('✍️ Generating blog content...');
      
      const trendingTopics = [
        'Tax Planning Strategies for 2024',
        'Small Business Tax Deductions',
        'Cryptocurrency Tax Implications',
        'Tax Benefits for Remote Workers',
        'Estate Planning and Tax Optimization'
      ];
      
      const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];
      
      const blogPost = {
        title: randomTopic,
        content: await this.generateContentForTopic(randomTopic),
        excerpt: `Comprehensive guide to ${randomTopic.toLowerCase()}`,
        slug: randomTopic.toLowerCase().replace(/\s+/g, '-'),
        author: 'TaxAdvisor AI',
        category: 'Tax Planning',
        tags: ['tax', 'planning', 'finance'],
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0,
        readTime: Math.floor(Math.random() * 10) + 3 // 3-12 minutes
      };
      
      const blogRef = db.collection('blogs');
      const newBlog = await blogRef.add(blogPost);
      
      const blogWithId = { id: newBlog.id, ...blogPost };
      notifyBlogAdded(blogWithId);
      
      console.log('📝 New blog post generated:', blogPost.title);
      return blogWithId;
    } catch (error) {
      console.error('Error generating blog content:', error);
    }
  }

  // Generate content for a specific topic (placeholder - integrate with AI service)
  async generateContentForTopic(topic) {
    // This would integrate with an AI service like OpenAI GPT
    return `
# ${topic}

In the evolving landscape of tax regulations, understanding ${topic.toLowerCase()} has become crucial for individuals and businesses alike.

## Key Points

- Comprehensive analysis of current regulations
- Practical implementation strategies
- Common pitfalls to avoid
- Expert recommendations

## Conclusion

By following these guidelines and staying informed about the latest developments, you can optimize your tax strategy effectively.

*This content is generated for educational purposes. Please consult with a qualified tax professional for personalized advice.*
    `.trim();
  }

  // Clean up old data to maintain performance
  async cleanupOldData() {
    try {
      console.log('🧹 Cleaning up old data...');
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      // Clean up old news (keep only last 30 days)
      const oldNews = await db.collection('news')
        .where('createdAt', '<', thirtyDaysAgo)
        .get();
      
      const batch = db.batch();
      oldNews.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`🗑️ Cleaned up ${oldNews.size} old news items`);
    } catch (error) {
      console.error('Error cleaning up data:', error);
    }
  }

  // Update blog view counts and trending metrics
  async updateMetrics() {
    try {
      console.log('📊 Updating content metrics...');
      
      const blogs = await db.collection('blogs').get();
      const batch = db.batch();
      
      blogs.docs.forEach(doc => {
        const currentData = doc.data();
        // Simulate view count updates (in real app, this would come from analytics)
        const newViewCount = currentData.viewCount + Math.floor(Math.random() * 10);
        
        batch.update(doc.ref, {
          viewCount: newViewCount,
          updatedAt: new Date()
        });
      });
      
      await batch.commit();
      console.log('📈 Metrics updated successfully');
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  }
}

// Initialize content manager
const contentManager = new ContentManager();

// Schedule jobs
const initializeCronJobs = () => {
  // Sync news every 2 hours
  cron.schedule('0 */2 * * *', () => {
    contentManager.syncNewsFromAPI();
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  // Generate new blog content daily at 9 AM
  cron.schedule('0 9 * * *', () => {
    contentManager.generateBlogContent();
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  // Update metrics every hour
  cron.schedule('0 * * * *', () => {
    contentManager.updateMetrics();
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  // Clean up old data weekly (Sundays at 2 AM)
  cron.schedule('0 2 * * 0', () => {
    contentManager.cleanupOldData();
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  console.log('🚀 Cron jobs initialized successfully');
  console.log('📅 News sync: Every 2 hours');
  console.log('📝 Blog generation: Daily at 9 AM');
  console.log('📊 Metrics update: Every hour');
  console.log('🧹 Data cleanup: Weekly (Sundays at 2 AM)');
};

module.exports = {
  ContentManager,
  initializeCronJobs
};
