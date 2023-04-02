import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ReviewForm = ({ fishingHoleId }) => {
    const { config } = useAuth();
    const [formData, setFormData] = useState({
        text: "",
    });

    async function createReview(newReview) {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/reviews/new/`,
            newReview,
            config
        );
        if (response.status === 201) {
            console.log(response);
            window.location.reload();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        createReview(formData);
        setFormData({
            text: "",
        });
    }

    function handlechange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({...prevState, [name]: value }));
    }
    return ( 
        <form onSubmit={handleSubmit} className="comment-1" >
            <h5>Leave A Review</h5>
            <div className="comment-form" >
                <label>
                    Review:
                    <input 
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handlechange}
                    />
                </label>
                <button type='submit' >Add</button>
            </div>
        </form>
     );
}
 
export default ReviewForm;