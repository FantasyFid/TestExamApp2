import { useState } from "react";
import DatePicker from 'react-date-picker';
import info from './info'

function StudentInput(props) {
    const [name, setName] = useState('');
    const [sername, setSername] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [date, setDate] = useState(null);
    const [group, setGroup] = useState('');
    const [alertingInformation, setAlertingInformation] = useState([]);

    function handleDateChange(date) {
        console.log('new date is' + date);
        setDate(date);
    }
    function handleSubmit(e) {
        e.preventDefault();

        let studentObject = {
            Name: name,
            Sername: sername,
            Patronymic: patronymic,
            Date: date?.toISOString(),
            Group: group
        }

        let alertingInfo = [];
        for (let field in studentObject) {
            if(!studentObject[field]) alertingInfo.push(field);
        }

        if (alertingInfo.length === 0) {
            setAlertingInformation([]);
            fetch(info.server + 'insert', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentObject)
            })
            .catch(() => {
                setAlertingInformation(['An error occured']);
                setTimeout(10000, () => setAlertingInformation([]));  
            });
            setAlertingInformation(alertingInfo);
        }
    }
    return(
        <form onSubmit={handleSubmit} className="student-input">
            <h3>Add new student</h3>
            <label>
                <div>Enter your name:</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
                <div>Enter your sername:</div>
                <input type="text" value={sername} onChange={(e) => setSername(e.target.value)}/>
            </label> 
            <label>
                <div>Enter your Patronymic:</div>
                <input type="text" value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
            </label> 
            <label>
                <div>Enter your Date of Birth:</div>
                <DatePicker onChange={handleDateChange} value={date} />
            </label> 
            <label>
                <div>Enter your group:</div>
                <input type="text" value={group} onChange={(e) => setGroup(e.target.value)}/>
            </label> 
            <lable>
                <input type="submit" value="Add student"/>
            </lable>
            <ul>
                {
                    alertingInformation.map((alert) => <li key={alert.toString()}>{alert}</li>)
                }
            </ul>
        </form>
    )
}

export default StudentInput;