<script>
	import Header from '../component/Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p style="margin-bottom: 0;">visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		<p style="margin-top: 0;">visit <a href="/info">info</a> to learn routing</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: bisque;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: white;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
