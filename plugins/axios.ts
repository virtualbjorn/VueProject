const api = require('@/environment/defaults.json');
declare var _: any;

export default function({ $axios }) {
	if (typeof window['__PRERENDER_INJECTED'] != 'undefined') {
		$axios.setBaseURL('http://127.0.0.1');
	} else {
		$axios.setBaseURL(api.apiUrl);
		_.each(api.headers, (value, keyIdx) => {
			$axios.defaults.headers.post[keyIdx] = value;
		})
	}
}