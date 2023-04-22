import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentBox from './CommentBox';

function CommentForm() {
  const { id } = useParams();
  const [content, setContent] = useState('');

  async function CreateComment(ev) {
    ev.preventDefault();
    try{
      await axios.post(`/places/${id}/comments`, {
        content,
      });
      alert("Comment created successfully!");
      window.location.reload();
    } catch (e) {
      alert("Something went wrong on the server.");
    }
  }

  return (
    <div>
    <form onSubmit={CreateComment}>
      <div className='mt-5'>
        <h2 style={{fontSize: "20px"}}>Content:</h2>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <button 
          type="submit"
          className='px-6 py-2 rounded-2xl bg-blue-500'>
        Submit
      </button>
    </form>
    <CommentBox/>
  </div>
  );
}


export default CommentForm;
