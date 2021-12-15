import { Link } from "react-router-dom";

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;

  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`student/new`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  return (
    <div>
      {students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
          <Link to={`/student/${student.id}`}>
            <h1>{name}</h1>
            
          </Link>
          <img src = {student.imageUrl}/>
          <p>{student.email}</p>
          <p>{student.gpa}</p>
          
          {student.campus ?
          
        <p>Goes to <Link to={`/campus/${student.campus.id}`}> {student.campus.name} </Link></p>
        
      
      : 
      <p>This student is not currently enrolled at a school.</p>}

          <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        );
      }
      )}
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <Link to={`/`}>
            <h1>Home</h1>
      </Link>
    </div>
  );
};


export default AllStudentsView;