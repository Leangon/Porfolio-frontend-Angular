export class Persona {
    id: number;
    fullName: string;
    title: string;
    description: string;
    urlImage: string;
    phoneNumber: string;
    email: string;
    aboutMe: string;

    constructor(title: string, description: string, urlimage: string, aboutMe: string) {
        this.title = title;
        this.description = description;
        this.urlImage = urlimage;
        this.aboutMe = aboutMe;
    }
}
