<template>
	<picture>
		<source
			:key="idx" 
			v-for="(img, idx) in srcSet"
			:media="'(max-width: ' + img.maxWidth + ')'" :srcset="img.src" :alt="img.alt" />
		<img :class="useClass" :src="defaultSet.src" :alt="defaultSet.alt" />
	</picture>	
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { SourceSet } from '@/models/gallery';

@Component
export default class SourceSetImg extends Vue {
	@Prop({
		type: [Array, Object],
		default: () => { return [] }
	})
	srcSet!: Array<SourceSet>;
	@Prop({
		type: Object,
		default: () => { return {} }
	})
	defaultSet!: SourceSet
	@Prop({
		type: String,
		default: ""
	})
	useClass!: string;
}
</script>

<style lang="scss" scoped>
.product-result-img {
  // object-fit: contain;
  object-fit: cover;
  min-height: 249px;
  height: 100%;
  width: 100%;

  &.default-img {
    width: 193px;
    height: 131px;
    object-fit: contain;
  }
}
@media (min-width: 1600px) {
	.product-result-img {
		min-height: 276px;
	}
}
</style>