import { Product } from "@/models/product";

export interface CarouselItem {
	type: string;
	data: string | Product | Video;
}

export interface Video {
  brand: string;
  embed: string;
  thumbnailUrl: string;
}