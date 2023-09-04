import {useState} from "react";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {Navigate} from "react-router-dom";
const PayPalCheckoutButton = (props) => {
    const {product} = props;

    const [paidFor, setPaidFor] = useState(false);

    const handleApprove = (orderId) => {
        //TODO:here call backend

        //if response ok
        setPaidFor(true);
        //

        //error case
        //error.log("ERROR!1!");

    }

    if(paidFor){
        <Navigate to={"/dashboard"}></Navigate>
    }

    return (
        <PayPalScriptProvider options={{"client-id": "AYbsUl6zTgZFB9G5oc8BupuYLgHFlnkisDn48MNR3oZOEudsF7-2EzZOv2g_8KyFjTvW60HZH8q05kqG"}}>
            <PayPalButtons
                onClick={(data, actions) => {
                    //TODO: check if contact is actually in debt
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price
                                }
                            }
                        ]
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order", order);

                    handleApprove(data.orderID);
                }}
                onCancel={()=>{
                    console.log("Cancelled!");
                }}
                onError={(err) => {
                    setError(err);
                    console.error("PayPal checkout Error!", err);
                }}
            />
        </PayPalScriptProvider>
    )
}

export default PayPalCheckoutButton;