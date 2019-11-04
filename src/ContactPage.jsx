import React, {PureComponent} from 'react';
import Page from './Page';
import './ContactPage.css';


class ContactPage extends PureComponent {
  render() {
    return (
      <Page page="contact" {...this.props}>
        <h2>Hit me up!</h2>
        <p>
          <a href="mailto:laxels@gmail.com">laxels@gmail.com</a>
          <br/>
          Preferred method of contact
        </p>
        <p>
          <a href="tel:+17132932448">(713)-293-2448</a>
          <br/>
          I'll try my best to answer, but don't get discouraged if I don't pick up. I get a lot of spam calls. :/
        </p>
      </Page>
    );
  }
}


export default ContactPage;
