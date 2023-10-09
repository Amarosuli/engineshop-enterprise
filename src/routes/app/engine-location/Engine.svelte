<script>
	import { fade } from 'svelte/transition';
	export let engine;
	export let defaultPosition;

	let { _location, esn } = engine;

	let id = _location?.id;
	let x = _location ? _location?.position?.x : defaultPosition.x;
	let y = _location ? _location?.position?.y : defaultPosition.y;
	let isGrabbing = false;

	/**
	 * Add interactivity :
	 * when mounted (animate)
	 * when it selected (show option to see detail engine)
	 * when it moving (change bg color)
	 * when it moving as client (disable user action : select, drag, etc.)
	 * when destroy (animate)
	 * */
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	transition:fade
	{id}
	data-x={x}
	data-y={y}
	on:click
	on:pointerdown={() => (isGrabbing = true)}
	on:pointerup={() => (isGrabbing = false)}
	on:pointerout={() => (isGrabbing = false)}
	class:cursor-grabbing={isGrabbing}
	class:z-40={isGrabbing}
	class="engine {engine.id} cursor-grab">
	<span class="text-center text-[4px] break-words text-white">ESN {esn}</span>
</div>

<style>
	.engine {
		@apply absolute flex h-2 w-8 select-none items-center justify-center rounded bg-slate-600 p-3 shadow-lg;
	}
</style>
