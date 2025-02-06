import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`} style={styles.card}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`card-content ${className}`} style={styles.content}>{children}</div>;
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    width: '100%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  content: {
    padding: '16px',
  },
};

export { Card, CardContent };
