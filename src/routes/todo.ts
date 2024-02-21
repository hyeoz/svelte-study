import { writable } from 'svelte/store';

export type TodoType = {
	id: number;
	done: boolean;
	description: string;
};

export function createTodoStore(initial: Array<{ done: boolean; description: string }>) {
	let uid = 1;

	const todos = initial.map(({ done, description }) => {
		return {
			id: uid++,
			done,
			description
		};
	});

	const { subscribe, update } = writable(todos);

	return {
		subscribe,
		add: (description: string) => {
			const todo = {
				id: uid++,
				done: false,
				description
			};
			update(($todos) => [...$todos, todo]);
		},
		remove: (todo: TodoType) => {
			update(($todos) => $todos.filter((t) => t !== todo));
		},
		mark: (todo: TodoType, done: boolean) => {
			update(($todos) => [...$todos.filter((t) => t !== todo), { ...todo, done }]);
		}
	};
}
