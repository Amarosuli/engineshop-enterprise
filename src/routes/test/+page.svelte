<script>
	class ResponseData {
		constructor(data, status, message) {
			this.response = () => {
				return {
					status: status,
					data: data,
					message: message
				};
			};
			this.send = this.response();
		}
	}

	let result = new ResponseData({ id: 'asdasd', name: 'ahmad' }, { error: true, message: 'failed' }, 'Actions failed, please retry');
	console.log(result.send);
</script>

<svelte:head>
	<title>TEST</title>
</svelte:head>
