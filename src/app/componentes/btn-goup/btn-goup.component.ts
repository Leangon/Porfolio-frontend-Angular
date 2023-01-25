import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-btn-goup',
  templateUrl: './btn-goup.component.html',
  styleUrls: ['./btn-goup.component.css']
})
export class BtnGoupComponent implements OnInit {

  btn!: HTMLElement;
  
  constructor() { }

  ngOnInit(): void {
    this.btn = document.querySelector('#button')!;
    this.btn.addEventListener('click', this.backToTop)
    
    window.onscroll = () => {
      var currentScroll: number = document.documentElement.scrollTop;
      if (currentScroll > 500) {
        this.btn.style.transform = "scale(1)";
      } else if (currentScroll < 500) {
        this.btn.style.transform = "scale(0)";
      }
    };
  }

  backToTop = () => { 
    var scroll: number = document.documentElement.scrollTop;
    if (scroll > 0) {
      window.requestAnimationFrame(this.backToTop);
      window.scrollTo(0, scroll - (scroll / 10))      
    }
  }
}

