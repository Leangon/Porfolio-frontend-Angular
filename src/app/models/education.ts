export class Education {
    id: number;
    university: string;
    title: string;
    urlLogo: string;
    startDate: string;
    endDate: string;
    persona: {
        id: number;
    }

    constructor(university: string, title: string, urlLogo: string, startDate: string, endDate: string, persona_id: number) {
        this.university = university;
        this.title = title;
        this.urlLogo = urlLogo;
        this.startDate = startDate;
        this.endDate = endDate;
        this.persona = { id: persona_id};
    }
}
