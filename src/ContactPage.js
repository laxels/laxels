import React, { PureComponent } from 'react';
import Page from './Page';
import './ContactPage.css';
import fbIcon from './img/fb-icon.svg';
import liIcon from './img/li-icon.svg';


class ContactPage extends PureComponent {
  render() {
    return (
      <Page page="contact" {...this.props}>
        <h2>Hit me up!</h2>
        <p>
          <a href="mailto:laxels@gmail.com">laxels@gmail.com</a>
          <br />
          Preferred method of contact
        </p>
        <p>
          <a href="tel:+17132932448">(713)-293-2448</a>
          <br />
          I'll try my best to answer, but don't get discouraged if I don't pick up. I get a lot of spam calls. :/
        </p>

        <h2>Social Media</h2>
        <p>
          <a
            href="https://www.facebook.com/laxels"
            target="_blank"
            rel="noopener noreferrer"
            className="social-media facebook"
          >
            <img src={fbIcon} alt="Facebook" />
          </a>
          <a
            href="https://www.linkedin.com/in/axelsetyanto"
            target="_blank"
            rel="noopener noreferrer"
            className="social-media linkedin"
          >
            <img src={liIcon} alt="LinkedIn" />
          </a>
        </p>
      </Page>
    );
  }
}


export default ContactPage;
