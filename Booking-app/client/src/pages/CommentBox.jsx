import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function CommentBox() {
  const { id } = useParams(); 
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('/comment').then(response => {
      setComments(response.data);
    });
  }, []);

  const [users,setUsers] = useState([]);
    useEffect(() => {
        axios.get('/user').then(response => {
          setUsers(response.data);
        });
    }, []);

  const filteredComments = comments.filter(comment => comment.place === id);

  const findUser = (users, comments) => {
     const user = users.find(user => user._id === comments.user)
    return user ? user.name : "  ";
  }
 
  return (
    <div>
        <div className="mt-20">
          <label>
            <div className="py-5  text-center bg-red-200">
                <b style={{fontSize: "20px"}}>Client's Comments</b>
            </div>
           </label>
          {filteredComments.map(comment => (
            <div className="bg-red-100 py-8" key={comment._id}>

               <p className="ml-20 px-5 bg-red-200 rounded-2xl"
                  style={{fontSize: "20px", width:"100px"}}>      
                  <b>{findUser(users, comment)}  :</b>
               </p>

               <div className="ml-20 mr-20 mt-4 bg-green-100 -mx-8 px-8 py-4 rounded-2xl">
                 <p>{comment.content}</p>
               </div>
             </div>
           ))}
        </div>
    </div>
  );
};
