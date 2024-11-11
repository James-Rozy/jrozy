import { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';

interface WebsitePreviewProps {
	url: string;
	title: string;
	tasks?: string;
	description?: string;
	imageUrl?: string;
	favicon?: string;
	className?: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
	url,
	title,
	tasks,
	description,
	imageUrl,
	favicon,
	className = '',
}) => {
	const [imageError, setImageError] = useState(false);
	const [faviconError, setFaviconError] = useState(false);

	const getDomain = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			return domain.replace('www.', '');
		} catch {
			return url;
		}
	};

	return (
		<a
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className={`website-preview ${className}`}
		>
			<div className='website-preview__image-container'>
				{imageUrl && !imageError ? (
					<img
						src={imageUrl}
						alt={`Preview of ${title}`}
						className='website-preview__image'
						onError={() => setImageError(true)}
					/>
				) : (
					<div className='website-preview__image website-preview__image--placeholder'>
						<Globe />
					</div>
				)}

				<div className='website-preview__external-link'>
					<ExternalLink />
				</div>
			</div>

			<div className='website-preview__content'>
				<div className='website-preview__info'>
					{favicon && !faviconError ? (
						<img
							src={favicon}
							alt=''
							className='website-preview__favicon'
							onError={() => setFaviconError(true)}
						/>
					) : (
						<div className='website-preview__favicon website-preview__favicon--placeholder'>
							<Globe />
						</div>
					)}
					<span className='website-preview__domain'>{getDomain(url)}</span>
				</div>

				<h3 className='website-preview__title'>{title}</h3>

				{tasks && <p className='website-preview__tasks'>{tasks}</p>}

				{description && <p className='website-preview__description'>{description}</p>}
			</div>
		</a>
	);
};

// Loading Skeleton Component
const WebsitePreviewSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
	return (
		<div className={`website-preview website-preview--loading ${className}`}>
			<div className='website-preview__image-container' />
			<div className='website-preview__content'>
				<div className='website-preview__info' />
				<div className='website-preview__title' />
				<div className='website-preview__description' />
			</div>
		</div>
	);
};

export { WebsitePreview, WebsitePreviewSkeleton };
