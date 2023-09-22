<script>
	export let title = 'Submit';
	export let formId = null;
	export let disabled = false;
</script>

<button type="submit" form={formId && `${formId}Form`} {disabled} class="btn btn_submit" on:click>{title}<slot /></button>
