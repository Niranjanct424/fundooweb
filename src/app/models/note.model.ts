export class Note {
    noteId: number;
    title:String;
    description:String;
    
    archived:boolean;
    pinned:boolean;
    trashed:boolean;
    color:String;
    reminder:String;
    remainderTime: string;
    createdDate: String;
    updatedDate: String;
    userId: number;
    labelsList: Array<any>;
}
