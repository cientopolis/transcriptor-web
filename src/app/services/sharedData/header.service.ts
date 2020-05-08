import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public header: string;
  public headerParagraph:string;
  public headerSubparagraph:string;
  public showDetails=false;
  public headerStep = false;
  public stepNumber=0;

  constructor() { }
}
