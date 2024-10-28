interface TitleProps {
	title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
	return (
		<a href='/' className='title-link'>
			{title}
		</a>
	);
};
