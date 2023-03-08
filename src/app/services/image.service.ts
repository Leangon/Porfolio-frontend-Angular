import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, listAll } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  uploadImage(event: any){
    const file = event.target.files[0]
    console.log(file);
    const imgRef = ref(this.storage, `image/${file.name}`)
    uploadBytes(imgRef, file)
    .then(response => {
      console.log(`La imagen ${file.name} se ha cargado con éxito.`);
      this.getImages(file.name);
    })
    .catch(error => console.log(error)
    )
  }

  async getImages(imageName: string){
    const imagesRef = ref(this.storage, `image`)
    const response = await listAll(imagesRef);
    const matchingItems = response.items.filter(item => item.name === imageName);
    if (matchingItems.length > 0) {
      const item = matchingItems[0];
      this.url = await getDownloadURL(item);
      console.log(`La URL de la imagen ${imageName} es: ${this.url}`);
      // Aquí puedes guardar la URL en tu base de datos
    } else {
      console.log(`No se encontró ninguna imagen con el nombre ${imageName}`);
    }
  }
}
