export interface IProduct {
    title: string,
    image: string,
    price: string,
    id: string,
    description: string,
    category: string,
    rating: {
        count: number,
        rate: number,
    }
}