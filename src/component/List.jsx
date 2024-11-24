
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../apiConfig';

const List = () => {

    const [ registrationList, setRegistrationList ] = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {
        try {

            const response = await axios.get(API_ENDPOINTS.LIST_USERS);
            if(response.data.success) {
                setRegistrationList(response.data.user_list);
            }
            
        } catch (error) {
            console.log("Something went to wrong", error);
        }
    }
    
    return (
        <>
            <h1>Registration List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    { registrationList.map((row, index) => (
                            <tr key={index}>
                                <td>{ row.name }</td>
                                <td>{ row.email }</td>
                                <td>{ row.mobile }</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default List;
