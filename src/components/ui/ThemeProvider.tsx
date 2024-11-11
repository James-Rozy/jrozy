// ThemeSwitcher.tsx
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		if (!savedTheme) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return savedTheme;
	});

	useEffect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<button
			onClick={toggleTheme}
			className={`theme-switcher ${theme}`}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
		>
			<div className='icon-container'>
				<Sun className='sun-icon' />
				<Moon className='moon-icon' />
			</div>
		</button>
	);
};
