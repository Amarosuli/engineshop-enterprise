<script>
	export let title = 'Submit';
	export let formId = null;
	export let disabled = false;
	export let classes = null;
</script>

<button type="submit" form={formId && `${formId}Form`} {disabled} class={classes ? classes : 'btn btn_submit'} on:click>{title} <slot /> </button>
