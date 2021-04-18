import React,{useState} from "react"
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {

           const [name, setName] = useState("")
            const [error, setError] = useState("false")
           const [success, setSuccess] = useState("false")  

            const { user,token } = isAutheticated();
            
            const handleChange = event =>{
                    setError("")
                    setName(event.target.value)

            }

            const onSubmit = event => {
                event.preventDefault() 
                setError("")
                setSuccess(false)
                //Back request
                createCategory (user._id,token,{name})
                .then(data => {
                    if(data.error){
                        setError(true)
                    }else{
                        setError("")
                        setSuccess(true)
                        setName("")
                    }
                })
            }

            const goBack = () => (
                <div className="mt-3">
                    <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
                </div>
            )

            const successMessage = () => {
                if(success){
                    return <h4 className=" text-success">Categories created succefully</h4>
                }
            }

            
            const errorMessage = () => {
                if(error){
                    return <h4 className="text-danger">Failed to Create Categories</h4>
                }
            }

            const mycategoryForm = () => {
                return (
                    <form>
                        <div className="from-group">
                            <p className="lead">Enter the Category</p>
                            <input type="text" className="form-control my-3"
                            onChange={handleChange}
                            value={name}
                            autoFocus
                            required
                            placeholder="For Ex. summer" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-outline-info mb-2">Create Category</button>
                    </form>
                )
            }

    return (
        <Base title="Create a Category" description="Add new category here" className="container bg-info p-4">
        <div className="row bg-white rounded">
            <div className="col-md-4 offset-md-4">
            {successMessage()}
            {errorMessage()}
            {mycategoryForm()}
            {goBack()}
            </div>
           
        </div>
        </Base>
      
    )
}

export default AddCategory;