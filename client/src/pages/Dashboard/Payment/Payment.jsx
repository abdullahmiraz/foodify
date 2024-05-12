import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Gps from "../TrackFood/Gps";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const appearance = {
    theme: "stripe",
  };

  return (
    <div>
      <SectionTitle
        heading="Payment & Delivery Address"
        subHeading="Please Enter you payment and location details"
      ></SectionTitle>
      <div className="bg-yellow-100 p-4 my-4 rounded-md border">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      {/* <div>
        <Gps />
      </div> */}
    </div>
  );
};

export default Payment;
