<script>
	import { onMount } from 'svelte';
	import { Modal } from '$lib/components';
	import { modal$ } from '$lib/utils/Stores';
	import { Viewer, BLANK_PDF } from '@pdfme/ui';

	onMount(() => {
		let { data } = $modal$.find((v) => v.id === 'preview');
		let domContainer = document.getElementById('container');
		let inputs = [{}];
		new Viewer({ domContainer, template: data, inputs });
	});
</script>

<Modal.Root let:id id="preview" position="mid">
	<Modal.Header>
		<Modal.Title title="Preview Template - Surat Pengiriman" />
		<Modal.Action>
			<Modal.Close on:Close={() => modal$.hide(id)} />
		</Modal.Action>
	</Modal.Header>
	<Modal.Body>
		<div id="container" />
	</Modal.Body>
	<Modal.Footer>
		<Modal.Cancel title="Close" on:Cancel={() => modal$.hide(id)} />
	</Modal.Footer>
</Modal.Root>
