
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
      <div className="welcome-container">
        
        <div className="text-content">
          {/* <h1 className="name">My name Ofek Nourian</h1> */}
          <h1 className="name">Thanks for stopping by!</h1>
          
            <p className="technical-info">My technical background includes:</p>
            <div className="skill-belt-wrapper">
              <div className="skill-belt">
                {[
                  'Deep Learning',
                  'Reinforcement Learning',
                  'LLMs',
                  'Object Detection',
                  'GANs',
                  'Signal Processing',
                  'Embedded Systems',
                  'Machine Learning',
                  'Networks',
                  'Real-Time Systems',
                  'Computer Vision',
                  'Academic Research',
                ].map((skill, index) => (
                  <div key={index} className="skill-box">
                    {skill}
                  </div>
                ))}
              </div>
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

          <p className="personal-info">
          "Working hard to make machines smarter—so I can be lazier"</p>

        </div>
      </div>

  );
};

export default Welcome;
