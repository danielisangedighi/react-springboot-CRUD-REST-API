import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

// Define the withRouter HOC
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
}

class EmployeeListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    // Method to handle 'Add Employee' button click
    addEmployee = () => {
        this.props.navigate('/add-employee');  // Navigate to the add-employee page
    }

    // Method to handle 'Update Employee' button click
    updateEmployee = (id) => {
        this.props.navigate(`/update-employee/${id}`);  // Navigate to the update-employee page with employee ID
    }

    // Method to handle 'Delete Employee' button click
    deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({ 
                employees: this.state.employees.filter(employee => employee.id !== id) 
            });
        });
    }

    // Fetch the list of employees when the component mounts
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        }).catch((error) => {
            console.error('Error fetching employees', error);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employee List</h2>
                <div>
                    <button onClick={this.addEmployee} className="btn btn-primary">Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(employee => 
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button onClick={() => this.updateEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// Export the component wrapped with withRouter to use the navigate function
export default withRouter(EmployeeListComponent);
