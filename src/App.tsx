import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Projects } from './components/Projects';

const aboutMessage =
	"I am a Front-End Software Engineer at Altarum Institute. I earned my bachelor's degree in computer science from California State University, Long Beach, where I also playing NCAA Division I water polo as a consummate team player. My specialty is designing and implementing web applications. My ability to listen and understand the desires of internal and external clients, along with my passion to produce the highest-quality, user-friendly applications is what sets me apart from other developers in the field.";

export const App: React.FC = () => {
	return (
		<div className='page-container'>
			<Header title='James Rozsypal' />
			<main className='main-content'>
				<Intro />
				<About message={aboutMessage} />
				<Projects description='Here are some projects I have been working on.' />
				<Contact description='Please reach out to me on LinkedIn and feel free to have a look at my socials.' />
			</main>
			<Footer name='James Rozsypal' />
		</div>
	);
};
