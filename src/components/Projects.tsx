import { WebsitePreview } from './ui/WebsitePreview';
import DCCThumbnail from '../assets/dcc-thumbnail_11-11-24.png';

interface ProjectsProps {
	description: string;
}

export const Projects: React.FC<ProjectsProps> = ({ description }) => {
	return (
		<div id='projects' className='col-section'>
			<h2>Projects</h2>
			<p>{description}</p>
			<div className='preview-grid'>
				<WebsitePreview
					url='https://directcarecareers.com/'
					title='Direct Care Careers'
					tasks='UI Design | Web Design | Front-End Development'
					description='A unique platform that allows direct care workers to see jobs available to them in their area, and complete training courses to earn credentials to qualify for new jobs.'
					imageUrl={DCCThumbnail}
				/>
				<WebsitePreview
					url='https://www.familyplanninglinkagetobhcare.org/'
					title='Office of Population Affairs (OPA) Link Study'
					tasks='UI Design | Web Design | Front-End Development'
					description='Enduring materials for the OPA Link Study which created interdisciplinary linkages between providers in a geographic area, enabling staff to learn about local resources and services and develop processes for screening and referrals'
				/>
				<WebsitePreview
					url='https://www.healthyheartsformichigan.org/'
					title='Healthy Hearts for Michigan'
					tasks='UI Design | Web Design | Front-End Development'
					description='A statewide cooperative that helps primary care practices and their patients in enhancing the treatment of cardiovascular disease, hypertension, and smoking cessation.'
				/>
				<WebsitePreview
					url='https://michigansparc.org/'
					title='Michigan Sustained Patient-Centered Alcohol-Related Care'
					tasks='UI Design | Web Design | Front-End Development'
					description='An enduring materials website for the MI-SPARC initiative that acts as a technical resource center for providers to help recognize and treat unhealthy alcohol use.'
				/>
			</div>
		</div>
	);
};
