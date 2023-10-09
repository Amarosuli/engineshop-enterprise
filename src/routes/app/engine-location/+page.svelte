<script>
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { CommonSets } from '$lib/utils/CommonSets';
	import Engine from './Engine.svelte';

	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import { Draggable } from '@neodrag/vanilla';
	import Panzoom from '@panzoom/panzoom';

	export let data;

	let { engineList, engineLocation } = data;
	let engineTile = writable([]); // extend function to remove by id and add new data (or use invalidate)

	// $: console.log(engineList);
	$engineTile = engineList.map((value) => ({ ...value, _location: engineLocation.find(({ engine_id }) => engine_id === value.id) || null }));

	let pz,
		locationTags,
		baseElement,
		engineElement,
		engineInstance = [],
		togglePillar = false,
		toggleArea = false,
		isNeoActive = true,
		loadingMap = true;

	$: initialBasePosition = '';

	/**
	 * this page should implement loader | CLOSED
	 * map structure : base - area (include road) - pillars - engine
	 * base map should have default position to center of screen
	 * default event panzoom is active | CLOSED
	 * use toggler to move engine (deactivated panzoom) or use Shift Key | CLOSED
	 *
	 * When Engine Create, there's 3 step to do: Create Data in engine_list, Create Data in engine_availability, and Create Data in engine_location (with default value {x: 45, y:23}) it will increase work in initial data, but for this map will be simpler | CLOSED
	 */

	function isCollide(a, b) {
		let aRect = a.getBoundingClientRect();
		let bRect = b.getBoundingClientRect();

		/** @TODO
		 * Calculation implement of how much precentage of area is collide
		 */

		return !(aRect.y + aRect.height < bRect.y || aRect.y > bRect.y + bRect.height || aRect.x + aRect.width < bRect.x || aRect.x > bRect.x + bRect.width);
	}

	function neoSwitcher(e, val) {
		if (val === 'on') {
			if (e.shiftKey) {
				isNeoActive = false;
			}
		}
		if (val === 'off') isNeoActive = true;
	}

	async function updateData(data) {
		const formData = new FormData();
		formData.append('id', data.id);
		formData.append('x', data.position.x);
		formData.append('y', data.position.y);
		formData.append('location', data.location);

		const res = await fetch('/app/engine-location?/update', {
			method: 'POST',
			body: formData
		});
		const json = await res.json();

		neoSwitcher('', 'off');
	}

	function onDrag(e) {
		let currentEl = e.currentNode;
		currentEl.classList.add('!bg-red-400');
	}

	function onDragEnd(e) {
		let lastPosition = { x: e.offsetX, y: e.offsetY };
		let currentEl = e.currentNode;

		currentEl.classList.remove('!bg-red-400');

		// Check Collision - GSAP is perfect but just use it for a while
		let inArea = [];
		locationTags.forEach((area) => {
			if (isCollide(area, currentEl)) {
				if (area !== undefined) {
					inArea.push(area.id);
				}
			}
		});

		// Update the position data
		let engineLocationData = {
			id: currentEl.id,
			position: lastPosition,
			location: inArea.toString()
		};

		updateData(engineLocationData);

		inArea = [];
	}

	function updatePosition(elementId, newPosition) {
		/**
		 * Try to check element status
		 * if it 'user-select' (which mean it was user actions) just return
		 * if it 'non user-select' (which mean it was on client and receive the realtime event) continue to update position
		 */
		let target = engineInstance.find(({ id }) => id === elementId);
		target.instance.updateOptions({ position: newPosition });
	}

	function updateOnDelete(e) {
		/**
		 * Delete engine element from DOM
		 *(I think to remove related data from engineTile Store) remove data from store -> element removed
		 * So we dont have to remove manually
		 * */
		console.log('::DELETE::\n', e);
	}

	function updateOnCreate(e) {
		loadingMap = true;
		invalidateAll();

		/**
		 * Creating engine element to DOM
		 *(I think to add new data to engineTile Store) add data to store -> render -> create instance
		 * So we dont have to render manually
		 * */
		console.log('::CREATE::\n', e);
	}

	function showEngineDetail(e, engineData) {
		if (e.ctrlKey) console.log(engineData);
	}

	onMount(async () => {
		initialBasePosition = window.innerWidth / 6;
		locationTags = document.querySelectorAll('.location-tag');
		engineElement = document.querySelectorAll('.engine');
		baseElement = document.getElementById('base');

		/**
		 * Try to change this
		 * Current process : render element -> element set x and y to 0 -> query element -> create instance in Array -> element set actual position
		 * Maybe better if creating instance is before rendering element. It should make the element rendered to actual position at the first time
		 * I think it was impossible, because the actual position is need to calculate the document. so it must waiting for document render first
		 */

		engineElement.forEach((eng) => {
			let engPosition = { x: eng.dataset.x, y: eng.dataset.y };
			// onDrag: onDrag to perform update at the drag end, onDrag: onDragEnd to perform update at the dragging
			engineInstance.push({ id: eng.id, instance: new Draggable(eng, { position: engPosition, bounds: 'parent', onDragEnd: onDragEnd, onDrag: onDragEnd }) });
		});

		pz = Panzoom(baseElement, {
			noBind: true,
			maxscale: 5
		});

		baseElement.addEventListener('pointerdown', (e) => {
			if (e.shiftKey) return;
			if (!isNeoActive) return;
			pz.handleDown(e);
		});

		baseElement.parentElement.addEventListener('wheel', (e) => {
			if (e.shiftKey) return;
			if (!isNeoActive) return;
			pz.zoomWithWheel(e);
		});

		baseElement.parentElement.addEventListener('click', (e) => {
			if (!e.altKey) return;
			pz.zoomToPoint(3, e, { animate: true });
		});

		CommonHelpers.pb.collection('engine_location').subscribe('*', function (e) {
			let { action, record } = e;

			switch (action) {
				case 'create':
					updateOnCreate(e);
					break;
				case 'update':
					let { id, position } = record;
					updatePosition(id, position);
					break;
				case 'delete':
					updateOnDelete(e);
					break;
				default:
					break;
			}
		});

		loadingMap = false;
	});
