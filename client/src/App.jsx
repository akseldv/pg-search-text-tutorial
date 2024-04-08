import React, { useState } from 'react'

const App = () => {

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const onSubmitForm = async(e) => {

    e.preventDefault();

    try {

      const response = await fetch(`http://localhost:5000/users/?name=${name}`);

      const parseResponse = await response.json();

      console.log(parseResponse);

      setUsers(parseResponse);
      
    } catch (err) {

      console.error(err.message);
      
    }

  }

  return (
    <>

      <div className='container text-center'>

      <h1 className='my-5'>Party List</h1>

      <form className='d-flex' onSubmit={onSubmitForm}>
        <input type="text" name="name" placeholder='Enter user...' value={name} onChange={e => setName(e.target.value)} className='form-control'/>
        <button className='btn btn-success' onSubmit={onSubmitForm}>Submit</button>
      </form>

      <table className='table my-5'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (

              <tr key={user.user_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>

            ))
          }
        </tbody>
      </table>
      {users.length === 0 && <p>No Results Found</p>}
      </div>

    </>
  )
}

export default App