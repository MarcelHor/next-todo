'use client'

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeModeSwitcher = () => {
    const [appTheme, setAppTheme] = useState<'light' | 'dark'>('light'); // default to light

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setAppTheme(storedTheme === 'dark' ? 'dark' : 'light');
        document.querySelector('html')?.setAttribute('data-theme', storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = appTheme === 'dark' ? 'light' : 'dark';
        setAppTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.querySelector('html')?.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="flex items-center cursor-pointer transition duration-500 ease-in-out transform space-x-2"
             onClick={toggleTheme}>
            {appTheme === 'dark' ? (
                <FontAwesomeIcon icon={faMoon} size="xl" />
            ) : (
                <FontAwesomeIcon icon={faSun} size="xl" />
            )}
            <span className="text-base-content mr-2">{appTheme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
    );
}

export default ThemeModeSwitcher;
