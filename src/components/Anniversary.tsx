import { type FC } from 'react';
import SleepingBearPhoto from '../assets/anniversary3/mj_sleeping_bear_log_slide.jpeg';
import GreatTurtlePhoto from '../assets/anniversary3/great_turtle_trail_half_mj.jpeg';
import WeddingReceptionPhoto from '../assets/anniversary3/wedding_reception_mj.jpeg';
import WeddingDancePhoto from '../assets/anniversary3/mj_at_wedding.jpeg';
import BuckinghamPhoto from '../assets/anniversary3/buckingham_fountain_mj.jpeg';
import MontrealPhoto from '../assets/anniversary3/mj_in_montreal.jpeg';
import BoatPhoto from '../assets/anniversary3/mj_on_a_boat.jpeg';
import LakeInTheCloudsPhoto from '../assets/anniversary3/lake_in_the_clouds_mj.jpeg';

type Petal = {
	left: string;
	duration: string;
	delay: string;
	width: string;
	height: string;
};

type Photo = {
	src: string;
	alt: string;
	caption: string;
};

const petals: Petal[] = [
	{ left: '10%', duration: '12s', delay: '0s', width: '5px', height: '10px' },
	{ left: '25%', duration: '15s', delay: '2s', width: '7px', height: '14px' },
	{ left: '50%', duration: '11s', delay: '4s', width: '4px', height: '9px' },
	{ left: '70%', duration: '14s', delay: '1s', width: '6px', height: '11px' },
	{ left: '85%', duration: '13s', delay: '3s', width: '5px', height: '10px' },
	{ left: '40%', duration: '16s', delay: '5s', width: '4px', height: '8px' },
];

const photos: Photo[] = [
	{
		src: SleepingBearPhoto,
		alt: 'Sleeping Bear Dunes log slide',
		caption: 'Sleeping Bear Dunes adventures',
	},
	{
		src: GreatTurtlePhoto,
		alt: 'Great Turtle Trail Race finish',
		caption: 'Great Turtle Trail Race',
	},
	{
		src: WeddingReceptionPhoto,
		alt: 'Summer wedding reception',
		caption: 'Celebrating love with the best wedding date',
	},
	{
		src: WeddingDancePhoto,
		alt: 'Summer wedding celebration',
		caption: 'Dancing the night away',
	},
	{
		src: BuckinghamPhoto,
		alt: 'Buckingham Fountain Chicago',
		caption: 'Buckingham Fountain, Chicago nights',
	},
	{ src: MontrealPhoto, alt: 'Montreal Biosphere', caption: 'Montreal adventures' },
	{ src: BoatPhoto, alt: 'Boating on Burt Lake', caption: "Summer's at Burt Lake" },
	{
		src: LakeInTheCloudsPhoto,
		alt: 'Lake in the Clouds hike',
		caption: 'Lake in the Clouds, Porcupine Mountains',
	},
];

const HeroPetal: FC<{ petal: Petal }> = ({ petal }) => (
	<div
		className='heroPetal'
		style={{
			left: petal.left,
			animationDuration: petal.duration,
			animationDelay: petal.delay,
			width: petal.width,
			height: petal.height,
		}}
	/>
);

const PhotoItem: FC<{ photo: Photo }> = ({ photo }) => (
	<div className='photoItem'>
		<img src={photo.src} alt={photo.alt} />
		<div className='photoCaption'>{photo.caption}</div>
	</div>
);

const Anniversary: FC = () => {
	return (
		<div className='anniversaryPage'>
			{/* HERO */}
			<section className='hero'>
				<div className='heroBgTexture' />

				{petals.map((petal, i) => (
					<HeroPetal key={i} petal={petal} />
				))}

				<div className='heroInner'>
					<p className='heroEyebrow'>A Celebration of Us</p>
					<h1 className='heroTitle'>
						Happy
						<br />
						Anniversary
					</h1>
					<p className='heroYear'>❧ Three Years ❧</p>
					<div className='heroDivider' />
					<p className='heroSubtitle'>
						Every adventure, every laugh, every moment —
						<br />
						all of it, with you.
					</p>
				</div>
			</section>

			{/* PHOTOS */}
			<section className='sectionPhotos'>
				<p className='sectionLabel'>Our Story</p>
				<h2 className='sectionHeading'>Moments That Made Us</h2>

				<div className='photoMosaic'>
					{photos.map((photo, i) => (
						<PhotoItem key={i} photo={photo} />
					))}
				</div>
			</section>

			{/* MESSAGE */}
			<section className='sectionMessage'>
				<span className='messageOrnament'>— ✦ —</span>
				<p className='messageQuote'>Three years of choosing each other, every single day.</p>
				<div className='messageDivider' />
				<p className='messageBody'>
					From mountain summits to city nights, from finish lines to dance floors — every chapter
					has been better because you were in it. Here&rsquo;s to every memory we&rsquo;ve made, and
					every adventure still ahead of us. I love doing life with you.
				</p>
				<div className='messageDivider' />
				<p className='messageSignature'>With all my love, James ♡</p>
			</section>

			{/* FOOTER */}
			<footer className='anniversaryFooter'>Three years &nbsp;&middot;&nbsp; Together</footer>
		</div>
	);
};

export default Anniversary;
