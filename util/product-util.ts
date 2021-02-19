import { Vue, Component } from "nuxt-property-decorator";
import { Product, ProductItemLink } from "@/models/product";

@Component
export default class ProductUtil extends Vue {
	isPriceAvailableUponRequest(price: string): boolean {
		return !!price && (price.toLowerCase() === 'available upon request');
	}
	
	productItemLink(product: Product): string {
		if (!product.model || !product.brand) return '#';
		if (product.model && product.model.includes('test')) return '#'; // TO BE DELETED AFTER CONTENT POP TESTS
		let productItemLink: ProductItemLink = { brand: product.brand.name, type: product.type, model: product.model };
		productItemLink.model = this.removeWhitespace(productItemLink.model, '–');
		productItemLink.type = this.removeWhitespace(productItemLink.type, '–');
		productItemLink.brand = this.removeWhitespace(productItemLink.brand, '–');
		return encodeURI(`/our-products/${productItemLink.brand}/${productItemLink.type}/${productItemLink.model}`);
	}

	openProductDetailPage(link: string, product: Product) {
		let originalProductItemQuery: ProductItemLink = { brand: product.brand.name, model: product.model, type: product.type };
		this.$accessor.products.updateBreadcrumbsProductDetailsQuery(originalProductItemQuery);
		this.$router.push(link);
	}

	removeBrandWhitespace(brand: string): string {
		if (!brand) return '';
		return brand.replace(/\s/g, '-').toLowerCase();
	}

  getFileName(fileUrl: string = ''): string {
		let fileUrlSplits = fileUrl.split('/');
		return fileUrl ? fileUrlSplits[fileUrlSplits.length - 1] : '';
	}
	
	decimalToPercent(value: number): number {
		return value * 100;
	}

	private removeWhitespace(data: string, replaceString: string): string {
		if (!data) return '';
		return data.replace(/\s/g, replaceString).toLowerCase();
	}

	replaceEnDash(str: string, repStr: string): string {
		if (!str) return '';
		return str.replace(/–/g, repStr).toLowerCase();
	}

	parseDelimiter(data: string, delimiter: string): string {
		if (!data) return '';
		let reg = new RegExp(delimiter, 'g');
		return data.replace(reg, ' ');
	}
}
