<script>
	export let className = '';
</script>

<div {...$$props} class={`tl-html-container ${className}`}>
	<slot />
</div>
