import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleAddUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email };
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log('inside post response', data))
    }

    return (
        <>
            <h1>Users Managment System</h1>
            <h2>Total Users: {users.length}</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" id="" />
                <br />
                <input type="email" name="email" id="" />
                <br />
                <input type="submit" value="Add User" />

            </form>
            <p>
                {users.map(user => (
                    <li key={user.id}>{user.id} {user.name} {user.email}</li>
                ))}
            </p>
        </>
    )
}

export default App
