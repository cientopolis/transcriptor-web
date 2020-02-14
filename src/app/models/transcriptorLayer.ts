export class TranscriptorLayer {

    id: number;
    name: string;
    page_id: number;

    constructor(page, name) {
        this.page_id = page.id;
        this.name = name;
    }

}
