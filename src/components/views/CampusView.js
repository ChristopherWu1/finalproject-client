

const CampusView = (props) => {
  const {campus} = props;
  return (
    <div>      
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <img src = {campus.imageUrl} />
      <p>{campus.description}</p>
      <ul>
      <div>
      {campus.students.length !== 0 ? 
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <li key={student.id}>{name}</li>
        );
      })
      : 
      <p>There are no students enrolled at {campus.name}</p>}
      
    
    </div>
    
      </ul>
    </div>
  );

};

export default CampusView;