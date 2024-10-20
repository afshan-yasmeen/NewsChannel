import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, publishedAt, author, source } = this.props;
    return (
      <div 
        className="card" 
        style={{ 
          position: "relative", 
          border: "none", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          transition: "transform 0.2s ease" 
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <span 
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            display: "inline-block",
            backgroundColor: "black",
            color: "white",
            fontSize: "0.85rem",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textAlign: "center",
            transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = "maroon"; // Change to maroon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "black"; // Reset to black when not hovered
          }}
        >
          {source}
        </span>
        <img 
          className="card-img-top" 
          src={imageUrl} 
          onError={(e) => { e.target.src = "fallback.jpg" }} 
          alt="Card cap" 
          height={200} 
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">By {author} at {publishedAt}</p>
          <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    )
  }
  
  
}

export default NewsItem
