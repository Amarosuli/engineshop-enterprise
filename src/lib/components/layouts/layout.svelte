<script>
	import { Container, Content, Header, Base, Notification } from '$lib/components';
</script>

<Base>
	<Container>
		<Header />
		<Content>
			<slot />
		</Content>
		<!-- <Notification /> -->
	</Container>
</Base>
