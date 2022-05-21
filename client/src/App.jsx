
import StudentInput from "./StudentInput";
import StudentsList from "./StudentsList";
import StudentDelete from "./StudentDelete";

function App(props) {

    return(
        <>
            <StudentInput/>
            <StudentDelete/>
            <StudentsList/>
        </>
    )
}

export default App;