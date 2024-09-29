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
            employees: [],
            currentPage: 1,       // For pagination
            recordsPerPage: 4    // Number of records per page
        };
    }

    // Method to handle 'Add Employee' button click
    addEmployee = () => {
        this.props.navigate('/add-employee');
    }

    // Method to handle 'Update Employee' button click
    updateEmployee = (id) => {
        this.props.navigate(`/update-employee/${id}`);
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

    // Pagination: Calculate the current records to display
    getPaginatedEmployees() {
        const { employees, currentPage, recordsPerPage } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        return employees.slice(indexOfFirstRecord, indexOfLastRecord);
    }

    // Handle next page
    handleNextPage = () => {
        const { currentPage, employees, recordsPerPage } = this.state;
        if (currentPage < Math.ceil(employees.length / recordsPerPage)) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    // Handle previous page
    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    }

    render() {
        const { currentPage, recordsPerPage, employees } = this.state;
        const paginatedEmployees = this.getPaginatedEmployees();
        const totalPages = Math.ceil(employees.length / recordsPerPage);

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
                                paginatedEmployees.map(employee => 
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
                
                {/* Pagination controls */}
                <div className="pagination-controls">
                    <button
                        onClick={this.handlePrevPage}
                        disabled={currentPage === 1}
                        className="btn btn-secondary"
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button
                        onClick={this.handleNextPage}
                        disabled={currentPage === totalPages}
                        className="btn btn-secondary"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

// Export the component wrapped with withRouter to use the navigate function
export default withRouter(EmployeeListComponent);
