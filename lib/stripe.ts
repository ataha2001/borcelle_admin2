import Stripe  from 'stripe';

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK!,{
    apiVersion: "2024-04-10",
    typescript:true
})