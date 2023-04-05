import React, { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles"
import { useSelector } from "react-redux"
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"




const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const cartTotal = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return

    setIsProcessingPayment(true);
    // Make fetch request to backend to create payment intent w/ Stripe
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal * 100 })
    }).then(res => res.json())

    // Retrieve client secret
    const { paymentIntent: { client_secret } } = response
    console.log(client_secret)

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        }
      }
    });

    
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Sucessful")
      }
    }
    setIsProcessingPayment(false)
  }
  return (
    <PaymentFormContainer>
      <h2>Credit Card Payment: </h2>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <PaymentButton disabled={isProcessingPayment} isLoading={isProcessingPayment} type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm