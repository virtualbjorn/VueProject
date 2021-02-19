export interface NewsListing {
    news: Array<News>;
}

export interface News {
    title: string;
    description: string;
    timestamp: string;
    image: string;
}