<script>
	export let title = 'Reset';
	export let disabled = false;
</script>

<button type="reset" {disabled} class="btn btn_reset" on:click>{title}<slot /></button>
