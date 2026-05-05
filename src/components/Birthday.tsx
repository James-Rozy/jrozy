import { useState, useEffect, useRef, useCallback, type FC } from 'react';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	r: number;
	g: number;
	b: number;
	alpha: number;
	life: number;
	decay: number;
	gravity: number;
	drag: number;
}

const PALETTE: [number, number, number][] = [
	[0.80, 0.16, 0.21], // fiesta red
	[0.10, 0.50, 0.30], // mexico green
	[0.75, 0.45, 0.00], // amber gold
	[0.82, 0.32, 0.03], // burnt orange
	[0.62, 0.52, 0.00], // olive yellow
	[0.78, 0.08, 0.32], // deep pink
	[0.42, 0.14, 0.52], // purple
	[0.08, 0.38, 0.62], // sky blue
	[0.52, 0.08, 0.08], // dark crimson
];

const MAX = 4000;

const PinataSVG: FC<{ clicks: number }> = ({ clicks }) => (
	<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
		{/* Rope */}
		<path d="M 100 5 C 96 12 104 20 100 30" stroke="#A08020" strokeWidth="3" fill="none" strokeLinecap="round" />
		<path d="M 100 5 C 104 12 96 20 100 30" stroke="#C4A030" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />

		{/* 5 conical arms */}
		{/* Top — red */}
		<polygon points="100,35 69,88 131,88" fill="#CC2936" />
		<line x1="92" y1="44" x2="82" y2="82" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />
		<line x1="108" y1="44" x2="118" y2="82" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />

		{/* Upper-right — gold */}
		<polygon points="181,104 131,88 150,146" fill="#F5A623" />
		<line x1="174" y1="110" x2="142" y2="118" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

		{/* Lower-right — green */}
		<polygon points="150,199 150,146 100,182" fill="#2D8B5A" />
		<line x1="148" y1="183" x2="128" y2="162" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

		{/* Lower-left — purple */}
		<polygon points="50,199 100,182 51,146" fill="#7B2D8B" />
		<line x1="52" y1="183" x2="72" y2="162" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

		{/* Upper-left — blue */}
		<polygon points="19,104 69,88 51,146" fill="#1A6FA5" />
		<line x1="26" y1="110" x2="58" y2="118" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

		{/* Body — quadrant sections */}
		<path d="M 100 78 A 52 52 0 0 0 48 130 L 100 130 Z" fill="#2D8B5A" />
		<path d="M 100 78 A 52 52 0 0 1 152 130 L 100 130 Z" fill="#F5A623" />
		<path d="M 48 130 A 52 52 0 0 0 100 182 L 100 130 Z" fill="#CC2936" />
		<path d="M 152 130 A 52 52 0 0 1 100 182 L 100 130 Z" fill="#E05820" />
		<circle cx="100" cy="130" r="52" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

		{/* Star decoration on body */}
		<polygon
			points="100,111 104,120 113,121 106,127 108,136 100,131 92,136 94,127 87,121 96,120"
			fill="rgba(255,220,50,0.88)"
		/>

		{/* Highlight */}
		<ellipse cx="84" cy="108" rx="11" ry="7" fill="rgba(255,255,255,0.22)" transform="rotate(-25 84 108)" />

		{/* Crack overlays */}
		{clicks >= 1 && (
			<g stroke="#2a0e00" strokeWidth="1.8" fill="none" strokeLinecap="round">
				<path d="M 118 108 L 125 116 L 121 123" />
			</g>
		)}
		{clicks >= 2 && (
			<g stroke="#1a0800" strokeWidth="1.8" fill="none" strokeLinecap="round">
				<path d="M 76 122 L 68 114 L 64 120" />
				<path d="M 105 153 L 109 162" />
			</g>
		)}
		{clicks >= 3 && (
			<g stroke="#140500" strokeWidth="2" fill="none" strokeLinecap="round">
				<path d="M 88 90 L 84 104 L 91 116 L 85 129" />
				<path d="M 117 97 L 123 87 L 119 83" />
			</g>
		)}
		{clicks >= 4 && (
			<g stroke="#0a0300" strokeWidth="2.2" fill="none" strokeLinecap="round">
				<path d="M 68 112 L 58 100 L 52 107 L 46 98" />
				<path d="M 133 122 L 143 132 L 149 124 L 155 131" />
				<path d="M 94 173 L 88 183 L 95 187" />
				<path d="M 100 78 L 97 91 L 104 96 L 100 106" />
				<circle cx="100" cy="130" r="52" fill="none" stroke="rgba(255,140,40,0.35)" strokeWidth="3" strokeDasharray="4 3" />
			</g>
		)}
	</svg>
);

