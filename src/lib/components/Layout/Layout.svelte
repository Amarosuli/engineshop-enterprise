<script>
	import { Container, Content, Header, Base, Notification } from '@ui';

	export let user;
</script>

<!-- Base: relative -->
<Base>
	<!-- Container: absolute flex -->
	<Container>
		<Header {user} />
		<Content>
			<slot />
			<!-- <Notification /> -->
		</Content>
	</Container>
</Base>
