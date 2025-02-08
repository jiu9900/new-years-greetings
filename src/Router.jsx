import React from "react"
import { Route, Router } from 'wouter'; 
import Start from './pages/startPage/start';
import Login from './pages/login/login';
import Register from "./pages/register/register";
import SetMine,{SetNickname} from "./pages/setMine/setMine";
const MyRouter = () => {
    const router =[{
        path:"/", component:Start 
    },{
        path:"/login", component:Login
    },{
        path:"/register",component:Register 
    },{
        path:"/set/nickname",component:SetNickname
    },{
        path:"/set/info",component:SetMine
    }]

    return (
        <Router>
            {router.map((item)=>{
                return <Route key={item.path} path={item.path} component={item.component}></Route>
            })}
        </Router>
    )
    
}
      
export default MyRouter
      
    