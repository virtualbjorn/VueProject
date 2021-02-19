import { Vue } from 'nuxt-property-decorator';
import CustomCheckbox from '@/components/custom-checkbox.vue';
import DynamicImageAsset from '@/components/dynamic-image-asset.vue';
import ReCaptchaV2 from '@/components/recaptchaV2.vue';
import Lightbox from '@/components/lightbox.vue';

export default () => {
	Vue.component('custom-checkbox', CustomCheckbox);
	Vue.component('dynamic-image', DynamicImageAsset);
	Vue.component('recaptcha-v2', ReCaptchaV2);
	Vue.component('lightbox', Lightbox);
}