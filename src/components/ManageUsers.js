import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {

    const token = localStorage.getItem('token');

    // States for input field
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [age, setAge] = useState("");
    const [userList, setUserList] = useState("");
    const [deleteResult, setDeleteResult] = useState("");

    const fetchUsers = async () => {
        const userResult = await fetch('https://movie-collection-api-app.azurewebsites.net/api/access', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        // extracting json list
        var userListResults = await userResult.json();
        // console.log(userListResults);
        setUserList(userListResults);
    }

    useEffect(async () => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        // console.log(id);
        var userResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/${id}`, {
            method: "delete",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (userResult.status == 200) {
            fetchUsers();
            setDeleteResult("User deleted successfully.")
        }
    }

    return (
        <div className='movie-login-background'>
            <div className='admin-dashboard container'>
                {deleteResult && <p className="update-success">{deleteResult}</p>}
                <h1>Admin Dashboard</h1>
                <Link to="/admindashboard/adduser" className="new-movie-button">Click here to add New User</Link>
                <div className="movie-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl.No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Credit Card</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList ? userList.map((element, index) => {
                                // console.log(element);
                                return <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{element.firstName} {element.lastName}</td>
                                    <td>{element.email}</td>
                                    <td>{element.creditCard}</td>
                                    <td>{element.age}</td>
                                    <td>
                                        <div>
                                            <button><Link to={`/admindashboard/updateuser/${element.id}`}>Edit</Link></button>
                                            <button onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this user?")) {
                                                    deleteUser(element.id)
                                                }
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            }) : null
                            }
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;