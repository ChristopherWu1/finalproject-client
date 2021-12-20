import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect,withRouter } from 'react-router-dom';

import { fetchStudentThunk , editStudentThunk} from "../../store/thunks";
import { StudentView } from "../views";

class StudentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      redirect: false, 
      redirectId: null,
     
    };
}


  async componentDidMount() {
    //getting student ID from url
    await this.props.fetchStudent(this.props.match.params.id);
    console.log('student',this.props.student);
    if(typeof this.props.student !== 'undefined')
            {
            console.log('we got a student');
        
            this.setState({
              id: this.props.student.id,
                firstname: this.props.student.firstname, 
                lastname: this.props.student.lastname, 
                campusId: this.props.student.campusId ? this.props.student.campusId : null, 
                email: this.props.student.email,
                redirect: false, 
                redirectId: this.props.student.id,
            }
            
                );
                console.log(this.state);
            }
            else{
                console.log('we never passing this class');
            }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = async event => {
    event.preventDefault();

    let student = {
        id: this.state.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        email: this.state.email,

        
    };
    console.log(student);
    let newStudent = await this.props.editStudent(student);
    console.log(newStudent);

    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      redirect: true, 
     
    });
}
componentWillUnmount() {
  this.setState({redirect: false, id: null});
}

  render() {
    if(this.state.redirect) {
      console.log(this.state.id);
      return (<Redirect to={`/students`}/>)
    }
    return (
      <StudentView 
        student={this.props.student}
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};
export default withRouter(connect(mapState, mapDispatch)(StudentContainer));