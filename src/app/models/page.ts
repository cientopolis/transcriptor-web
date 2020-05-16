import { Expose } from "class-transformer";
import { environment } from "environments/environment";

export class Page {
    id: number
    title: string
    @Expose({ name: "thumbnail_url" })
    thumbnail: string
    @Expose({ name: "base_image_url" })
    base_image: string

    getThumbnailUrl() {
        var defaultImageUrl = 'assets/img/icons/default_collections.jpg';
        return this.thumbnail ? `${environment.apiUrl}/${this.thumbnail}` : defaultImageUrl;
    }
}