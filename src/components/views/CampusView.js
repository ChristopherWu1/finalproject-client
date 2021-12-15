import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  
}));

const CampusView = (props) => {
  const {handleChange, handleSubmit, campus } = props;
  const classes = useStyles();
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
          <Link to={`/student/${student.id}`}>
          <li key={student.id}>{name}</li>
          </Link>
        );
      })
      : 
      <p>There are no students enrolled at {campus.name}</p>}
      
    
    </div>
    
      </ul>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Name: </label>
            <input type="text" name="name" onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>
  
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
            <input type="text" name="address" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
  
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <input type="text" name="description" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
  
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
        </div>
    </div>
  );

};

export default CampusView;