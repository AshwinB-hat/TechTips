export class Tutorial{
    constructor( tutorial: Tutorial){
        this.id = tutorial.id;
        this.name = tutorial.name;
        this.imageUrl = tutorial.imageUrl;
    }
    public id: number;
    public name: string;
    public imageUrl: string;
}