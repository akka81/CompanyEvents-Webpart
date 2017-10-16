
import DocumentItem from "./DocumentItem";

export default class AgendaItem {

    public name:string;
    public nameITA:string;
    public nameENG:string;
    public rowType:string;
    public rowOrder:number;
    public documents: Array<DocumentItem>;

}