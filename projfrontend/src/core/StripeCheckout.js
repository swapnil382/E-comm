import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import { isAutheticated } from "../auth/helper"
import { cartEmpty, loadcart } from "./helper/CartHelper"
import StripCheckoutButton from "react-stripe-checkout"
import { API } from "../backend"
import { createOrder } from "./helper/OrderHelper"


const StripeCheckout = ({products,setReload = f => f, reload= undefined}) => {

        const [data, setData] = useState({
            loading:false,
            success:false,
            error:"",
            address:""
        })

        const token = isAutheticated() && isAutheticated().token
        const userId = isAutheticated() && isAutheticated().user._id

        const getFinalAmount = () =>{
            let amount = 0;
            products.map(p => {
                amount = amount + p.price;
            })
            return amount
        }

        const makePayment =(token) => {
            const body ={
                token,
                products
            }
            const headers = {
                "Content-Type":"application/json"
            }
            return fetch(`${API}/stripepayment`,{
                method:"POST",
                headers,
                body:JSON.stringify(body)
            }).then(response => {
                console.log(response)
                createOrder(userId,token,response)
                cartEmpty(() => {
                    // console.log("cart crash")
                })
                setReload(!reload)
            }).catch(error => console.log(error))
         
        }

        const showStripeButton = () => {
            return isAutheticated () ? (
                <StripCheckoutButton
                stripeKey="pk_test_51IYqE7SBCrwNWs5wCHvpEl1ilF8doYjSwPEYGMvMNzfO9eUPcQoIaRLAAzw3HJqZJk6jzIlSehHhORk954wcqY5G00fuacS3Wg"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Product"
                shippingAddress
                billingAddress
                >
                <button className="btn btn-warning" style={{width:"205px"}}>Debit / ATM Card</button>
                </StripCheckoutButton>
            ) : (
                <Link to="/signin">
                    <button className="btn btn-warning">Signin</button>
                </Link>
            )
        }

    return(
        <div>
            <h3 className="text-info" >Amount Payable {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout