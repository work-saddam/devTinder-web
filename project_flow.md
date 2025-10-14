# DevTinder

- Create Vite+React Application
- Remove unecessary code
- Install Tailwindcss - CSS Framework
- Install daisyui - Componenet library/ Tailwind CSS plugin
- Add navbar component to App.jsx
- Create a Navbar Component
- Install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body >RouteChildren
- Create Outlet in Body Component
- Create a Footer
- Create Login Page
- Install Axois
- Fix CORS:- On Backend, install cors => add middleware to app with configuration:
  app.use(cors( {origin:"http://localhost:....", credentials:true} ))
- Whenever you making a call using axios =>
  axios.post( "domianName(API)", {data}, {withCredentials:true} )
- Refactor code: add constants file & components folder
- Install @reduxjs/toolkit react-redux - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux Devtools on chrome
- Login and see your data is coming properly in store
- Navbar should update as soon as user logs in
- You should not access other routes without login
- If token is not present redirect to login page
- Logout
- get the feed & add the feed in the store
- bulit user card on Feed page
- Edit feature
- show toast message on save of profile
- Connection Page - see all my connections
- Requests Page - see all pending requests
- Feature: Accept/Reject Connection requests
- Send/Ignore user from feed
- Sign Up page

## Real Time Chat using WebSocket(Socket.io)

- Build the UI for Chat window on /chat/:targetUserId
- On Backend npm i socket.io & Setup socket.io
- On Frontend npm i socket.io-client & Setup
- Handling/Listening event using socket.on and emit the event using socket.emit

## RazorPay Payment Gateway Integaration

- Signup on razorpay & complete KYC.
- Create a UI for premium page.

- npm install razorpay
- In utils, initialize razorpay
- In routes create Order api.
- In model, create schema to store payment.
- Setup razorpay webhook on live API
- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/
