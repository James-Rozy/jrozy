interface FooterProps {
	name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
	const date = new Date();

	return (
		<footer id='footer'>
			<p>
				{name} © {date.getFullYear()}
			</p>
		</footer>
	);
};
