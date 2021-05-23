import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainTopic } from 'src/app/model/MainTopic';
import { Tutorial } from 'src/app/model/Tutorial';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mainTopics: any;
  selectedTopicId: number;
  public tutorials: Array<Tutorial> = [];
  
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.http.get("assets/topics.json", { responseType: "json" }).subscribe(data => {
      this.mainTopics=data;
      this.buttonClick(this.mainTopics[0].id);
    });
  }

  ngAfterContentInit(){
    this.buttonClick(this.mainTopics[0].id);
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
