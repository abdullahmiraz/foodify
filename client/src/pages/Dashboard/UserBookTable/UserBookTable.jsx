import React, { useState } from 'react';
import axios from 'axios';

const UserBookTable = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guest: '',
        name: '',
        phone: '',
        email: '',
        status: 'Pending'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/book-table', formData);
            console.log('Booking successful:', response.data);
            setFormData({
                date: '',
                time: '',
                guest: '',
                name: '',
                phone: '',
                email: '',
                status: 'Pending'
            });
        } catch (error) {
            console.error('Error occurred while booking:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="bg-white p-2 md:p-10">
                <form onSubmit={handleSubmit} className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Date*</span></label>
                        <input name="date" type="date" className="input input-bordered w-full" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Time*</span></label>
                        <input name="time" type="time" className="input input-bordered w-full" value={formData.time} onChange={handleChange} required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Num of Guest*</span></label>
                        <select name="guest" className="select select-bordered" value={formData.guest} onChange={handleChange} required>
                            <option>1 Person</option>
                            <option>2 Person</option>
                            <option>3 Person</option>
                            <option>4 Person</option>
                            <option>5 Person</option>
                            <option>6 Person</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Name*</span></label>
                        <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Phone*</span></label>
                        <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold"><span className="label-text">Email*</span></label>
                        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={formData.email} onChange={handleChange} required />
                    </div>
                    <input name="status" type="text" className="hidden" value="Pending" />
                    <div className="form-control pt-2">
                        <button className="btn btn-warning"><span>Book a table</span></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserBookTable;
