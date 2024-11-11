export const Navbar: React.FC = () => {
	return (
		<nav className='navbar'>
			<ul>
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
		</nav>
	);
};
