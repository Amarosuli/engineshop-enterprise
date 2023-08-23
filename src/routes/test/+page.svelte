<script>
	import { modal$ } from '$lib/utils/Stores';

	import * as Modal from '$lib/components/commons/Modal';
	import { Btn } from '$lib/components';

	let { isDetail } = modal$;
</script>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Create Form" />
			<Modal.Action>
				<Btn type="button" title="Update" color="info" />
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<span>Test Modal</span>
		</Modal.Body>
		<Modal.Footer />
	</Modal.Root>
{/if}

<Btn on:click={() => modal$.show('detail')} />
