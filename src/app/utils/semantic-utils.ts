export class SemanticUtils {
    public static regexurl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    public static generateLabelWithoutSpaces(label:string):string{
        let labelws=label;
        if(label){
            labelws = label.split(' ').join('_');
        }
        return labelws;
    }

    private static isRelation(item){
        return item['@type']!=null;
    }

    //si es invocado de una relacion que se visializa en el prevous save
    private static loadRelation(relation ,isrelation=false){
        let properties = new Array<any>();
        if (!isrelation){
            for (let itemKey in relation) {
                if (itemKey == '@id') {
                    properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: true});
                }
            }
        }else{
            for (let itemKey in relation) {
                if (itemKey != '@type' && itemKey != '@id') {
                    properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: this.isUrl(relation[itemKey]) });
                }
            }
        }
        return properties;
    }



    public static getFromMainEntity(mark,jsonld,isRelation=false) {
        let atributes = new Array<any>();
        for (let key in jsonld) {
            const item = jsonld[key];
            console.log(item);
            if(this.isRelation(item)){
                console.log('tiene relacion');
                let properties = this.loadRelation(item, isRelation);
                atributes.push({ name: key, value: properties, model: properties, isArray: true, type: item['@type'] });
           }else{
                if (key.includes('label')) {
                    mark.name = item
                }
                if (key != '@type' && key != '@id') {
                    atributes.push({ name: key, value: item, model: item, isArray: false, type: null,isUrl:this.isUrl(item) });
                }
            }
        }
        return atributes;

    }
    public static isUrl(element){
        return this.regexurl.test(element);
    }

}