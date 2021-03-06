
import { useState, useEffect } from 'react';
import info from './info';

// Этот компонент отвечает за получение списка студентов с сервера
function StudentsList() {

    // Эта функция преобразует ISO date в дату формата DD-MM-YYYY
    const formatDate = function (dateStr) {
        let date = new Date(dateStr);
        let formated = date.getDate() + '-' + Number(date.getMonth() + 1) + '-' + date.getFullYear();
        return formated;
    }

    const [data, setData] = useState([]);

    // Эта функция получает список студентов с сервера
    const handleClick = function() {
        fetch(info.server + 'update')
            .then((response) => response.json())
            .then((data) => setData(data));
    }
    useEffect(handleClick, []);

    return(
        <div className='student-list'>
            <h3>Students List</h3>
            <button onClick={handleClick} className='fetch-button'>Update users</button>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Sername</th>
                    <th>Patronymic</th>
                    <th>Date of Birth</th>
                    <th>Group</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.student_id}</td>
                            <td>{val.student_name}</td>
                            <td>{val.student_sername}</td>
                            <td>{val.student_patronymic}</td>
                            <td>{formatDate(val.student_date_of_birth)}</td>
                            <td>{val.student_group}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
        
    )
}

export default StudentsList;