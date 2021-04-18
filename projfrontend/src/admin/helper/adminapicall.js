import { API } from "../../backend";

//Category calls
//Create Category
export const createCategory = (userId,token,category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
//All categories

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
//Delete Categories
export const deleteCategory = (categoryId,userId,token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }

    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//Update Category
//Get Category By ID
export const getCategoryById = categoryId => {
    //console.log(categoryId)
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//Update Category
export const updateCategory = (categoryId,userId,token,category) => {
    console.log(category)
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:category
    }).then(response => {
        console.log(response)
        return response.json()
    }).catch(err => console.log(err))
}

//Create Product 

export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


//All products

export const getProducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//delete product

export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }

    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
//get a product

export const getProduct = productId => {
    //console.log(productId)
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
//update product

export const updateProduct = (productId,userId,token,product) => {
   // console.log("PRODUCT",product)
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//ORDER
//Get All Order


export const getOrder = (userId,token) => {
    return fetch(`${API}/order/all/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
