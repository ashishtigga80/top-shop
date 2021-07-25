import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_51JEYIXSGo83AX2i5PzzEmYsvQ0lea2WPS2nAkDPviqnjwBMhQkltKwyroJIvtrt5vwp7ivQAzaLJCKoWAEX5xKJk00S9Rf9Ke4';



const Stripe = ({ amount, user, checkout, shippingdetails }) => {

  const onToken = (user,checkout) => token => 
    checkout(user, token.id, shippingdetails);

  return(<StripeCheckout
      amount={amount*100}
      token={onToken(user,checkout)}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}
  />)
}
    

export default Stripe;