<script>
	import { page } from '$app/stores';
	import { writable, derived } from 'svelte/store';
	import { goto, afterNavigate } from '$app/navigation';
	import { Modal } from '$lib/components';
	import Collapsible from '$lib/components/commons/Collapsible/Collapsible.svelte';
	import * as List from '$lib/components/commons/List';

	let previousPage;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname;
	});
	import { Button } from '$lib/components';
	let loading = false;
	let query = new URLSearchParams($page.url.searchParams.toString());

	class modalByUrl {
		list = [];
		check = writable([]);
		constructor(page, goto) {
			this.query = new URLSearchParams(page.url.searchParams.toString());
			this.set = (data) => this.check.set(data);
		}

		get isOpen() {
			return (id) => {
				let { subscribe, set, update } = this.check;
				const check = derived(this.check, (subscribe) => {
					subscribe((v) => v == id);
				});
				return check;
			};
		}

		// get isOpen() {
		// 	let { subscribe, set, update } = this.check;
		// 	return (id) => {
		// 		subscribe((a) => a.find((b) => b === id));
		// 	};
		// }

		open = (modalId) => {
			if (this.list.find((value) => value == modalId)) return;
			this.list.push(modalId);
			this.list.forEach((each) => {
				if (this.query.has('modal', modalId)) return;
				this.query.append('modal', modalId);
			});
			goto(`?${this.query.toString()}`);
		};

		closeById = (modalId) => {
			this.list = this.list.filter((each) => each !== modalId);
			this.query.forEach((m) => {
				if (m == modalId) this.query.delete('modal', modalId);
			});
			goto(`?${this.query.toString()}`);
		};

		close = () => {
			if (this.list.length === 0) return;
			let modalId = this.list.pop();
			this.query.delete('modal', modalId);
			goto(`?${this.query.toString()}`);
		};
	}

	let modalController = new modalByUrl($page, goto);
</script>

<div class="w-1/4 mx-auto mt-20">
	<Button.State title="open modal1" on:click={() => modalController.open('modal1')} />
	<Button.State title="close modal1" on:click={() => modalController.closeById('modal1')} />
	<Button.State title="open modal2" on:click={() => modalController.open('modal2')} />
	<Button.State title="close modal2" on:click={() => modalController.closeById('modal2')} />
	<Button.State title="close modal 1 by 1" on:click={() => modalController.close()} />
	<Button.State title="test" on:click={() => modalController.set(['a'])} />

	<!-- <Button.State on:click={() => openModal('modal1')} />
	<Button.State on:click={() => closeModal('modal1')} /> -->
</div>

{#if $page.url.searchParams.has('modal', 'modal1')}
	<Modal.Root>
		<p>Halo</p>
	</Modal.Root>
{/if}

<!-- {modalController.isOpen} -->
