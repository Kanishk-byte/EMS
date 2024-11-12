// import React, { useState } from 'react'
// import { setLocalStorage } from '../../utils/localStorage'

// const Header = (props) => {

//   // const [username, setUsername] = useState('')

//   // if(!data){
//   //   setUsername('Admin')
//   // }else{
//   //   setUsername(data.firstName)
//   // }

//   const logOutUser = ()=>{
//     localStorage.setItem('loggedInUser','')
//     props.changeUser('')
//     // window.location.reload()
//   }

  
//   return (
//     <div className='flex items-end justify-between'>
//         <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{data.firstName} 👋</span></h1>
//         <button onClick={logOutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
//     </div>
//   )
// }

// export default Header










import React, { useState, useEffect } from 'react'
import { getLocalStorage } from '../../utils/localStorage'

const Header = (props) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("Logged In User from Local Storage:", loggedInUser);

    // Fetch employees data from getLocalStorage
    const { employees } = getLocalStorage();
    console.log("Employees Data:", employees);

    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        setUsername('Admin');
      } else if (loggedInUser.role === 'employee') {
        // Find the employee by email or another unique identifier
        const employee = employees.find(e => e.email === loggedInUser.email);
        if (employee) {
          setUsername(employee.firstName);
        } else {
          console.log("Employee not found with the given email in local storage.");
        }
      }
    } else {
      console.log("No logged-in user found.");
    }
  }, []);

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '');
    props.changeUser('');
  };

  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-2xl font-medium'>
        Hello <br /> <span className='text-3xl font-semibold'>{username} 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>
        Log Out
      </button>
    </div>
  );
};

export default Header;

