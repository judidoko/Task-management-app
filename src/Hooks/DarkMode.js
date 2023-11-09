import { useState, useEffect } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const coloTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(coloTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, coloTheme]);

  return [coloTheme, setTheme];
};

export default DarkMode;
