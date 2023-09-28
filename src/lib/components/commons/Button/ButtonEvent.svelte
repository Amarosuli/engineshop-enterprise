<script>
	import { createEventDispatcher } from 'svelte';

	export let title = 'Button';
	export let disabled = false;
	export let hidden = false;
	export let classes = null;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Event', {
			status: 'event triggered',
			element: this
		});
	}
</script>

<!-- @component
## ButtonEvent.svelte

- A component that repeats text a specific number of times.

### Example

```svelte
<script>
	import ButtonEvent from "$lib/components/commons/Button/ButtonEvent.svelte";
</script>

<Repeat text="Repeat this" numberOfTimes={3} />
```
 -->

<button type="button" class:!hidden={hidden} {disabled} class={classes ? classes : 'btn btn_event'} on:click|stopPropagation={handleClick}>{title}<slot /></button>
