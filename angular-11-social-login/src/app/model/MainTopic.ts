import { Tutorial } from './Tutorial';

export class MainTopic{
    constructor(mainTopic?: MainTopic){
        this.id = mainTopic.id;
        this.name = mainTopic.name;
        this.tutorials=mainTopic.tutorials;
    }
    public id: number;
    public name: string;
    public tutorials: Array<Tutorial>;
}