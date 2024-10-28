interface AboutProps {
	message: string;
}

export const About: React.FC<AboutProps> = ({ message }) => {
	return (
		<div id='about' className='row-section'>
			<h2>About</h2>
			<p>{message}</p>
		</div>
	);
};
