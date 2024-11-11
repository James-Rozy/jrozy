import { SiLinkedin, SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
interface ContactProps {
	description: string;
}

export const Contact: React.FC<ContactProps> = ({ description }) => {
	return (
		<div id='contact' className='section'>
			<div className='contact-text'>
				<h2>Let's Connect!</h2>
				<p>{description}</p>
			</div>
			<div className='contact-link-grp'>
				<a
					href='https://www.linkedin.com/in/james-rozsypal-dev/'
					className='link-decorated'
					target='_blank'
				>
					LinkedIn
					<SiLinkedin />
				</a>
				<a href='https://github.com/James-Rozy' className='link-decorated' target='_blank'>
					GitHub
					<SiGithub />
				</a>
				<a href='https://www.instagram.com/james_rozy/' className='link-decorated' target='_blank'>
					Instagram
					<SiInstagram />
				</a>
			</div>
		</div>
	);
};
