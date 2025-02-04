import react from "react";

const Set=({content, Component })=> {

    return (
        <div>
            <div>请填写你的 {content}</div>
            <Component></Component> 
        </div>
    );
};

const SetMine = () => {
    
}