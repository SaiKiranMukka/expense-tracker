import React, { useState } from 'react'

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {

  const lightTheme = { bg: "#ffffff", text: "#51587d", ui: "#f9f9f9" }
  const darkTheme = { bg: "#212529", text: "#eeeeee", ui: "#333333" }

  const initialState = {
    light: true,
    ...lightTheme
  }

  const [theme, setTheme] = useState(initialState);

  const loadTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    setTheme(currentTheme ? JSON.parse(currentTheme) : initialState)
  }

  const toggleTheme = () => {
    let { light } = theme;
    light = !light
    const styles = light ? lightTheme : darkTheme
    setTheme({
      light,
      ...styles
    });

    localStorage.setItem('theme', JSON.stringify({
      light,
      ...styles
    }))
  }

  const contextValues = {
    toggleTheme,
    theme
  }

  useEffect(() => {
    loadTheme()
  }, [])


  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  )
}
