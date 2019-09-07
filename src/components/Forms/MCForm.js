import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class EmailForm extends React.Component {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:
  state = {
    email: null,
}
  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).
  _handleChange = (e) => {
    console.log({
        [`${e.target.name}`]: e.target.value,
    });
    this.setState({
        [`${e.target.name}`]: e.target.value,
    });
}
  // 1. via `.then`
  _handleSubmit = e => {
    e.preventDefault();

    console.log('submit', this.state);

    addToMailchimp(this.state.email, this.state) // listFields are optional if you are only capturing the email address.
    .then(({ msg, result }) => {
      // I recommend setting data to React state
      // but you can do whatever you want (including ignoring this `then()` altogether)
      console.log('msg', `${result}: ${msg}`);

    
    if (result !== 'success') {
                    throw msg;
                }
                alert(msg);
            })
            .catch((err) => {
                console.log('err', err);
                alert(err);
            });
    }

  render () {
    return (
    <div>
      <h3>Want to learn more about data analysis?</h3>
      <p>Sign up for our weekly(ish) newsletter with straight talking interviews, stories, lessons and tips 
        to really superpower your data analyst career.
      </p>
      <form onSubmit={this._handleSubmit}>
  
	    <input type="email" onChange={this._handleChange} placeholder="Email" size="35" name="email" />
      <br /><br />
      <button type="submit" name="submit" class="button" id="submit">Sign me up!</button>

      </form>
      </div>
    )
  }
}