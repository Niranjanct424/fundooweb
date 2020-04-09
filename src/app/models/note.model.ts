export class Note {
    noteId: number;
    title:String;
    description:String;
    
    isArchived:boolean;
    isPinned:boolean;
    isTrashed:boolean;
    color:String;
    reminder:String;
    remainderTime: string;
    createdDate: String;
    updatedDate: String;
    userId: number;
    labelsList: Array<any>;
}
