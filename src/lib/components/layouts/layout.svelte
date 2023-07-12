<script>
	import { Container, Content, Header, Base, Notification, Window } from '$lib/components';
</script>

<Window />
<Base>
	<Container>
		<Header />
		<Content>
			<slot />
		</Content>
		<!-- <Notification /> -->
	</Container>
</Base>
