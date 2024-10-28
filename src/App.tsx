import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Projects } from './components/Projects';

export const App: React.FC = () => {
	return (
		<div className='page-container'>
			<Header title='James Rozsypal' />
			<main className='main-content'>
				<Intro />
				<About message='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' />
				<Projects description='Here are some projects I have worked on.' />
				<Contact description='Please reach out to me on LinkedIn and feel free to have a look at my socials.' />
			</main>
			<Footer name='James Rozsypal' />
		</div>
	);
};
