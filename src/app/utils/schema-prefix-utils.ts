import { environment } from "environments/environment";

export class SchemaPrefixUtils {

    public static prefix = environment.semantic_transcription.prefix;
    public static keyPrefix = environment.semantic_transcription.keyPefix;
    public static schema_prefix = "http://schema.org/";
    public static prefix_schema = "schema:";

    public static extractPrefix(str) {
        if (!str.includes(this.prefix_schema)) {
            return str;
        }
        return str.substring(this.prefix_schema.length, str.length);
    }

    public static extractAllPrefix(str) {
        if (!str.includes(this.schema_prefix) && !str.includes(this.prefix_schema)) {
            return str;
        }
        if (str.includes(this.prefix_schema)) {
            return str.substring(this.prefix_schema.length, str.length);
        } 
        if (str.includes(this.schema_prefix)) {
            return str.substring(this.schema_prefix.length, str.length);
        }
        return str;
    }
    public static getTypeFromPrefix(str) {
        if (!str.includes(this.prefix_schema)) {
            return str;
        }
        return this.schema_prefix + str.substring(this.prefix_schema.length, str.length);
    }
}