interface ProjectsProps {
	description: string;
}

export const Projects: React.FC<ProjectsProps> = ({ description }) => {
	return (
		<div id='projects' className='col-section'>
			<h2>Projects</h2>
			<p>{description}</p>
		</div>
	);
};
