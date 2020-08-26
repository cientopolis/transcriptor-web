import { environment } from "environments/environment";

export class Collection {
  id: number;
  title: string;
  intro_block: string;
  footer_block: string;
  transcription_conventions: string;
  help: string;
  link_help: string;
  picture: any;
  isOwner:boolean = false;

  getThumbnailUrl() {
    var defaultImageUrl = 'assets/img/icons/default_collections.jpg';
    return this.picture.thumb.url ? `${environment.apiUrl}/${this.picture.thumb.url}` : defaultImageUrl;
  }
}
