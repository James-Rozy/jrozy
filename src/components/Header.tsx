import { Title } from './ui/Title';
import { Navbar } from './ui/Navbar';
import { ThemeSwitcher } from './ui/ThemeProvider';

interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<header className='header'>
			<Title title={title} />
			<div className='header-container'>
				<Navbar />
				<ThemeSwitcher />
			</div>
		</header>
	);
};
