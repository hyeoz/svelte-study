<script lang="ts">
	import {createTodoStore} from './todo'
	import TodoList from '../component/TodoList.svelte'

	let todos = createTodoStore([
		{
		description: 'test',
		done: false}
	])
	let inputValue = ''
</script>

<svelte:head>
	<title>TODO</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<input bind:value={inputValue} on:keypress|stopPropagation={(e) => {
		if (e.key === 'Enter') {
			todos.add(inputValue)
			inputValue = ''
		}
	}}
	placeholder="add something to do" />

	<div class="todos-wrapper">
		<div>
			<h1>todo</h1>
			<TodoList store={todos} todos={$todos} done={false} />
		</div>
		<div>
			<h1>done</h1>
			<TodoList store={todos} todos={$todos} done={true} />
		</div>
	</div>
</section>

<style>
	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding-top: 40px;
	}
	div {
		width: 100%;
	}
	h1 {
		width: 100%;
	}
	input {
		width: 300px;
		border-radius: 4px;
		padding: 16px;
		font-size: 18px;
		font-weight: 600;
	}
	input:focus-visible {
		outline: none;
	}

	.todos-wrapper {
		flex-grow: 1;
		max-width: 800px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
</style>
