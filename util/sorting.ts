import { Vue, Component } from 'nuxt-property-decorator';
declare var _: any;

@Component
export default class Sorting extends Vue {
	firstDigits: Array<string> = ["","one","two","three","four","five","six","seven","eight","nine"];
	specialDigits: Array<string> = ["ten","eleven","twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
	secondDigits: Array<string> = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

	orderBy(key: string, data: Array<any>) {
		return _.orderBy(data, key, ['asc']);
	}

	numberToWords(num: number) {
		let parseNumber: Array<string> = _.toArray(num.toString());
		let word: string = "";
		if (num >= 10 && num < 20) {
			word = this.specialDigits[parseNumber.reverse()[0]];
		} else if (parseNumber.length > 1) {
			word = `${this.secondDigits[parseNumber[0]]}${this.firstDigits[parseNumber[1]]}`;
		} else {
			word = this.firstDigits[parseNumber[0]];
		}

		return _.startCase(word);
	}
}