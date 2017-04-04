import {Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef} from '@angular/core';

import {ViewContainerRef} from '@angular/core';
import { LoginComponent } from './login/login.component'

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {

  constructor(private viewContainer: ViewContainerRef,
          private componentFactoryResolver: ComponentFactoryResolver) { };
  createDialog(dialogComponent: { new(...args : any[]): LoginComponent }): ComponentRef<LoginComponent> {
        this.viewContainer.clear();

        let dialogComponentFactory = 
          this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
        dialogComponentRef.instance.close.subscribe(() => {
            dialogComponentRef.destroy();
        });

        return dialogComponentRef;
    }

}
