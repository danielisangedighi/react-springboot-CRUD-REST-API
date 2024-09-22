import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

// Define withRouter in the same file
function withRouter(Component) {
    return function WithRouter(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        };
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email };
        EmployeeService.createEmployee(employee).then(() => {
            this.props.navigate('/employees'); // Navigate to Employee List after saving
        }).catch((error) => {
            console.error('There was an error creating the employee!', error);
        });
    }

    render() {
        return (
            <div>
                <h2>Create Employee</h2>
                <form>
                    <div>
                        <label>First Name</label>
                        <input placeholder="First Name" name="firstName" value={this.state.firstName} 
                               onChange={(e) => this.setState({ firstName: e.target.value })} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input placeholder="Last Name" name="lastName" value={this.state.lastName}
                               onChange={(e) => this.setState({ lastName: e.target.value })} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input placeholder="Email" name="email" value={this.state.email}
                               onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button onClick={this.saveEmployee}>Save</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateEmployeeComponent); // Wrap component with withRouter
