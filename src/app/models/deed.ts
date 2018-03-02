export class Deed {
  id: number;
  deed_type: string;
  page_id: number;
  work_id: number;
  collection_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  visit_id: number;

  constructor(id,deed_type,collection_id,created_at){
      this.id=id;
      this.deed_type=deed_type;
      this.collection_id=collection_id;
      this.created_at=created_at;
  }

}
