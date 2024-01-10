import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-three-js-viewer-routed',
  templateUrl: './three-js-viewer-routed.component.html',
  styleUrls: ['./three-js-viewer-routed.component.css']
})
export class ThreeJsViewerRoutedComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef;

  
  constructor() { }
  ngAfterViewInit() {
    this.containerRef.nativeElement.appendChild(this.createScriptElement());
  }

  ngOnDestroy() {
    // Limpiar recursos en caso de que el componente se destruya
  }

  ngOnInit() {
    this.loadThreeJsScript();
  }

  

  private loadThreeJsScript() {
    const script = document.createElement('script');
    script.type = 'module';
    script.crossOrigin = 'anonymous';
    script.src = '../../../assets/index-ErhB3oYH.js'; // Ajusta la ruta según la ubicación de tu script
    document.head.appendChild(script);
  }

  private createScriptElement(): HTMLElement {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'module';
    scriptElement.text = `
      // Aquí puedes agregar cualquier código adicional específico para este componente si es necesario.
    `;
    return scriptElement;
  }
}
