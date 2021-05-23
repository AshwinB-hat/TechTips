
export class Comments{
    constructor(comment?: Comments){
        this.userName = comment && comment.userName || "";
        this.timestamp = comment && comment.timestamp || "";
        this.comment = comment && comment.userName || "";
        this.topicId = comment && comment.topicId || 0;
        this.tutorialId = comment && comment.tutorialId || 0;
    }


    public userName: string;
    public timestamp: string;
    public comment: string;
    public topicId: number;
    public tutorialId: number;

    setComment(comment: string){
        this.comment = comment;
    }

    setTopicId(topicId: number){
        this.topicId = topicId;
    }

    setTutorialId(tutorialId: number){
        this.tutorialId = tutorialId;
    }
}