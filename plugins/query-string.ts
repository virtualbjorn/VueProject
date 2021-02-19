import * as qs from 'querystring';
import { Plugin } from '@nuxt/types';

declare module 'vuex/types/index' {
	interface Store<S> {
		$queryString(obj: any): string
	}
}

const queryStringPlugin: Plugin = (context, inject) => {
	inject('queryString', (obj) => qs.stringify.call(context, obj));
} 

export default queryStringPlugin