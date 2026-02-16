import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const closeMenu = () => setIsOpen(false);

	// Disable body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<nav className='navbar'>
			{/* Hamburger icon - visible on mobile only */}
			<button className='navbar__hamburger' onClick={toggleMenu} aria-label='Toggle menu'>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Desktop navigation - visible on larger screens */}
			<ul className='navbar__desktop'>
				<li>
					<a href='/#about' className='link-nav'>
						About
					</a>
				</li>
				<li>
					<a href='/#projects' className='link-nav'>
						Projects
					</a>
				</li>
				<li>
					<a href='/#contact' className='link-nav'>
						Contact
					</a>
				</li>
			</ul>

			{/* Mobile drawer - visible on mobile only */}
			{isOpen && <div className='navbar__overlay' onClick={closeMenu} />}
			<div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
				<ul>
					<li>
						<a href='/#about' className='link-nav' onClick={closeMenu}>
							About
						</a>
					</li>
					<li>
						<a href='/#projects' className='link-nav' onClick={closeMenu}>
							Projects
						</a>
					</li>
					<li>
						<a href='/#contact' className='link-nav' onClick={closeMenu}>
							Contact
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
