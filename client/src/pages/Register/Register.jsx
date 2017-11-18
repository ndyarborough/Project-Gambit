import React from 'react';
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';

class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             confirmPassword: '',
//             platform: '',
//             region: '',
//             gamertag: '',
//         };
// }

//     // Handles updating component state when the user types into the input field
//     handleInputChange = event => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     };

//     handleFormSubmit = event => {
//         event.preventDefault();
//         if (this.state.email && this.state.password && this.state.confirmPassword && this.state.platform && this.state.region && this.state.gamertag) {
//             // Get UserStats
//             // this.getUserStats.scrapeWebsite(this.state.platform, this.state.region, this.state.value);
//             // console.log(this.getUserStats);

//         } else {
//             console.log('Please fill out entire form!')
//         }
//     };

    render() {
        return (
            <RegisterForm />
        )
    }
};

export default Register;