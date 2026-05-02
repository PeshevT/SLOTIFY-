/* 
Who is logged in accros the whole app. This is the most important concept here. 
Context is a way to share data between components without passing it through props manually.
Think of it like a "global state" — once the user logs in, any component in the app can know who is
logged in.
*/

import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

// Wraps the app and holds the user state
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user')
        return saved ? JSON.parse(saved) : null
    })

    function login(userData){
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function logout(){
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
           {children}
        </AuthContext.Provider>    
    )
}

// Any component calls this to access user, login, or logout
export function useAuth() {
    return useContext(AuthContext)
}