</script>

<svelte:document on:keydown|capture={(e) => neoSwitcher(e, 'on')} on:keyup={(e) => neoSwitcher(e, 'off')} on:pointermove={pz.handleMove} on:pointerup={pz.handleUp} />
{#if loadingMap}
	<div transition:fade={{ duration: 200 }} class="inset-0 justify-center backdrop-blur-sm bg-white/70 items-center flex gap-4 absolute z-[100] w-full h-full text-2xl font-bold">
		<svg role="status" class="inline -mt-px animate-spin dark:text-gray-600 fill-blue-600 w-10 text-slate-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor" />
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill" />
		</svg>
		<!-- <span class="text-slate-100 font-semibold text-sm">Loading . . .</span> -->
	</div>
{/if}

<!-- Set of actions -->
<div class="absolute z-40 -right-0 bottom-1/2 transition-all w-8 hover:w-32 bg-sky-400 py overflow-hidden rounded-l-lg shadow-lg">
	<div class="flex flex-col px-3 py-4 space-y-4 text-xxs">
		<button on:click={() => (toggleArea = !toggleArea)} class=" px-4 py-2 w-24 rounded-md shadow-md hover:bg-orange-400 bg-orange-300">{toggleArea ? 'Show' : 'Hide'} Area</button>
		<button on:click={() => (togglePillar = !togglePillar)} class=" px-4 py-2 w-24 rounded-md shadow-md hover:bg-orange-400 bg-orange-300">{togglePillar ? 'Show' : 'Hide'} Pillar</button>
		<button on:click={() => (isNeoActive = !isNeoActive)} class=" px-4 py-2 w-24 rounded-md shadow-md hover:bg-red-400 bg-red-300">Move {isNeoActive ? 'Off' : 'On'} </button>
		<button on:click={pz.reset()} class="px-4 py-2 w-24 rounded-md shadow-md hover:bg-sky-400 bg-sky-300">Reset View</button>
	</div>
</div>

<div class="absolute space-y-2 z-40 right-4 bottom-4 bg-slate-700 opacity-30 hover:opacity-80 transition-opacity ease-out select-none rounded hover:shadow-lg px-4 py-3">
	<p class="text-xs text-white font-semibold">Scroll to zoom</p>
	<p class="text-xs text-white font-semibold">Click + Drag to move Map</p>
	<p class="text-xs text-white font-semibold">Shift + Drag to move Engine</p>
	<p class="text-xs text-white font-semibold">Alt + Click to zoom to target</p>
</div>

<!-- Map -->
<div class="manage-container overflow-auto bg-teal-300">
	<div id="base" class="base" style="height: {CommonSets.tileSize * 16}px; width: {CommonSets.tileSize * 10}px; margin-left: {initialBasePosition}px; margin-top: {CommonSets.tileSize / 2}px;">
		<!-- BASE -->
		{#each CommonSets.Base as row, rowIndex}
			{#each row as col, colIndex}
				{#if col !== '0'}
					<svelte:element
						this="div"
						class="map-base"
						style="margin-left: {CommonSets.tileSize * colIndex}px; margin-top: {CommonSets.tileSize * rowIndex}px; height: {CommonSets.tileSize}px; width: {CommonSets.tileSize}px;">
						<!-- <span class="tile-text">{col}</span> -->
					</svelte:element>
				{/if}
			{/each}
		{/each}

		<!-- AREA -->
		{#each CommonSets.Area as row}
			<div id={row.id} class:!hidden={toggleArea} class="map-area" style="margin-left: {row.pos.x}px; margin-top: {row.pos.y}px; height: {row.size.h}px; width: {row.size.w}px;">
				<span class="tile-text text-xxs">{row.text}</span>
			</div>
		{/each}

		<!-- PILLAR -->
		{#each CommonSets.Pillar as row, rowIndex}
			{#each row as col, colIndex}
				{#if col !== '0'}
					<span class:!hidden={togglePillar} class="map-pillar" style="margin-left: {CommonSets.tileSize * colIndex}px; margin-top: {CommonSets.tileSize * rowIndex}px; ">{col}{rowIndex + 1}</span>
				{/if}
			{/each}
		{/each}

		<!-- TAG -->
		{#each CommonSets.LocationTag as row, rowIndex}
			{#each row as col, colIndex}
				{#if col !== '0'}
					<svelte:element
						this="div"
						id={col}
						class="location-tag"
						style="margin-left: {CommonSets.tileSize * colIndex}px; margin-top: {CommonSets.tileSize * rowIndex}px; height: {CommonSets.tileSize}px; width: {CommonSets.tileSize}px;" />
				{/if}
			{/each}
		{/each}

		<!-- ENGINE -->
		<!-- engineTile consist location data from 'engine_location' or null -->
		<!-- at first render, if location is null set the default position else use the location position -->
		{#each $engineTile as engine, index (engine.id)}
			<svelte:component this={Engine} defaultPosition={CommonSets.defaultPosition + index} {engine} on:click={(e) => showEngineDetail(e, engine)} />
		{/each}
	</div>
</div>

<style>
	.base {
		@apply absolute bg-slate-300;
	}
	.map-base {
		@apply absolute flex items-center justify-center border-[0.5px] border-dashed bg-slate-100;
	}
	.map-area {
		@apply absolute flex items-center justify-center border-[0.5px] border-orange-300 bg-green-400/40;
	}
	.map-pillar {
		@apply absolute -left-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-slate-500 text-center text-[4px] text-white;
	}
	.location-tag {
		@apply absolute flex items-center justify-center;
	}
	.tile-text {
		@apply select-none text-center font-mono text-[8px];
	}
</style>
