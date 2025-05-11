import './Banner.css'
import bannerImage from '../../assets/banner.png'

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Presenting" className="banner-img" />
      <div className="banner-text">
        <h2>Hi, I'm [Your Name]</h2>
        <p>I build intelligent systems and craft elegant solutions.</p>
      </div>
    </div>
  )
}

export default Banner
