import React from 'react';
import {Form, Text } from 'react-form';


class DetailedSignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      foundInDB: null
    }
  }

  checkDBforAccount(){
    //some promise
    //some db query
    //return boolean?
  }


  onSubmit(){
    checkDBforAccount();
  }


     render() {
      return (
        <div>
          <Form onSubmit={submittedValues => this.setState( { submittedValues } )}>
            { formApi => (
              <form onSubmit={formApi.submitForm} id="form2">
                <label htmlFor="firstName">First name</label>
                <Text field="firstName" id="firstName" />
                <label htmlFor="lastName">Last name</label>
                <Text field="lastName" id="lastName" />
                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            )}
          </Form>
        </div>
      );
    }
}

export default DetailedSignUp;


