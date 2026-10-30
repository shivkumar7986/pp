import React from 'react'
import { FormBuilder } from '@formio/react';
const Formio = () => {
  return (
    <div>
        <FormBuilder form={{
        display: 'form',
        components: [
        {
          "label": "Email",
          "tableView": true,
          "key": "email",
          "type": "email",
          "input": true
        },
        {
          "label": "Password",
          "tableView": false,
          "key": "password",
          "type": "password",
          "input": true,
          "protected": true
        },
        ]
        }}/>
        </div>
  )
}

export default Formio