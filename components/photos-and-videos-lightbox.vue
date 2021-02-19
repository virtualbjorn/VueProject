<template>
  <lightbox :lightboxState="photosAndVideosLightboxState" :wrapperClass="'photos-and-videos'" @close="$emit('closePhotosAndVideosLightbox')">
    <div class="container popup__inner">
      <div class="popup__content">
		<div class="icon-wrapper">
			<button type="button" class="ico-close--black-wrap" @click.stop="$emit('closePhotosAndVideosLightbox')">
				<span class="icon ico-close--black"></span>
			</button>
		</div>
		<template v-if="selectedMedia.type === 'video'">
			<div v-html="selectedMedia.embed_code"></div>
		</template>
		<template v-else-if="selectedMedia.type === 'photo'">
			<figure class="photos-and-videos__content-wrap">
				<source-set-img
					v-if="defaultSrc.src"
					:srcSet="srcSet"
					:defaultSet="defaultSrc"
					useClass="source-set-img" />
			</figure>
		</template>
      </div>
    </div>
  </lightbox>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { SourceSet } from "@/models/gallery";
import SourceSetImg from "./sourceset.vue";

@Component({
  components: {
    SourceSetImg
  }
})
export default class PhotosAndVideosLightbox extends Vue {
	isMobile: boolean = this.$util.browserDetails().isMobile;
	
  @Prop({
    type: Boolean,
    default: false
	}) photosAndVideosLightboxState!: boolean;
	
	@Prop({
		type: Object,
		default: {}
	}) selectedMedia!: any;

	srcSet: Array<SourceSet> = [];
  defaultSrc: any = {}

	@Watch('selectedMedia')
  onProductDataChanged(product) {
    if (product) {
      this.srcSet = [
      { maxWidth: '767px', src: this.selectedMedia.mobile_img, alt: this.selectedMedia.desktop_alt }
      ];
      this.defaultSrc = {
        src: this.selectedMedia.desktop_img,
        alt: this.selectedMedia.desktop_alt
      } as SourceSet;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
	padding: 0;
	&.popup__inner {
		overflow-y: auto;
	}
}
.icon-wrapper {
	position: sticky;
	text-align: right;
	top: 25px;
	right: 8px;
	text-align: right;
	padding-right: 20px;
}
.ico-close--black-wrap {
	display: inline-flex;
	padding: 10px;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.ico-close--black {
	// position: absolute;
	// right: 20px;
	// top: 15px;
	width: 18px;
	height: 18px;
}
.photos-and-videos__content {
	width: 100%;
}
.photos-and-videos__content-wrap {
	padding: 10px;
}
.popup__content {
	padding: 24px 0;
	background-color: white;
	// background: transparent;
}
@media (min-width: 768px) {
  .container {
    &.popup__inner {
      max-width: 97vw;
    }
  }
}
@media (min-width: 1024px) {
  .container {
    &.popup__inner {
      max-width: 935px;
    }
  }
}
</style>