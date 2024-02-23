<script lang="ts">
	import type { TodoType } from "../routes/todo";
    import {fly, fade} from 'svelte/transition'
    import {flip} from 'svelte/animate'

    export let store: any;
    export let done: boolean;
    export let todos: TodoType[];

    let _order: number[];
    let _todos: TodoType[];

    let floatId: number;
    let overId: number;

    $: {
        // 스코프 안에 있어야 변화 감지
        _todos = todos.filter((todo) => todo.done === done)
        _order = [...todos.map((t) => t.id)]
    }
    
    const onDragStart = (id: number) => {
        floatId = id
    }
    const onDragOver = (event: any) => {
        overId = +event.toElement.id
    }
    const onDragEnd = () => {
        const overIndex = _order.findIndex((o) => o === overId);
        const scoped = [..._order].filter((f) => f !== floatId);
        let slicedOrder = [...scoped.slice(0, overIndex), floatId ,...scoped.slice(overIndex)];
        _order = [...slicedOrder]
    }
</script>

{#if !_todos.filter((t) => !t.done).length && !done}
    <p style="text-align: center;">Everything is Done!</p>
{:else}
    <ul>
        {#each _todos.sort((a,b) => _order.findIndex(i => i === a.id) - _order.findIndex(i => i ===b.id)) as todo (todo.id)}
        <li 
            class:done 
            in:fly 
            out:fade 
            animate:flip
            id={todo.id+''}
            on:dragstart={() => onDragStart(todo.id)} 
            on:dragover={onDragOver}
            on:dragend={onDragEnd} 
            draggable={true}
        >
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