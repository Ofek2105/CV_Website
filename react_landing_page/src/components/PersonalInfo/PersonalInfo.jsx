import myImage from '../../assets/my_image.jpeg';
import './PersonalInfo.css';
import {
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

const PersonalInfo = () => {
  return (
    <div className="section-container">
      <div className='image-info'>
        <img
          src={myImage}
          alt="Profile"
          className="profile-image"
        />
        <h3>Ofek Nourian</h3>
        <h4>M.Sc. Electrical & Computer Engineer</h4>
        <h4>Machine Learning Engineer & Team Leader</h4>

        <div className="links">
            {/* <a href="https://drive.google.com/your-cv-link" target="_blank" rel="noopener noreferrer">
              📄 Download CV
            </a> */}
            <a href="https://github.com/Ofek2105" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/ofek-nourian-31b814164" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>

        </div>

    </div>
  );
};

export default PersonalInfo;
