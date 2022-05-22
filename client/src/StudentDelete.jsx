
import { useState } from 'react';
import info from './info'

// Компонент, отвечающий за удаление студентов
function StudentDelete() {
    const [id, setID] = useState('');

    // Отправляем на сервер json c полем id
    const handleSubmit = function(e) {
        e.preventDefault();
        if (id) {
            fetch(info.server + 'delete', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id})
            }).catch((err) => {
                console.log('Failed to delete: ' + err)
            });
        }
    }

    return(
        <form className='student-delete' onSubmit={handleSubmit}>
            <h3>Delete student</h3>
            <label>
                <div>Enter the ID of student you want to delete: </div>
                <input type="text" value={id} onChange={(e) => setID(e.target.value)}/>
            </label>
            <lable>
                <input type="submit" value="Delete student" className='fetch-button'/>
            </lable>
        </form>
    )
}

export default StudentDelete;