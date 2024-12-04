import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Define the type for the user context
interface UserContextType {
  user: {
    name: string;
    team: string;
  };
  setUser: React.Dispatch<React.SetStateAction<{
    name: string;
    team: string;
  }>>;
  updateTeam: (newTeam: string) => void;
}

const userContext = React.createContext<UserContextType>({
  user: {
    name: '',
    team: ''
  },
  setUser: () => {},
  updateTeam: () => {} 
});

export const UsercontextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage, fallback to empty object
    const storedUser = localStorage.getItem("user");
    return storedUser 
      ? JSON.parse(storedUser) 
      : { name: '', team: '' };
  });

  useEffect(() => {
    // Only set to localStorage if user is not empty
    if (user.name || user.team) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const updateTeam = (newTeam: string) => {
    axios
      .post('http://localhost:8000/api/user/updateTeam', 
        { team: newTeam },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        // Update the state with the new team value
        // @ts-ignore
        setUser((prevState) => ({
          ...prevState,
          team: res.data.team // Update the team value after the API call
        }));
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <userContext.Provider value={{ user, setUser, updateTeam }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};