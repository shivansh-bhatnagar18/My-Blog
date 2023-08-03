import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {

    const [title, setTitle] = useState('Untitled');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);
        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(blog)

        }).then(() => {
            console.log('New blog added')
            history.push('/')
        })
        setIsPending(false)
    }
    return ( 
        <div className="Create">
            <h2>Add a New Blog</h2>
            <form
            onSubmit={handleSubmit}>
                <label>Enter Blog Title:</label>
                <input type="text"required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Enter Blog Body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <label>Enter Author Name</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value='Mario'>Mario</option>
                    <option value='Yoshi'>Yoshi</option>   
                </select>
                {!isPending &&<button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;