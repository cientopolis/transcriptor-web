import { Collection } from './Collection';
import { Deed } from './deed';
export class DashboardData {
  collection: Collection;
  deeds: Array<Deed>;
  constructor(deeds,collection){
      this.deeds=deeds;
      this.collection=collection;
  }

}
