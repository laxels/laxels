import React, { PureComponent } from 'react';
import Page from './Page';


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
          May not be consistently available
        </p>
      </Page>
    );
  }
}


export default ContactPage;
