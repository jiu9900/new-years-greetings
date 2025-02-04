import React from "react"
import { Route, Router } from 'wouter'; 
import Start from './pages/startPage/start';
import Login from './pages/login/login';
import Register from "./pages/register/register";
const MyRouter = () => {
    const router =[{
        path:"/", component:Start 
    },{
        path:"/login", component:Login
    },{
        path:"/register",component:Register 
    }]

    return (
        <Router>
            {router.map((item)=>{
                return <Route path={item.path} component={item.component}></Route>
            })}
        </Router>
    )
    
}
      
export default MyRouter
      
    