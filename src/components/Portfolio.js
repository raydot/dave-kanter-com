import React, { useState, useEffect, useMemo } from 'react'
import Image from './Image'
import projectsData from '../data/Projects.json'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Category color mapping
  const categoryColors = {
    'Multimedia': '#FF6B35',
    'Retail': '#4ECDC4', 
    'Frontend': '#3498DB',
    'Small Biz': '#9B59B6',
    'Mobile': '#E67E22',
    'Fullstack': '#27AE60',
    'Enterprise': '#8E44AD'
  }

  // Memoize projects to prevent recreation on every render
  const projects = useMemo(() => 
    projectsData.filter(project => project.lead === "true"), []
  )
  
  const categories = useMemo(() => 
    ['All', ...new Set(projects.flatMap(project => 
      Array.isArray(project.category) ? project.category : [project.category]
    ))], [projects]
  )

  useEffect(() => {
    const filtered = activeFilter === 'All' 
      ? projects 
      : projects.filter(project => 
          Array.isArray(project.category) 
            ? project.category.includes(activeFilter)
            : project.category === activeFilter
        )
    
    setFilteredProjects(filtered)
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100)
  }, [activeFilter, projects])

  const handleFilterChange = (category) => {
    setIsLoaded(false)
    setTimeout(() => {
      setActiveFilter(category)
    }, 150)
  }

  return (
    <div className="portfolio-container">
      {/* Filter Navigation */}
      <div className="portfolio-filters">
        <div className="filter-row">
          {categories.slice(0, 3).map((category, index) => (
            <button
              key={category}
              className={activeFilter === category ? 'active' : ''}
              onClick={() => handleFilterChange(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="filter-row">
          {categories.slice(3, 6).map((category, index) => (
            <button
              key={category}
              className={activeFilter === category ? 'active' : ''}
              onClick={() => handleFilterChange(category)}
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="filter-row">
          {categories.slice(6).map((category, index) => (
            <button
              key={category}
              className={activeFilter === category ? 'active' : ''}
              onClick={() => handleFilterChange(category)}
              style={{ animationDelay: `${(index + 6) * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="portfolio-grid">
        {filteredProjects.map((project, index) => 
          project.src !== 'null' ? (
            <div 
              key={`${project.title}-${project.year}`} 
              className={`portfolio-card ${isLoaded ? 'loaded' : ''} ${project.featured ? 'featured' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="card-content">
                <div className="project-image-container" style={{ backgroundColor: project.bgColor || 'black' }}>
                  <Image 
                    fileName={project.src} 
                    width={400} 
                    height={300} 
                    style={{ 
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto',
                      verticalAlign: 'top'
                    }} 
                    alt={project.alt} 
                  />
                </div>
                
                <div className="project-info">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                    <span className="project-year">{project.year}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-meta">
                    {Array.isArray(project.category) ? (
                      project.category.map((cat) => (
                        <span 
                          key={cat}
                          className="project-category" 
                          style={{ backgroundColor: categoryColors[cat] }}
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="project-category" style={{ backgroundColor: categoryColors[project.category] }}>
                        {project.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="tech-details">
                    <div className="tech-tags">
                      {project.technologies.map((tech, techIndex) => (
                        <React.Fragment key={tech}>
                          <span 
                            className="tech-tag"
                            style={{ animationDelay: `${techIndex * 0.05}s` }}
                          >
                            {tech}
                          </span>
                          {techIndex < project.technologies.length - 1 && (
                            <span className="tech-separator">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              key={`${project.title}-${project.year}`} 
              className={`portfolio-card no-image ${isLoaded ? 'loaded' : ''} ${project.featured ? 'featured' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="card-content">
                <div className="no-image-placeholder">
                  <div className="placeholder-icon">
                    <span>🚀</span>
                  </div>
                </div>
                
                <div className="project-info">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                    <span className="project-year">{project.year}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-meta">
                    {Array.isArray(project.category) ? (
                      project.category.map((cat) => (
                        <span 
                          key={cat}
                          className="project-category" 
                          style={{ backgroundColor: categoryColors[cat] }}
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="project-category" style={{ backgroundColor: categoryColors[project.category] }}>
                        {project.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="tech-details">
                    <div className="tech-tags">
                      {project.technologies.map((tech, techIndex) => (
                        <React.Fragment key={tech}>
                          <span 
                            className="tech-tag"
                            style={{ animationDelay: `${techIndex * 0.05}s` }}
                          >
                            {tech}
                          </span>
                          {techIndex < project.technologies.length - 1 && (
                            <span className="tech-separator">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <style jsx>{`
        .portfolio-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .portfolio-filters {
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
        }

        .filter-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .filter-row:last-child {
          margin-bottom: 0;
        }

        .filter-row button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border: 0;
          background: transparent;
          color: #ffffff;
          cursor: pointer;
          font-family: "Source Sans Pro", sans-serif;
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.2rem;
          text-transform: uppercase;
          text-decoration: none;
          transition: background-color 0.2s ease-in-out;
          opacity: 0;
          animation: slideInDown 0.4s ease-out forwards;
          position: relative;
          white-space: nowrap;
        }

        .filter-row button:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 1.5rem;
          background: #ffffff;
        }

        .filter-row button.active {
          color: white;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          justify-content: center;
          gap: 1rem;
          perspective: 1000px;
          align-items: start;
        }

        @media (min-width: 768px) {
          .portfolio-grid {
            gap: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .portfolio-grid {
            // justify-content: space-between;
            gap: 2rem;
          }
        }

        .portfolio-card {
          position: relative;
          height: auto;
          width: 100%;
          max-width: 500px;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.3s ease;
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          }
          .portfolio-card {
            max-width: 550px;
          }
        }

        .portfolio-card.loaded {
          opacity: 1;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          text-align: left;
          border-radius: 8px;
          background: rgba(27, 31, 34, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }


        .portfolio-card:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .project-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
          flex-shrink: 0;
          border-radius: 4px;
          padding: 0;
          margin: 0;
          line-height: 0;
        }



        .no-image-placeholder {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #666;
          position: relative;
          overflow: hidden;
        }

        .no-image-placeholder::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }

        .placeholder-icon {
          font-size: 3rem;
          opacity: 0.8;
        }

        .project-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.5rem;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .project-title {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          text-align: left;
          flex: 1;
        }

        .project-year {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          font-weight: 300;
          margin-left: 1rem;
        }

        .project-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          text-align: left;
        }

        .project-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .project-category {
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 15px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
        }


        .tech-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .tech-tag {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .tech-separator {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
          margin: 0 0.25rem;
        }

        .project-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .stat {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-label {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 736px) {
          .portfolio-filters > ul li button {
            font-size: 0.9rem;
            padding: 0.5rem 0;
          }
        }

        @media (max-width: 480px) {
          .portfolio-filters > ul {
            flex-direction: column;
            min-width: 10rem;
            max-width: 100%;
          }
          
          .portfolio-filters > ul li {
            border-left: 0;
            border-top: 0;
          }
          
          .portfolio-filters > ul li:first-child {
            border-top: 0;
          }
          
          .portfolio-filters > ul li button {
            height: 3rem;
            line-height: 3rem;
            min-width: 0;
            width: 100%;
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          // .portfolio-card {
          //   height: 400px;
          // }
          
          .project-info {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Portfolio
