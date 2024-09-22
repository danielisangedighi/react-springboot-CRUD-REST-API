import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

// Define withRouter in the same file
function withRouter(Component) {
    return function WithRouter(props) {
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} navigate={navigate} params={params} />;
    };
}

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            loading: true, // Add loading state
            error: null, // Add error state
        };
    }

    // Fetch employee data when the component mounts
    componentDidMount() {
        const { id } = this.props.params; // Get the employee ID from URL parameters
        console.log('Fetching data for employee ID:', id); // Debug log

        EmployeeService.getEmployeeById(id)
            .then(res => {
                const { firstName, lastName, email } = res.data;
                console.log('Employee data:', res.data); // Debug log
                this.setState({ firstName, lastName, email, loading: false });
            })
            .catch(error => {
                console.error('Error fetching employee data', error);
                this.setState({ loading: false, error: 'Failed to fetch employee data' });
            });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        const { id } = this.props.params; // Get the employee ID from URL parameters
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email };

        //EmployeeService.updateEmployee(id, employee)
        EmployeeService.updateEmployee(employee, id)
            .then(() => {
                this.props.navigate('/employees'); // Navigate to Employee List after saving
            })
            .catch((error) => {
                console.error('There was an error updating the employee!', error);
            });
    }

    render() {
        const { loading, error, firstName, lastName, email } = this.state;

        if (loading) {
            return <div>Loading...</div>; // Display loading message
        }

        if (error) {
            return <div>{error}</div>; // Display error message
        }

        return (
            <div>
                <h2>Update Employee</h2>
                <form>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            componentDidMount=""
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            required
                        />
                    </div>
                    <button onClick={this.updateEmployee}>Update</button>
                </form>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent); // Wrap component with withRouter
