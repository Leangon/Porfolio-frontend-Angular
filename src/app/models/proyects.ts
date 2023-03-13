export class Proyects {
    id: number;
    name: string;
    description: string;
    urlRepository: string;
    urlDemo: string;
    urlImage: string;
    persona: {
        id: number;
    }

    constructor(name: string, description: string, urlRepository: string, urlDemo: string, urlImage: string, persona_id: number) {
        this.name = name;
        this.description = description;
        this.urlRepository = urlRepository;
        this.urlDemo = urlDemo;
        this.urlImage = urlImage;
        this.persona = {id: persona_id};
    }
}
