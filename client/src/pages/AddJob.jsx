import React, { useEffect } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

  const [title, setTitle] = React.useState('');
  const [location, setLocation] = React.useState('Bangalore');
  const [category, setCategory] = React.useState('Programming');
  const [level, setLevel] = React.useState('Beginner level');
  const [salary, setSalary] = React.useState(0);

  const editorRef = React.useRef(null)
  const quillRef = React.useRef(null)

  const {backendUrl, companyToken} = React.useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      if (!title || !description || !location || !category || !level || !salary) {
        return alert('Please fill all fields');
      }

      const {data} = await axios.post(`${backendUrl}/api/company/post-job`, {
          title,
          description,
          location,
          salary,
          level,
          category
        }, {headers: {token: companyToken} });

      if (data.success) {
        toast.success('Job posted successfully');
        setTitle('');
        quillRef.current.root.innerHTML = '';
        setSalary(0);
      } else {
        toast.error(data.message || 'Failed to post job');
      }
    } catch (error) {
      toast.error('An error occurred while posting the job');
    }
  }

  useEffect(() => {
    // initiate quill only once    
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme : 'snow',
      })
    }

  },[])

  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>

      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input type="text" placeholder='Type here'
         onChange={e => setTitle(e.target.value)} value={title}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}>
          
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        
        <div>
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded'  onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded'  onChange={e => setLevel(e.target.value)}> 
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

      </div>
      <div>
        <p>Job Salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' onChange={e => setSalary(e.target.value)} type="Number" placeholder="2500" />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>

    </form>
  )
}

export default AddJob
