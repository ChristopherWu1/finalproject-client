import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }
//<p>{campus.description}</p>
//<button onClick={() => deleteCampus(campus.id)}>Delete</button>
  return (
    <div>
      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
          <img src = {campus.imageUrl}></img>
          <br />
          <button onClick={() => props.deleteCampus(campus.id)}>Delete</button> 
          <br />
        </div>
      ))}
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>

      <Link to={`/`}>
            <h1>Home</h1>
      </Link>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;