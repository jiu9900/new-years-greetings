import './bless.css'
import { getToken } from "../../utils/auth";
import axios from 'axios';

const Bless = ({content}) => {
    const update = () => {
        Data = {
            content: {content},
            font: '宋体',
            paper_style: example_style
        }
        console.log(Data);
        
        load();
    }
}

const load = async (e) => {
    e.preventDefault();
    try {
        const token = getToken();
        const res = await axios.post('http://202.194.30.68:8081/blessings',
            {Data},{
                headers: {
                    'Authorization': `${token}`
                }
            }
        )
        console.log(res.code);
        
    } catch (error) {
        console.log(error);
        
    }
}

export default Bless