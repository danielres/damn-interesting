<script lang="ts">
	import { OWNER } from '$constants'

	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Modal from '$components/Modal2.svelte'
	import { to } from '$paths'

	const onModalClose = () => goto(to.entries() + $page.url.search, { noScroll: true })
</script>

<Modal isOpen={true} onClose={onModalClose} class="rounded border border-black bg-slate-800 px-8">
	<div slot="main" class="main py-8">
		<div class="mx-auto grid max-w-4xl gap-8 text-slate-300 ">
			<h1 class="px-6">
				What is this about?
				<small class="block text-sm text-slate-500">
					(If you're reading this, there's a good chance that you already have some idea...)
				</small>
			</h1>

			<section class="card">
				<p>Damn Interesting is a platform to share content privately with friends.</p>
				<p>
					This project is
					<a rel="external" href="https://github.com/danielres/damn-interesting">open-source</a>
					and you are welcome to inspect, use and fork the code, and host your own instance if you wish.
				</p>
				<p>
					This particular instance is hosted by <a href="/user/{OWNER.slug}">{OWNER.username}</a>
					.
				</p>
				<p>
					At the time of this writing, only Youtube videos are supported. However, other types of
					content might become supported as well over time.
				</p>
			</section>

			<section class="card">
				<h2>Etiquette</h2>
				<p>
					Please remain thoughtful and sensitive with the content you share, and with your
					communication in general. This space is meant to remain always welcoming to all people
					regardless of their gender, sexual preferences or origins.
				</p>
				<p>
					This instance is dedicated for content that is, in general:
					<br />
					In-depth / Enlightening / Inspiring / Educational / Beneficial in some way / ...
				</p>
				<p>
					In the case of videos, any content less than 10 minutes long probably doesn't satisfy
					those... but it might! Use your judgment! And please don't be offended if something you
					posted is moderated or removed. You are welcome to host your own private instance if you
					have a different vision.
				</p>
			</section>

			<section class="card">
				<h2>What to post?</h2>
				<p>
					Within the limits of the above etiquette, anything that you find really interesting! It
					can be totally niche. Maybe you have a passion for knitting, sculpture, philosphy,
					survivalism, dog training, wild camping,...? This is a place to share YOUR most valued
					findings on those subjects, and to discover content shared by others.
				</p>
				<p>
					In the future, tags, collections and subscriptions will be implemented, so that each
					person can discover and find content according to their interests.
				</p>
				<p>
					When you share something, please always provide a short description at least. Tell us what
					YOU find damn interesting in that piece of content!
				</p>
			</section>

			<div class="text-center">
				<p>Thank you for reading!</p>
			</div>
		</div>
	</div>
</Modal>

<style lang="postcss">
	.main {
		@apply overflow-y-auto;
		max-height: calc(100vh - 6rem);
	}

	h1 {
		@apply text-2xl;
	}

	h2 {
		@apply text-xl text-white;
	}

	p {
		line-height: 1.4;
		a {
			@apply underline underline-offset-4;
		}
	}

	section {
		@apply grid gap-6 bg-slate-900/50;
	}
</style>
