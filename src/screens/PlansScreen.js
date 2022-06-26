import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import db from "../firebase";
import "../styles/PlansScreen.css";

export default function PlansScreen() {

    const [ products, setProducts ] = useState([]);
    const [ subscription, setSubscription ] = useState(null);
    const user = useSelector(selectUser);

    // Setting plan information on component mount
    useEffect(() => {
        // Getting Stripe product information from Firestore
        db.collection("products")
        .where("active", "==", true).get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                // Getting product price information
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data
                    }
                })
            });
            setProducts(products);
        });
    }, []);

    // Get current subscription details for logged in user to render in UI
    useEffect(() => {
        db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                });
            });
        });
    }, [user.uid]);

    // Creating Stripe checkout session for logged in user
    async function loadCheckout(priceId) {
        const docRef = await db.collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                // Show an error to user
                // Inspect Cloud Function logs in Firebase console
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                // If there is a session, redirect to checkout
                // Init Stripe
                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    console.log(subscription);

    return (
        <div className="plansScreen">
            <br/>
            {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([ productId, productData ]) => {
                const isCurrentPlan = productData.name?.toLowerCase()
                .includes(subscription?.role);

                return (
                    <div
                        key={productId}
                        className={`${isCurrentPlan && "planScreenPlanDisabled"} plansScreenPlan`}
                    >
                        <div className="plansScreenInfo">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPlan && loadCheckout(productData.prices?.priceId)}>
                            {isCurrentPlan ? "Current Plan" : "Subscribe"}
                        </button>
                    </div>
                );
            })}
        </div>
    );

};