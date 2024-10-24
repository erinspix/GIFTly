import React, { createContext, useState, useEffect } from 'react';

const themes = [
  { name: "goldSnowTheme", cssFile: 'css/goldSnowTheme.css' },
  { name: "presentTheme", cssFile: 'css/goldSnowPresent.css' },
  { name: "snowflakeTheme", cssFile: 'css/largeFlakeTheme.css' },
  { name: "treeBranchTheme", cssFile: 'css/snowyTreeTheme.css' },
  { name: "snowmenTheme", cssFile: 'css/snowmenTheme.css' }
];

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;