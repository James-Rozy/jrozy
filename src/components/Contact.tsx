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
				<a href='#'>LinkedIn</a>
				<a href='#'>GitHub</a>
				<a href='#'>Instagram</a>
			</div>
		</div>
	);
};
