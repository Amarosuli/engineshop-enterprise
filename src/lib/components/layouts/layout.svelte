<script>
	import { Container, Content, Header, Base, Notification } from '$lib/components';

	export let user;
</script>

<!-- Base: relative -->
<Base>
	<!-- Container: absolute flex -->
	<Container>
		<Header {user} />
		<Content>
			<slot />
		</Content>
		<!-- <Notification /> -->
	</Container>
</Base>