const Birthday: FC = () => {
	const [atCard, setAtCard] = useState(false);
	const [clicks, setClicks] = useState(0);
	const [exploded, setExploded] = useState(false);
	const [wobbleKey, setWobbleKey] = useState(0);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pinataRef = useRef<HTMLDivElement>(null);
	const glRef = useRef<WebGLRenderingContext | null>(null);
	const particlesRef = useRef<Particle[]>([]);
	const animRef = useRef<number>(0);
	const burstTimerRef = useRef({ last: 0, next: 900 });
	const atCardRef = useRef(false);
	const progRef = useRef<{
		bufs: [WebGLBuffer, WebGLBuffer, WebGLBuffer];
		locs: { pos: number; size: number; col: number; res: WebGLUniformLocation };
	} | null>(null);
	const arrRef = useRef({
		pos: new Float32Array(MAX * 2),
		size: new Float32Array(MAX),
		col: new Float32Array(MAX * 4),
	});

	useEffect(() => {
		atCardRef.current = atCard;
	}, [atCard]);

	const launchBurst = useCallback((xPct?: number, yPct?: number, count = 45) => {
		if (!glRef.current) return;
		const W = window.innerWidth, H = window.innerHeight;
		const cx = (xPct ?? Math.random()) * W;
		const cy = (yPct ?? (0.1 + Math.random() * 0.75)) * H;
		const primary = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		const secondary = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		const speed = (1.5 + Math.random() * 3.5) * (W / 1440);

		for (let i = 0; i < count; i++) {
			const angle = Math.PI * 2 * (i / count) + (Math.random() - 0.5) * 0.4;
			const vel = speed * (0.5 + Math.random() * 0.9);
			const col = Math.random() < 0.65 ? primary : secondary;
			particlesRef.current.push({
				x: cx, y: cy,
				vx: Math.cos(angle) * vel,
				vy: Math.sin(angle) * vel - 0.3,
				size: (10 + Math.random() * 18) * (W / 1440),
				r: col[0], g: col[1], b: col[2],
				alpha: 0.9 + Math.random() * 0.1,
				life: 1.0,
				decay: 0.007 + Math.random() * 0.01,
				gravity: 0.04 + Math.random() * 0.04,
				drag: 0.97 + Math.random() * 0.015,
			});
		}
	}, []);

	const triggerExplosion = useCallback(() => {
		const el = pinataRef.current;
		let xPct = 0.5, yPct = 0.38;
		if (el) {
			const r = el.getBoundingClientRect();
			xPct = (r.left + r.width / 2) / window.innerWidth;
			yPct = (r.top + r.height / 2) / window.innerHeight;
		}
		for (let wave = 0; wave < 6; wave++) {
			setTimeout(() => launchBurst(xPct, yPct, 95), wave * 80);
		}
	}, [launchBurst]);

	const handlePinataClick = () => {
		if (exploded) return;
		const next = clicks + 1;
		setClicks(next);
		setWobbleKey(k => k + 1);
		if (next >= 5) {
			setExploded(true);
			triggerExplosion();
		}
	};

	// Body styles + WebGL
	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		const prevBg = document.body.style.background;
		document.body.style.overflow = 'hidden';
		document.body.style.background =
			'radial-gradient(ellipse at 25% 20%, rgba(255, 210, 160, 0.28) 0%, transparent 55%), radial-gradient(ellipse at 78% 80%, rgba(160, 230, 190, 0.22) 0%, transparent 55%), #fefaf5';

		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true });
		if (!gl) return;
		glRef.current = gl;

		const resize = () => {
			canvas.width = window.innerWidth * devicePixelRatio;
			canvas.height = window.innerHeight * devicePixelRatio;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			gl.viewport(0, 0, canvas.width, canvas.height);
		};
		resize();
		window.addEventListener('resize', resize);

		const VS = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec4 a_color;
      uniform vec2 u_resolution;
      varying vec4 v_color;
      void main() {
        vec2 cs = (a_position / u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(cs.x, -cs.y, 0.0, 1.0);
        gl_PointSize = a_size;
        v_color = a_color;
      }
    `;
		const FS = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float d = dot(uv, uv);
        if (d > 1.0) discard;
        float alpha = smoothstep(1.0, 0.4, d);
        gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
      }
    `;

		const mkShader = (type: number, src: string) => {
			const s = gl.createShader(type)!;
			gl.shaderSource(s, src);
			gl.compileShader(s);
			return s;
		};
		const prog = gl.createProgram()!;
		gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
		gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
		gl.linkProgram(prog);
		gl.useProgram(prog);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		progRef.current = {
			bufs: [gl.createBuffer()!, gl.createBuffer()!, gl.createBuffer()!],
			locs: {
				pos: gl.getAttribLocation(prog, 'a_position'),
				size: gl.getAttribLocation(prog, 'a_size'),
				col: gl.getAttribLocation(prog, 'a_color'),
				res: gl.getUniformLocation(prog, 'u_resolution')!,
			},
		};

		// Opening salvo
		([[0.25, 0.3], [0.5, 0.22], [0.75, 0.35], [0.4, 0.6], [0.65, 0.5], [0.12, 0.55], [0.88, 0.28]] as [number, number][])
			.forEach(([x, y], i) => setTimeout(() => launchBurst(x, y, 50), i * 220 + 700));

		const handleClick = (e: MouseEvent) => {
			const t = e.target as Element;
			if (
				t.closest('.pinataClickable') ||
				t.closest('.bdayScrollBtn') ||
				t.closest('.bdayBackBtn')
			) return;
			launchBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight, 30);
		};
		window.addEventListener('click', handleClick);

		const { pos: posArr, size: sizeArr, col: colArr } = arrRef.current;
		let lastTime = 0;

		const frame = (now: number) => {
			const dt = Math.min(now - lastTime, 50);
			lastTime = now;

			const bt = burstTimerRef.current;
			bt.last += dt;
			if (bt.last >= bt.next) {
				bt.last = 0;
				launchBurst(undefined, undefined, 38);
				if (Math.random() < 0.3) setTimeout(() => launchBurst(undefined, undefined, 28), 120 + Math.random() * 180);
				bt.next = 800 + Math.random() * 1400;
			}

			particlesRef.current = particlesRef.current.filter(p => p.life > 0.01);
			const n = Math.min(particlesRef.current.length, MAX);

			for (let i = 0; i < n; i++) {
				const p = particlesRef.current[i];
				p.x += p.vx; p.y += p.vy;
				p.vy += p.gravity;
				p.vx *= p.drag; p.vy *= p.drag;
				p.life -= p.decay;
				const l = Math.max(p.life, 0);
				posArr[i * 2] = p.x * devicePixelRatio;
				posArr[i * 2 + 1] = p.y * devicePixelRatio;
				sizeArr[i] = p.size * l * devicePixelRatio;
				colArr[i * 4] = p.r; colArr[i * 4 + 1] = p.g;
				colArr[i * 4 + 2] = p.b; colArr[i * 4 + 3] = p.alpha * l;
			}

			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);

			if (n > 0 && progRef.current) {
				const { locs, bufs } = progRef.current;
				gl.uniform2f(locs.res, canvas.width, canvas.height);

				gl.bindBuffer(gl.ARRAY_BUFFER, bufs[0]);
				gl.bufferData(gl.ARRAY_BUFFER, posArr.subarray(0, n * 2), gl.DYNAMIC_DRAW);
				gl.enableVertexAttribArray(locs.pos);
				gl.vertexAttribPointer(locs.pos, 2, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ARRAY_BUFFER, bufs[1]);
				gl.bufferData(gl.ARRAY_BUFFER, sizeArr.subarray(0, n), gl.DYNAMIC_DRAW);
				gl.enableVertexAttribArray(locs.size);
				gl.vertexAttribPointer(locs.size, 1, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ARRAY_BUFFER, bufs[2]);
				gl.bufferData(gl.ARRAY_BUFFER, colArr.subarray(0, n * 4), gl.DYNAMIC_DRAW);
				gl.enableVertexAttribArray(locs.col);
				gl.vertexAttribPointer(locs.col, 4, gl.FLOAT, false, 0, 0);

				gl.drawArrays(gl.POINTS, 0, n);
			}

			animRef.current = requestAnimationFrame(frame);
		};

		animRef.current = requestAnimationFrame(frame);

		return () => {
			document.body.style.overflow = prevOverflow;
			document.body.style.background = prevBg;
			window.removeEventListener('resize', resize);
			window.removeEventListener('click', handleClick);
			cancelAnimationFrame(animRef.current);
		};
	}, [launchBurst]);

	// Scroll / swipe navigation
	useEffect(() => {
		const lock = { active: false };

		const go = (dir: 'down' | 'up') => {
			if (lock.active) return;
			lock.active = true;
			setTimeout(() => { lock.active = false; }, 1200);
			if (dir === 'down') setAtCard(true);
			else setAtCard(false);
		};

		const handleWheel = (e: WheelEvent) => {
			if (e.deltaY > 0 && !atCardRef.current) go('down');
			else if (e.deltaY < 0 && atCardRef.current) go('up');
		};

		let touchStart: number | null = null;
		const handleTouchStart = (e: TouchEvent) => { touchStart = e.touches[0].clientY; };
		const handleTouchEnd = (e: TouchEvent) => {
			if (touchStart === null) return;
			const delta = touchStart - e.changedTouches[0].clientY;
			touchStart = null;
			if (Math.abs(delta) < 50) return;
			if (delta > 0 && !atCardRef.current) go('down');
			else if (delta < 0 && atCardRef.current) go('up');
		};

		window.addEventListener('wheel', handleWheel, { passive: true });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, []);

	return (
		<div className="birthdayPage">
			<canvas ref={canvasRef} className="bdayCanvas" />
			<div className="bdayNoise" />
			<div className="bdayGlowOrb bdayGlowOrb1" />
			<div className="bdayGlowOrb bdayGlowOrb2" />
			<div className="bdayGlowOrb bdayGlowOrb3" />
			<div className="bdayFrame" />
			<span className="bdayOrnament bdayOrnamentTL">💀</span>
			<span className="bdayOrnament bdayOrnamentTR">💀</span>
			<span className="bdayOrnament bdayOrnamentBL">💀</span>
			<span className="bdayOrnament bdayOrnamentBR">💀</span>

			<div className="bdayViewport">
				<div className={`bdaySlider${atCard ? ' atCard' : ''}`}>

					{/* ── Hero Slide ── */}
					<section className="bdaySlide">
						<div className="bdayHeroContent">
							<p className="bdayEyebrow">Feliz Cinco de Mayo</p>
							<h1 className="bdayTitle">Happy Birthday</h1>
							<div className="bdayDivider">
								<span className="bdayDividerLine" />
								<span className="bdayDividerIcon">🎉</span>
								<span className="bdayDividerLine" />
							</div>
							<p className="bdayName">Mego</p>
						</div>

						<div className="pinataZone">
							{!exploded ? (
								<div ref={pinataRef} className="pinataClickable" onClick={handlePinataClick}>
									<div
										key={wobbleKey}
										className={wobbleKey > 0 ? 'pinataHitWrap' : 'pinataIdleWrap'}
									>
										<div className="pinataSvgContainer">
											<PinataSVG clicks={clicks} />
										</div>
									</div>
									<p className="pinataHint">
										{clicks === 0
											? '¡Dale! 🪅'
											: clicks < 4
												? `${5 - clicks} more!`
												: 'One more! 😱'}
									</p>
								</div>
							) : (
								<div className="ringReveal">
									<div className="ringCard">
										<p className="ringEyebrow">You've unlocked...</p>
										<h3 className="ringTitle">💍 A Ring Shopping Date 💍</h3>
										<div className="ringCardDivider">
											<span className="ringCardDividerLine" />
											<span className="ringCardDividerOrnament">✦ ✦ ✦</span>
											<span className="ringCardDividerLine" />
										</div>
										<p className="ringBody">
											You're officially invited to pick your favorite jewelry store —
											we'll spend the afternoon finding something as beautiful as you are.
											Dinner follows at whatever restaurant your heart desires.
										</p>
										<p className="ringNote">Your choice. Your day. All yours. 🌸</p>
									</div>
								</div>
							)}
						</div>

						<button
							className="bdayScrollBtn"
							aria-label="Read my message for you"
							onClick={(e) => { e.stopPropagation(); setAtCard(true); }}
						>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M4 7L10 13L16 7"
									stroke="rgba(100,45,8,0.75)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</section>

					{/* ── Card Slide ── */}
					<section className="bdaySlide">
						<div className="bdayCard">
							<p className="bdayCardTo">for you, on your birthday</p>
							<h2 className="bdayCardSalutation">My Dearest Mego,</h2>
							<div className="bdayCardDivider">
								<span className="bdayCardDividerLine" />
								<span className="bdayCardDividerOrnament">♥ ♥ ♥</span>
								<span className="bdayCardDividerLine" />
							</div>
							<div className="bdayCardBody">
								<p>
									You are, simply put, the most remarkable woman I have ever known.
									The way you move through this world — with so much heart, so much purpose,
									so much grace — takes my breath away every time I stop to really take it all in.
								</p>
								<p>
									You inspire me more than you know. Your dedication — to your health, to your career,
									to the people around you — sets a standard I aspire to every single day.
									Watching you commit so fully to yourself, refuse to settle, and pour your whole self
									into everything you do makes me want to be a better man. Not because I have to.
									Because you make it feel worth it.
								</p>
								<p>
									I love you more than I know how to say. You're my favorite person,
									my greatest adventure, and the reason every day feels like something worth showing up for.
									Happy birthday, Mego — here's to every incredible, wonderful, inspiring part of you.
								</p>
							</div>
							<div className="bdayCardClosingDivider">· · ·</div>
							<p className="bdayCardClosing">With all my love,</p>
							<p className="bdayCardSignature">James</p>
						</div>

						<button
							className="bdayBackBtn"
							aria-label="Go back"
							onClick={(e) => { e.stopPropagation(); setAtCard(false); }}
						>
							<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
								<path
									d="M16 13L10 7L4 13"
									stroke="rgba(100,45,8,0.75)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</section>

				</div>
			</div>
		</div>
	);
};

export default Birthday;
