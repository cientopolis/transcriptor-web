import { SchemaPrefixUtils } from 'app/utils/schema-prefix-utils';

export class SchemaPropertie {
    id:number;
    label:string;
    name:string;
    comment:string;
    domainIncludes:string;
    rangeIncludes:string;
    types: Array<string>;

    constructor(propertieJson) {
        this.buildFromJsonld(propertieJson);
        /* this.id=propertieJson.id;
        this.label = propertieJson.label;
        this.name=this.label;
        this.comment = propertieJson.comment;
        this.domainIncludes = propertieJson.domainIncludes;
        this.rangeIncludes = propertieJson.rangeIncludes;
        this.types=this.rangeIncludes.split(", "); */
    }

    buildFromJsonld(graphJsonld) {
        this.id = graphJsonld['@id'];
        if (graphJsonld['rdfs:label']['@value']) {
            this.label = graphJsonld['rdfs:label']['@value'];
        }
        this.name = this.label;
        this.comment = graphJsonld['rdfs:comment']['@value'];
        this.domainIncludes = graphJsonld['schema:domainIncludes'];
        this.types = new Array<string>();
        if (Array.isArray(graphJsonld['schema:rangeIncludes'])) {
            graphJsonld['schema:rangeIncludes'].forEach(range => {
                this.types.push(SchemaPrefixUtils.extractPrefix(range['@id']));
            });
        } else {
            this.types.push(SchemaPrefixUtils.extractPrefix(graphJsonld['schema:rangeIncludes']['@id']));
        }

        this.rangeIncludes = this.types.join(',');

    }
}
