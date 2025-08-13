import React, { useEffect } from 'react'
import Quill from 'quill';
import { JobCategories } from '../assets/assets';

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

      </div>

    </form>
  )
}

export default AddJob
