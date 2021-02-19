<template>
	<img :src="imageSrc" :alt="alt">
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class DynamicImageAsset extends Vue {
	@Prop({
		type: String,
		required: true
	}) imageSrc!: string;

	@Prop({
		type: String,
		default: ''
	}) alt!: string;
}
</script>