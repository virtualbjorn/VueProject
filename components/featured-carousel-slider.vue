<template>
	<div class="slider slider__wrapper" v-if="carouselItems.length">
		<v-carousel
			v-model="carouselModel"
			class="slider__carousel-wrapper"
			:height="carouselHeight"
			hide-delimiters
			:next-icon="'chevron-right'"
			:prev-icon="'chevron-left'"
			:show-arrows="carouselItems && carouselItems.length > 1">
			<v-carousel-item
				v-for="(item, i) in carouselItems"
				:key="i"
				class="slider__item-wrapper"
				transition="cross-fade"
				reverse-transition="cross-fade"
			>
				<template v-if="item.type === 'photo'">
					<div class="slider__item-container">
						<template v-if="isMobile">
							<div :style="inlineStyle(item.data.mobile_image)" class="slider__item-image">
								<img v-show="false" :src="item.data.mobile_image" :alt="item.data.desktop_alt">
							</div>
						</template>
						<template v-else>
							<div :style="inlineStyle(item.data.desktop_image)" class="slider__item-image">
								<img v-show="false" :src="item.data.desktop_image" :alt="item.data.desktop_alt">
							</div>
						</template>
						<featured-carousel-descriptions :upperRightTexts="item.data.upper_right_texts" :lowerRightText="item.data.lower_right_text"></featured-carousel-descriptions>
					</div>
				</template>
				<template v-if="item.type === 'video' && item.data.embed">
					<div id="video-player" class="slider__item-container video-iframe" v-html="embeddedVideoHandler(item.data.embed)"></div>
				</template>
				<template v-if="item.type === 'product'">
					<div class="slider__item-container">
						<banner-product-tile :product="item.data"></banner-product-tile>
						<featured-carousel-descriptions :upperRightTexts="item.data.featured_carousel_item.data.upper_right_texts" :lowerRightText="item.data.featured_carousel_item.data.lower_right_text"></featured-carousel-descriptions>
					</div>
				</template>
			</v-carousel-item>
		</v-carousel>
		<div class="slider__thumbs-container" v-if="enableThumbnail">
			<template v-for="(item, idx) in carouselItems">
				<button :key="idx" type="button" class="thumbnail slider__thumb-item" :class="{ 'active': carouselModel === idx }" @click.stop="setNewCarouselModel(idx)">
					<template v-if="item.type === 'photo'">
						<img :src="item.data.thumbnail" :alt="item.data.thumbnail_alt"/>
					</template>
					<template v-if="item.type === 'video' && item.data.thumbnail">
						<span class="icon ico-play"></span>
						<img :src="item.data.thumbnail" :alt="item.data.thumbnail_alt"/>
					</template>
					<template v-if="item.type === 'product'">
						<img :src="item.data.featured_carousel_item.data.thumbnail" :alt="item.data.featured_carousel_item.data.thumbnail_alt"/>
					</template>
				</button>
			</template>
		</div>
		<div class="featured-carousel-slider__title-cont" v-if="enableItemTitle">
			<template v-if="currentItem.type === 'product'">
				<h2 class="sub-heading__medium featured-carousel-slider__title">{{ currentItem.data.model }} {{ currentItem.data.type }} {{ currentItem.data.capacity ? '- ' + currentItem.data.capacity : '' }}</h2>
				<a :href="productItemLink(currentItem.data)" target="_self" class="featured-carousel-slider__more-details" @click.prevent="openProductDetailPage(productItemLink(currentItem.data), currentItem.data)">
					<em class="icon ico-plus-circle--red"></em>
					<span class="uppercase page-body__small-red">SPAN</span>
				</a>
			</template>
			<!-- <template v-if="currentItem.type === 'video'">
				<h2 class="sub-heading__medium featured-carousel-slider__title" v-html="currentItem.data.title"></h2>
			</template> -->
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, mixins } from 'nuxt-property-decorator';
import VideoUtil from '@/util/video-util';
import BannerProductTile from '@/components/banner-product-tile.vue';
import ProductUtil from '@/util/product-util';
import { Product } from '@/models/product';
import { CarouselItem } from '@/models/featured-carousel-slider';
import FeaturedCarouselDescriptions from '@/components/featured-carousel-descriptions.vue';

