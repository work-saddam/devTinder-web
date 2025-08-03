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
