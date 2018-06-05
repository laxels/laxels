import React, { PureComponent } from 'react';
import Page from './Page';
import fbIcon from './img/fb-icon.svg';
import liIcon from './img/li-icon.svg';
import utLogo from './img/ut-logo.png';
import lokuLogo from './img/loku-logo.webp';
import crowdmedLogo from './img/crowdmed-logo.png';
import pixelkeetLogo from './img/pixelkeet-logo.jpg';
import './AboutPage.css';


class AboutPage extends PureComponent {
  render() {
    return (
      <Page page="about" {...this.props}>
        <p>
          Hi there! I'm a full-stack web developer who loves making apps as fun, pretty, and bug-free as I am. :P
        </p>

        <h2>Career Timeline</h2>
        <p>Hover or tap on the icons for details!</p>
        <div className="timeline">
          <div className="timeline-sec">
            <div className="sec-fill ut"/>
          </div>
          <div className="timeline-sec">
            <div className="sec-fill ut half"/>
            <div className="sec-fill loku half"/>
          </div>
          <div className="timeline-sec">
            <div className="sec-fill ut"/>
          </div>
          <div className="timeline-sec">
            <div className="sec-fill crowdmed"/>
          </div>
          <div className="timeline-sec">
            <div className="sec-fill pixelkeet"/>
          </div>
          <div className="timeline-labels">
            <div className="timeline-label top-label">
              <img src={utLogo} alt="University of Texas at Austin logo"/>
              <div className="text">
                <span>BS Computer Science</span>
                <span>@ UT Austin (2010-2012)</span>
              </div>
              <div className="tick ut"/>
            </div>
            <div className="timeline-label">
              <img src={lokuLogo} alt="Loku logo"/>
              <div className="text">
                <span>Software Engineer</span>
                <span>@ Loku (2011-2012)</span>
              </div>
              <div className="tick loku"/>
            </div>
            <div className="timeline-label">
              <img src={crowdmedLogo} alt="CrowdMed logo"/>
              <div className="text">
                <span>Technical Co-Founder</span>
                <span>& Lead Developer</span>
                <span>@ CrowdMed (2012-2016)</span>
              </div>
              <div className="tick crowdmed"/>
            </div>
            <div className="timeline-label">
              <img src={pixelkeetLogo} alt="Pixelkeet logo"/>
              <div className="text">
                <span>Freelance Developer</span>
                <span>@ Pixelkeet (2016+)</span>
              </div>
              <div className="tick pixelkeet"/>
            </div>
          </div>
        </div>

        <h2>Experience</h2>
        <p>Front-end frameworks: React, Angular, Backbone</p>
        <p>Back-end frameworks: Node.js, Django</p>
        <p>Databases: PostgreSQL, MySQL, MongoDB</p>
        <p>Services: AWS, Heroku, etc.</p>
        <p>Misc: Redis, ElasticSearch, etc.</p>
        <p>Languages: JavaScript, Python, Java, Haskell</p>

        <h2>Education</h2>
        <p>Computer Science (Turing Scholar) @ University of Texas at Austin (2010-2012)</p>

        <h2>Other Stuff</h2>
        <p>
          My hobbies include:
          <br/>
          - Attending concerts/festivals
          <br/>
          - Karaoke/clubbing with friends
          <br/>
          - Video games/TV
          <br/>
          - Stuffing myself
          <br/>
          - Long walks with music
        </p>

        <h2>Social Media</h2>
        <p>
          <a href="https://www.facebook.com/laxels" target="_blank" rel="noopener noreferrer" className="social-media facebook">
            <img src={fbIcon} alt="Facebook"/>
          </a>
          <a href="https://www.linkedin.com/in/axelsetyanto" target="_blank" rel="noopener noreferrer" className="social-media linkedin">
            <img src={liIcon} alt="LinkedIn"/>
          </a>
        </p>
      </Page>
    );
  }
}


export default AboutPage;
