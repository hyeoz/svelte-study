<script lang="ts">
	import type { TodoType } from "../routes/todo";
    import {fly, fade} from 'svelte/transition'
    import {flip} from 'svelte/animate'

    export let store: any;
    export let done: boolean;
    export let todos: TodoType[];
</script>

{#if ![...todos].filter((t) => !t.done).length && !done}
<p style="text-align: center;">Everything is Done!</p>
{:else}
<ul>
    {#each todos.filter((todo) => todo.done === done).sort((a,b) => a.id - b.id) as todo (todo.id)}
    <li class:done in:fly out:fade animate:flip>
        <div>
            <input type="checkbox" checked={todo.done}
            on:change={(e) => store.mark(todo, e.currentTarget.checked)} />
            
            <p style="margin: 0;">{todo.description}</p>
        </div>

        <button on:click={(e) => store.remove(todo)}>X</button>
    </li>
    {/each}
</ul>
{/if}

<style>
    ul {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border: 1px solid grey;
        border-radius: 8px;
    }
    li > div {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        gap: 8px;
    }
    li.done {
        color: #707070;
        background-color: #f3f6f4;
        border: 0;
        box-shadow: 0px 0px 10px #eaeaea;
    }
    li.done button {
        color: #707070;

    }
    button {
        border: 0;
        background-color: inherit;
    }
</style>