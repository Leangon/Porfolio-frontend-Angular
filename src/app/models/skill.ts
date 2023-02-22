export class Skill {
    id?: number;
    name: string;
    urlImage: string;
    percent: number;

    constructor(id: number, name: string, urlImage:string, percent: number) {
        this.id = id;
        this.name = name;
        this.urlImage = urlImage;
        this.percent = percent;
    }
}
