import { useState, type FormEvent, type ReactNode } from 'react';

interface ProtectedRouteProps {
	children: ReactNode;
	sessionKey?: string;
	password?: string;
}

const DEFAULT_SESSION_KEY = 'anniversary_authenticated';
const DEFAULT_PASSWORD = import.meta.env.VITE_ANNIVERSARY_PASSWORD;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	sessionKey = DEFAULT_SESSION_KEY,
	password: routePassword = DEFAULT_PASSWORD,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		() => sessionStorage.getItem(sessionKey) === 'true',
	);
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (password === routePassword) {
			sessionStorage.setItem(sessionKey, 'true');
			setIsAuthenticated(true);
			setError('');
		} else {
			setError('Incorrect password. Try again.');
			setPassword('');
		}
	};

	if (isAuthenticated) {
		return <>{children}</>;
	}

	return (
		<div className='protectedGate'>
			<form className='protectedForm' onSubmit={handleSubmit}>
				<span className='protectedOrnament'>❧</span>
				<h1 className='protectedTitle'>Private Page</h1>
				<p className='protectedSubtitle'>Enter the password to continue</p>
				<input
					className='protectedInput'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
					autoFocus
				/>
				{error && <p className='protectedError'>{error}</p>}
				<button className='protectedButton' type='submit'>
					Enter
				</button>
			</form>
		</div>
	);
};
