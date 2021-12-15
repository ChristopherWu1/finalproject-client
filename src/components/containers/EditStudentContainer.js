import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
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
        let anId = parseInt(this.props.match.params.id);
        console.log(anId);
        await this.props.fetchStudent(anId);
        console.log('this is a student',this.props);
            if(typeof this.props.student !== 'undefined')
            {
            console.log('we got a student');
        
            this.setState({
                firstname: this.props.student.firstname, 
                lastname: this.props.student.lastname, 
                campusId: this.props.student.campusId ? this.props.student.campusId : null, 
                email: this.props.student.email,
                redirect: false, 
                redirectId: this.props.student.id,
                isFound: true
            }
                );
            
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId,
            email: this.state.email,
        };
        
        let newStudent = await this.props.editStudent(student);

        this.setState({
          firstname: "", 
          lastname: "", 
          campusId: null,
          email: "",
          redirect: true, 
          redirectId: newStudent.id
        });
    }
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
          <EditStudentView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}
            student = {this.props.student}      
          />
        );
    }
}
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id))
    })
}

export default connect(null, mapDispatch)(EditStudentContainer);