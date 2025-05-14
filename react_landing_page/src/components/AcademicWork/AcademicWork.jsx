import React from 'react';
import './AcademicWork.css';

const projects = [
  {
    title: 'A Novel Approach for Plant Root-Hair Counting and Its Improvement via Image Super-Resolution',
    date: '2024',
    journal: 'IEEE Transactions on AgriFood Electronics',
    shortInfo: '',
  },
  {
    title: 'plant root analysis using multi-image superesolution',
    date: '2025',
    journal: 'IEEE Transactions on AgriFood Electronics',
    shortInfo: '',
  },
  {
    title: 'Root Hair Segmentation Using synthetically generated dataset',
    date: '2025',
    journal: 'IEEE Transactions on AgriFood Electronics',
    shortInfo: '',
  }
];

const AcademicWork = () => {
  return (
    <div className="academic-work">
      <h2 className="section-title">Academic Work</h2>
      <ul className="projects-list">
        {projects.map((project, index) => (
          <li className="project-entry" key={index}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-meta">
              <em>{project.journal}</em>, {project.date}
            </p>
            <p className="project-short">{project.shortInfo}</p>
            {/* <p className="project-description">{project.description}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicWork;
