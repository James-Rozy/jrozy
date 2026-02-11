import { useState, type FormEvent, type ReactNode } from 'react';

interface ProtectedRouteProps {
	children: ReactNode;
}

const SESSION_KEY = 'anniversary_authenticated';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		() => sessionStorage.getItem(SESSION_KEY) === 'true',
	);
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (password === import.meta.env.VITE_ANNIVERSARY_PASSWORD) {
			sessionStorage.setItem(SESSION_KEY, 'true');
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
