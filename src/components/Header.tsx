import { Title } from './ui/Title';
import { Navbar } from './ui/Navbar';

interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<header className='header'>
			<Title title={title} />
			<Navbar />
		</header>
	);
};
