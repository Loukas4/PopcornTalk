import { useState } from "react";
import FormInput from "../form-input/form-input";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Λάθος Email ή Κωδικός');
                return;
            }
            
            console.log('Ο χρήστης συνδέθηκε:', data);
            alert('Σύνδεση επιτυχής!');
            resetFormFields();

        } catch (error) {
            console.log('Σφάλμα κατά τη σύνδεση:', error);
        }
    };

    return (
        <div>
            <h1 className="my-[10px]">Already have an account?</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange}
                    name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange}
                    name="password" value={password} />
                <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;