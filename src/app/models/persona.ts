export class Persona {
    id: number;
    name: string;
    title: string;
    description: string;
    urlImage: string;
    dateBirth: string;
    phoneNumber: string;
    email: string;
    aboutMe: string;

    constructor(name: string, title: string, description: string, urlimage: string, dateBirth: string, phoneNumber: string, email: string, aboutMe: string) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.urlImage = urlimage;
        this.dateBirth = dateBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.aboutMe = aboutMe;
    }
}
