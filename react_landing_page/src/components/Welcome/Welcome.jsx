import React from 'react';
import myImage from '../../assets/my_image.jpeg';
import './Welcome.css';

import {
  FaPython,
  FaDocker,
  FaLinux,
  FaGithub,
  FaLinkedin,
  FaGithubSquare
} from 'react-icons/fa';
import { SiPytorch, SiProxmox } from 'react-icons/si';

const Welcome = () => {
  return (
    <section className="welcome">
      <div className="welcome-container">
        <div className='image-info'>
        <img
          src={myImage}
          alt="Profile"
          className="profile-image"
        />
        <h3>Ofek Nourian</h3>
        <h4>M.Sc. Electrical Enineering</h4>
        <h4>AI Engineer & Team Leader</h4>
        </div>
        <div className="text-content">
          {/* <h1 className="name">My name Ofek Nourian</h1> */}
          <h1 className="name">Thanks for stopping by!</h1>
          <p className="personal-info">
          This site runs on coffee, code, and late-night ideas.</p>
            <p className="technical-info">My technical background includes:</p>
            <div className="skill-boxes">
            {[
                'Deep Learning',
                'Reinforcement Learning',
                'LLMs',
                'Object Detection',
                'GANs',
                'Signal Processing',
                'Embedded Systems',
                'Networks',
                'Real-Time Systems',
                'Computer Vision',
                'Research',
                'LaTex',
                '&More'
            ].map((skill) => (
                <div key={skill} className="skill-box">
                {skill}
                </div>
            ))}
            </div>
          <div className="tech-stack">
            <h3>Main Tech Stack</h3>
            <div className="icons">
              <FaPython title="Python" />
              <SiPytorch title="PyTorch" />
              <SiProxmox title="Proxmox" />
              <FaDocker title="Docker" />
              <FaLinux title="Linux" />
              <FaGithubSquare title="Git" />
            </div>
          </div>
          <div className="links">
            {/* <a href="https://drive.google.com/your-cv-link" target="_blank" rel="noopener noreferrer">
              📄 Download CV
            </a> */}
            {/* <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a> */}
            <a href="https://www.linkedin.com/in/ofek-nourian-31b814164" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