@Component({
	components: {
		BannerProductTile,
		FeaturedCarouselDescriptions
	}
})
export default class FeaturedCarouselSlider extends mixins(Vue, VideoUtil, ProductUtil) {
	isTablet: boolean = false;
	isMobile: boolean = false;
	currentItem: CarouselItem = {
		type: '',
		data: ''
	};
	carouselHeight: string = '';
	carouselModel: number = 0;
	@Watch('carouselModel')
	carouselModelUpdated() {
		this.$nextTick(() => {
			if (!this.carouselItems.length) return;
			if (this.enableThumbnail) {
				let sliderThumbContainerEl = this.$el.querySelector('.slider__thumbs-container') as HTMLElement;
				let activeSliderItemBtn = this.$el.querySelector('button.active') as HTMLElement;
				let offsetX = parseFloat(getComputedStyle(activeSliderItemBtn).marginRight);
				let scrollXPos = (activeSliderItemBtn.offsetLeft - offsetX + activeSliderItemBtn.clientWidth / 2) - (sliderThumbContainerEl.clientWidth / 2);
				sliderThumbContainerEl.scrollTo({ left: scrollXPos, behavior: 'smooth' });
				// activeSliderItemBtn.scrollIntoView({
				// 	block: 'nearest',
				// 	inline: 'center',
				// 	behavior: 'smooth'
				// });
			}
			if (this.carouselItems[this.carouselModel] && this.carouselItems[this.carouselModel].type === 'product') {
				this.currentItem = this.carouselItems[this.carouselModel];
			} else {
				this.currentItem = this.carouselItems[this.carouselModel];
			}

			// add '?enablejsapi=1&version=3&playerapiid=ytplayer' at end of youtube embed files to 'playVideo', 'pauseVideo', and 'stopVideo'.
			// e.g. https://www.youtube.com/embed/7A0nL5jpbks to https://www.youtube.com/embed/7A0nL5jpbks?enablejsapi=1&version=3&playerapiid=ytplayer
			let videoPlayerContainer = document.querySelector('#video-player') as HTMLElement;
			if (videoPlayerContainer) {
				let videoPlayerEl = videoPlayerContainer.querySelector('iframe') as HTMLIFrameElement;
				if (videoPlayerEl && this.carouselItems[this.carouselModel].type !== 'video') {
					videoPlayerEl.contentWindow!.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
				}
			}
		});
	}

	@Prop({
		type: Array,
		default: () => []
	}) carouselItems!: Array<CarouselItem>;
	@Watch('carouselItems')
	carouselItemsUpdated() {
		this.carouselModelUpdated();
	}

	@Prop({
		type: Boolean,
		default: true
	}) enableThumbnail!: boolean;

	@Prop({
		type: Boolean,
		default: false
	}) enableItemTitle!: boolean;

	setNewCarouselModel(carouselItem: number) {
		this.carouselModel = carouselItem;
	}

	mounted() {
		this.isTablet = this.$util.browserDetails().isTablet;
		this.isMobile = this.$util.browserDetails().isMobile;
		// this.carouselHeight = this.isTablet ? '300' : this.isMobile ? '200' : '400';
		this.carouselHeight = '400';
	}

	inlineStyle(imageUrl: string) {
		return {
			backgroundImage: `url("${imageUrl}")`
		}
	}

	embeddedVideoHandler(htmliframestring: string) {
		let appendString = '?enablejsapi=1&version=3&playerapiid=ytplayer';
		let regex = new RegExp('\'' + appendString);
		if (!regex.test(htmliframestring)) {
			let srcString = htmliframestring.match(/https.*?(?=[\?"])/)![0];
			htmliframestring = htmliframestring.replace(/https.*?(?=[\?"])/g, srcString + appendString);
		}
		return htmliframestring;
	}
}
</script>
<style lang="scss" scoped>
.carousel-wrap {
	.video-iframe {
    background-color: black;
  }
}
.featured-carousel-slider {
	&__more-details {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		line-height: 23px;
		padding: 5px 0 4px;
		.icon {
			margin-right: 5px;
		}
		.page-body__small-red {
			line-height: 1em;
		}
	}
	&__title-cont {
		// min-height: 496px;
	}
}
iframe {
	width: 100%;
	height: 100%;
}
.slider {
	&__wrapper {
		display: grid;
		grid-template-rows: 1fr auto;
		grid-row-gap: 22px;
		max-width: 1032px;
		margin: 0 auto;
	}
	&__carousel-wrapper {
		// max-width: 1032px;
		// margin: 0 auto;
		grid-row: 1;
	}
	&__item-container {
		border-radius: 4px;
		overflow: hidden;

		height: 100%;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			pointer-events: none;
		}
	}
	&__item-image {
		height: 100%;
		// background-size: 193% auto;
		background-size: cover;
		background-position: center;
	}
	&__thumbs-container {
		// display: grid;
		// grid-template-columns: auto;
		// grid-column-gap: 20px;
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
		grid-row: 2;
	}
	&__thumb-item {
		width: 80px;
		height: 80px;

		margin-right: 20px;
		position: relative;

		display: grid;
		overflow: initial;

		&:last-child {
			margin-right: 0;
		}

		&.active::after {
			content: "";
			width: 80px;
			height: 80px;
			border: 4px solid #000000;
			border-radius: 4px;
			position: absolute;
			left: 0;
			top: 0;
		}
		&::before {
			content: "";
			width: 80px;
			height: 80px;
			position: absolute;
			top: 0;
			left: 0;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
			border-radius: 4px;
		}
		img {
			border-radius: 4px;
			width: 80px;
			height: 100%;
			object-fit: contain;
		}
	}
}
@media (min-width: 768px) {
	.slider {
		&__item-image {
			// background-size: 100%;
		}
	}
}
</style>