import { useState } from "react";
import FormInput from "../form-input/form-input";

// initialized values , object for formFields
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        } try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    }, 
                      body: JSON.stringify({displayName: displayName, email: email, password: password }) 
                        });
                        console.log('STATUS:', response.status);
                        const data = await response.json();

                            if (!response.ok || data.error) {
                                alert(data.message || data.error || 'Κάτι πήγε στραβά με την εγγραφή');
                                return;
                                } alert('Ο χρήστης δημιουργήθηκε επιτυχώς!');
                       
                    resetFormFields();

        } catch(error) {
            console.log('user creation encountered an error', error);
        }
    };
    // takes import event
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h1 className="my-[10px]">Don't have an account ?</h1>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange}
                 name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange}
                 name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange}
                name="password" value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange}
                 name="confirmPassword" value={confirmPassword}/>
                <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">Sign Up</button>
            </form>
          
        </div>
    );
};

export default SignUpForm;
