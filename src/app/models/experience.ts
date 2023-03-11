export class Experience {
    id: number;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
    urlLogo: string;
    persona: {
        id: number
    };

    constructor(company: string, position: string, description: string, startDate: string, endDate: string, urlLogo: string, persona_id: number) {
        this.company = company;
        this.position = position;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.urlLogo = urlLogo;
        this.persona = { id: persona_id };
    }
}