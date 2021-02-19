<template>
<label class="custom-cb-container" :class="[{ 'image-cb': checkboxType === 'img', 'disabled': cbDisabled }, checkboxVariant]">
	<template v-if="checkboxType === 'text'">
		{{ label }}
	</template>
	<template v-if="checkboxType === 'img'">
		<img :src="imageSrc" :alt="imageAlt">
	</template>
	<input type="checkbox" @change="$emit('valueChanged', cbIndex)" :checked="cbValue" :disabled="cbDisabled">
	<span class="inner-checkmark"></span>
</label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class CustomCheckbox extends Vue {
	/**
	 * 'text' | 'img'
	 */
	@Prop({
		type: String,
		default: 'text'
	}) checkboxType!: string;

	/**
	 * 'square' | 'circle'
	 */
	@Prop({
		type: String,
		default: 'square'
	}) checkboxVariant!: string;

	/**
	 * If checkboxType === 'text'; use label prop
	 */
	@Prop({
		type: String,
		default: ''
	}) label!: string;

	/**
	 * If checkboxType === 'img'; use imageSrc prop
	 */
	@Prop({
		type: String,
		default: ''
	}) imageSrc!: string;

	@Prop({
		type: String,
		default: ''
	}) imageAlt!: string;

	@Prop({
		type: Number,
		default: 0
	}) cbIndex!: number;

	@Prop({
		type: Boolean,
		default: false
	}) cbValue!: boolean;

	@Prop({
		type: Boolean,
		default: false
	}) cbDisabled!: boolean;
}
</script>

<style lang="scss" scoped>
/* The custom-cb-container */
.custom-cb-container {
	font-family: 'Coda', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: block;
  position: relative;
  padding-left: 28px;
	cursor: pointer;
	font-size: 12px;
	line-height: 23px;
	color: #000000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

	&.disabled {
		cursor: initial;
		opacity: 0.5;
	}
}
.image-cb, img {
	height: 23px;
}

/* Hide the browser's default checkbox */
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.inner-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
	background: #FFFFFF;
	border: 1px solid #DEA3A3;
	border-radius: 2px;
}



/* On mouse-over */
.custom-cb-container:hover input ~ .inner-checkmark {
  // background-color: #ccc;
}

/* When the checkbox is checked */
input:checked ~ .inner-checkmark {
	border: 1px solid #8F0101;
}

/* Create the inner-checkmark/indicator (hidden when not checked) */
.inner-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the inner-checkmark when checked */
input:checked ~ .inner-checkmark:after {
	display: block;
 	background-color: #8F0101;
}

/* Style the inner-checkmark/indicator */
.inner-checkmark:after {
  left: 2px;
	top: 2px;
	width: 14px;
	height: 14px;
}

/* Checkbox Variant Style */
.square {
	.inner-checkmark, .inner-checkmark:after {
		border-radius: 2px;
	}
}
.circle {
	.inner-checkmark, .inner-checkmark:after {
		border-radius: 50%;
	}
}
</style>