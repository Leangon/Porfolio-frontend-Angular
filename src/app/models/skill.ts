export class Skill {
    id?: number;
    name: string;
    urlImage: string;
    percent!: number;
    persona: {
        id: number;
     };

    constructor(name: string, urlImage:string, percent: number, persona_id: number) {
        this.name = name;
        this.urlImage = urlImage;
        this.percent = percent;
        this.persona = { id: persona_id };
    }
    
}
