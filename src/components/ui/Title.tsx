interface TitleProps {
	title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
	return (
		<a href='/' className='link link-title-minimal'>
			{title}
		</a>
	);
};
