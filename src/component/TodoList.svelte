<script lang="ts">
	import type { TodoType } from "../routes/todo";

    export let store: any;
    export let done: boolean;
    export let todos: TodoType[];
</script>

<ul>
    {#each todos.filter((todo) => todo.done === done) as todo (todo.id)}
    <li class:done>
        <div>
            <input type="checkbox" checked={todo.done}
            on:change={(e) => store.mark(todo, e.currentTarget.checked)} />
            
            <p style="margin: 0;">{todo.description}</p>
        </div>

        <button on:click={(e) => store.remove(todo)}>X</button>
    </li>
    {/each}
</ul>

<style>
    li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        /* border: 1px solid grey; */
        border-radius: 8px;
        box-shadow: 0px 0px 10px #eaeaea;
    }
    li > div {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
    }
    li.done {
        color: #707070;
        background-color: #f3f6f4;
        pointer-events: none;
    }
    li.done button {
        color: #707070;

    }
    button {
        border: 0;
        background-color: inherit;
    }
</style>