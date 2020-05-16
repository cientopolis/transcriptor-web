import { environment } from "environments/environment";

export class Work {
  id: number;
  title: string;
  description: string;
  picture: any;
  thumbnail: string;

  getThumbnailUrl() {
    var defaultImageUrl = 'assets/img/icons/default_collections.jpg';
    return this.thumbnail ? `${environment.apiUrl}/${this.thumbnail}` : defaultImageUrl;
  }
}
