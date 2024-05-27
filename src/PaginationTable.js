import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PaginationTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
            </table>
            <tbody>
                {
                    currentRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.name}</td>
                            <td>{record.email}</td>
                        </tr>
                    ))
                }
            </tbody>
            <div>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PaginationTable;