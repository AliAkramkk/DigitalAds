import React, { useState } from 'react'

const Form = () => {

    const [formdata,setFormdata]= useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState();
    

    const validateForm = () => {
        const { name, email, phone, address, city, state, country, zip, password, confirmPassword } = formdata;
        if (!name || !email || !phone || !address || !city || !state || !country || !zip || !password || !confirmPassword) {
            setError("All fields are required");
            return false;
        }
        if (!/^[a-zA-Z ]+$/.test(name)) {
            setError("Name can only contain letters and spaces");
            return false;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError("Email is not valid");
            return false;
        }
        if(!/^\d{10}$/.test(phone)) {
            setError("Phone number must be 10 digits long");
            return false;
        }
        if(password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        setError(null);
        return true;
    }
    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = () => {
        setFormdata({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            password: "",
            confirmPassword: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully", formdata);
            alert("Form submitted successfully");

            clearForm();
            // Add your form submission logic here
        } else {
            console.log("Form submission failed");
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-y-4 p-4'>

        <h1>Customer Form</h1>
        <form onSubmit={handleSubmit}>
            <div className='p-3'>
                <label>Name</label>
                <input type="text" name="name" value={formdata.name} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Email</label>
                <input type="email" name="email" value={formdata.email} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Phone</label>
                <input type="text" name="phone" value={formdata.phone} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Address</label>
                <input type="text" name="address" value={formdata.address} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>City</label>
                <input type="text" name="city" value={formdata.city} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>State</label>
                <input type="text" name="state" value={formdata.state} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Country</label>
                <input type="text" name="country" value={formdata.country} onChange={handleChange} />
            </div >
            <div className='p-3'>
                <label>Zip Code</label>
                <input type="text" name="zip" value={formdata.zip} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Password</label>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} />
            </div>
            <div className='p-3'>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formdata.confirmPassword} onChange={handleChange} />
            </div>

            {error && (
              <p style={{ color: 'red' }}>{error}</p>
            )}
            
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form