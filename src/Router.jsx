import { Route, Router } from 'wouter'; 
import Start from './pages/startPage/start';
import Login from './pages/login/login';
import Register from "./pages/register/register";
import SetMine from "./pages/setMine/setMine";
import Showcase from './pages/Showcase/Showcase';
import StartBlessing from './pages/startBlessing/startBlessing';
const MyRouter = () => {
    const router =[{
        path:"/", component:Start 
    },{
        path:"/login", component:Login
    },{
        path:"/register",component:Register 
    },{
        path:"/set",component:SetMine
    },{
        path:"/showCase",component:Showcase
    },{
        path:"/startBlessing",component:StartBlessing
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
      
    