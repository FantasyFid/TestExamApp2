
import { useState } from 'react';
import info from './info'

function StudentDelete(props) {
    const [id, setID] = useState('');
    const [alertingInformation, setAlertingInformation] = useState([]);

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
                setAlertingInformation(['An error occured: ' + err]);
                setTimeout(1000, () => setAlertingInformation([]));  
            });
        }
    }

    return(
        <form className='input-block' onSubmit={handleSubmit}>
            <label>
                <div>Enter the ID of student you want to delete: </div>
                <input type="text" value={id} onChange={(e) => setID(e.target.value)}/>
            </label>
            <lable>
                <input type="submit" value="Delete student"/>
            </lable>
            <ul>
                {
                    alertingInformation.map((alert) => <li key={alert.toString()}>{alert}</li>)
                }
            </ul>
        </form>
    )
}

export default StudentDelete;