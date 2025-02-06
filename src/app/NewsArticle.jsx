import React from 'react';
import './NewsArticle.css';

const NewsArticle = ({ title, author, date, imageUrl, content }) => (
  <article className="news-article">
    <header className="article-header">
      <h3>{title}</h3>
      <p className="author-date">
        <strong>By {author}</strong> | <span>{date}</span>
      </p>
    </header>
    {imageUrl && <img src={imageUrl} alt="Article" className="article-image" />}
    <div className="article-content">{content}</div>
    <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
      Read full article
    </a>
  </article>
);

export default NewsArticle;
