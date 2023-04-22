import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function CommentBox() {
    const { id } = useParams(); // Lấy id từ URL

  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get('/comment').then(response => {
      setComments(response.data);
    });
  }, []);

  const [user,setUser] = useState([]);
    
    useEffect(() => {
        axios.get('/user').then(response => {
          setUser(response.data);
        });
    }, []);

  const filteredComments = comments.filter(comment => comment.place === id);
 
  return (
    <div>

        <div className="mt-20">
          <label>
            <div className="py-5 rounded-2xl text-center bg-red-200">
                <b style={{fontSize: "20px"}}>Client's Comments</b>
            </div>
           </label>
          {filteredComments.map(comment => (
            <div className="bg-red-100 py-8 rounded-2xl" key={comment._id}>
          <div className="ml-20 mr-20 mt-4 bg-green-100 -mx-8 px-8 py-4 rounded-2xl">
            <p>
              
            </p>
          <p>{comment.content}</p>
          </div>
        </div>
      ))}
        </div>
    </div>
  );
};
