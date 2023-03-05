export class Education {

    id?: number;
    name: string;
    urlImage: string;
    percent!: number;

    constructor(name: string, urlImage:string, percent: number) {
        this.name = name;
        this.urlImage = urlImage;
        this.percent = percent;
       
    }
}
