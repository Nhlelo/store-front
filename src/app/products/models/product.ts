 export class Product{
    id: number;
    title: string;
    price:number;
    category: string;
    description:string;
    image:string;
    constructor(
        id: number = 0,
        title: string = '',
        price: number = 0,
        description: string = '',
        category: string = '',
        image: string = ''
      ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
      }
}