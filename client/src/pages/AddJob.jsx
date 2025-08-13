import React, { useEffect } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {

  const [title, setTitle] = React.useState('');
  const [location, setLocation] = React.useState('Bangalore');
  const [category, setCategory] = React.useState('Programming');
  const [level, setLevel] = React.useState('Beginner level');
  const [salary, setSalary] = React.useState(0);

  const editorRef = React.useRef(null)
  const quillRef = React.useRef(null)

  useEffect(() => {
    // initiate quill only once    
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme : 'snow',
      })
    }

  },[])

  return (
    <form>

      <div>
        <p>Job Title</p>
        <input type="text" placeholder='Type here'
         onChange={e => setTitle(e.target.value)} value={title}
          required />
      </div>

      <div>
        <p>Job Description</p>
        <div ref={editorRef}>
          
        </div>
      </div>

      <div>
        
        <div>
          <p>Job Category</p>
          <select onChange={e => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p>Job Location</p>
          <select onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p>Job Level</p>
          <select onChange={e => setLevel(e.target.value)}> 
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

      </div>
      <div>
        <p>Job Salary</p>
        <input onChange={e => setSalary(e.target.value)} type="Number" placeholder="2500" />
      </div>

      <button type="">ADD</button>

    </form>
  )
}

export default AddJob
