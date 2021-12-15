import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect,withRouter } from 'react-router-dom';
import { fetchCampusThunk,editCampusThunk } from "../../store/thunks";

import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = 
    {
    id: null,
    name: "", 
    address: "",
    description: "",
    redirect: false, 
    redirectId: null
    };
}
  async componentDidMount() {
    //getting campus ID from url
    await this.props.fetchCampus(this.props.match.params.id);
    if(typeof this.props.campus !== 'undefined')
            {
            console.log('we got a campus');
        
            this.setState({
              id: this.props.campus.id,
              name: this.props.campus.name, 
              address: this.props.campus.address,
              description: this.props.campus.description,
              redirect: false, 
              redirectId: null
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

    let campus = {
        id:this.state.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
    };
    
    let newCampus = await this.props.editCampus(campus);

    this.setState({
        name: "", 
        address: "",
        description: "",
        redirect: true, 
        
    });
}
componentWillUnmount() {
  this.setState({redirect: false, id: null});
}

  render() {
    if(this.state.redirect) {
      console.log(this.state.id);
      return (<Redirect to={`/campus/${this.state.id}`}/>)
    }
    return (
      <CampusView 
        campus={this.props.campus}
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);