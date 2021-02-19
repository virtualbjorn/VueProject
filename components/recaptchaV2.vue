<template>
	<div :id="reCaptchaId" class="g-recaptcha" :data-sitekey="siteKey"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

declare var grecaptcha: any;
@Component({
	head: {
		script: [
			{ src: 'https://www.google.com/recaptcha/api.js?onload=RecaptchaLoaded&render=explicit', async: true, defer: true, body: true }
		]
	}
})
export default class ReCaptchaV2 extends Vue {
	siteKey: string = 'API_KEY';

	@Prop({
		type: String,
		required: true,
		default: 'reCaptchaV2'
	}) reCaptchaId!: string;

	mounted() {
		window['RecaptchaLoaded'] = this.onLoadCaptcha.bind(this);
	}

	onLoadCaptcha() {
		if (grecaptcha) {
			grecaptcha.render(this.reCaptchaId, {
				siteKey: this.siteKey,
				callback: (response) => {
					this.$emit('captchaLoaded', response);
				}
			})
		}
	}
}
</script>