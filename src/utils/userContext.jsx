import { createContext, useState } from 'react';  

export const UserContext = createContext();  

export const UserProvider = ({ children }) => {  
  const [userData, setUserData] = useState(null);
  const [loadS,setLoadS] = useState(false)
  const [seLoadS,setSeLoadS] = useState(false)

  return (  
    <UserContext.Provider value={{ userData, setUserData ,loadS ,setLoadS ,seLoadS ,setSeLoadS}}>  
      {children}  
    </UserContext.Provider>  
  );  
};  

// export const BirthdayContext = createContext()

// export const BirthdayProvider = ({ children }) => {
//   const [birth ,setBirth] = useState(null)

//   return (
//     <BirthdayContext.Provider value={{ birth ,setBirth }}>
//       {children}
//     </BirthdayContext.Provider>
//   )
// }