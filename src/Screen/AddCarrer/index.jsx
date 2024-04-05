
import React ,{useState} from 'react'

const AddCarrer = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        resume: '',
        address: '',
        experience: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
     
      };
    
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Mobile:</label>
      <input
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Resume:</label>
      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Address:</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Experience:</label>
      <textarea
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit">Submit</button>
  </form>
  )
}

export default AddCarrer