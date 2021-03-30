import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainTopic } from 'src/app/model/MainTopic';
import { Tutorial } from 'src/app/model/Tutorial';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public mainTopics1: Array<any> = [
    {id:1, name: "Linux", tutorials: [{id: 1, name:"download", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png"},{id: 1, name:"flavour", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/0/04/Debian_logo.png"}]},
    {id:2, name: "PLSQL", tutorials: [{id: 1, name:"download", imageUrl:"https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png"}]}
  ];

  public mainTopics: any;
  selectedTopicId: number;
  public tutorials: Array<Tutorial> = [];
  
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.http.get("assets/topics.json", { responseType: "json" }).subscribe(data => this.mainTopics=data);
  }

  buttonClick(topicId: number){
    for(var topic of this.mainTopics) {
      document.getElementById("btn-"+topic.id).classList.remove("active");
    }
    document.getElementById("btn-"+topicId).classList.add("active");
    this.tutorials = this.mainTopics.filter(topic => topic.id == topicId)[0].tutorials;
    this.selectedTopicId = topicId;
  }

  toggleTopicMenu(s:string) {
    const large = document.getElementById("menu-large");
    const small = document.getElementById("menu-small");
    if(s==='large'){
      large.classList.add("toggled");
      small.classList.remove("toggled");
    } else {
      large.classList.remove("toggled");
      small.classList.add("toggled");
    }
  }

}
