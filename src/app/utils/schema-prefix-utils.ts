import { environment } from "environments/environment";

export class SchemaPrefixUtils {

    public static prefix = environment.semantic_transcription.prefix
    public static schema_prefix = "http://schema.org/"
    public static prefix_schema = "schema:"

    public static extractPrefix(str) {
        if (!str.includes(this.prefix_schema)) {
            return str;
        }
        return str.substring(this.prefix_schema.length, str.length);
    }
}