import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategoryById,updateCategory } from "./helper/adminapicall";


const UpdateCategory = ({match}) => {

    const  {user, token} = isAutheticated();

    const [values, setValues] = useState ({
        name:"",
        loading:"",
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    })

    const {name,loading,error,createdProduct,getaRedirect,formData} = values

    const preload = categoryId => {
        //   console.log(categoryId)
        getCategoryById(categoryId).then(data => {
            // console.log("DATA",data)
            if (data.error){
               setValues({ ...values,error:data.error})
            }else{
              setValues({ ...values,
             name:data.name,
             formData:new FormData()
             })
console.log("data1",data)   
            }
          })
        }

     //   console.log("DATA",values)
        useEffect(() => {
            preload(match.params.categoryId)
            console.log(match)
          },[])

          const onSubmit = (event) => {
            event.preventDefault()
            setValues({...values,error:"",loading:true})
            updateCategory(match.params.categoryId,user._id,token,formData).then(data => {
              if(data.error){
                setValues({...values,error:data.error})
              }else{
                setValues({
                  ...values,
                  name:"",
                  loading:false,
                  createdProduct:data.name
                })
                }
                console.log("DATA",data)
            })   
        }

      


        const handleChange = name => event =>  {
            const value = event.target.value
            formData.set(name,value)
            setValues({...values,[name]:value})
        }

   const  UpdateCategoryfrom = () =>{
       return(
        <form>
        <div className="from-group">
          <p className="lead">Update the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("name")}
            value={name}  
            autoFocus
            required
          />
        </div>
        <button onClick={onSubmit}  className="btn btn-outline-info mb-2">
          Update Category
        </button>
      </form>
       )
     
    }

  return (
    <Base title="Update Category here!!!!" description="Welcome to Update Category" className="container bg-info p-4">
    <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
    <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
           {UpdateCategoryfrom()}
        </div>
    </div>
</Base>
  );
};

export default UpdateCategory;
