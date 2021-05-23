import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Comments } from 'src/app/model/Comments'; 
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})

export class DetailViewComponent implements OnInit {
  currentId: string;
  topicId: string;
  state: string;
  readString: string;
  public parsedString: Array<string> = [];
  currentDisplay: string;
  currentDisplayId: number=0;
  public comments: Array<Comments>;
  comment: string;


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private commentService: CommentService) {
  }

  ngOnInit() {
    this.comments = [];
  }

  ngAfterContentInit(){
    this.routeInitialise();
  }

  routeInitialise(){
    this.currentId = this.route.snapshot.paramMap.get("id");
    this.topicId = this.route.snapshot.paramMap.get("topicId");
    this.state=this.route.snapshot.url[1].path;
    
    if(this.state === 'tutorial'){
      this.http.get('assets/tutorial/'+ this.topicId+ '/'+ this.currentId+'.md', { responseType : "text"}).subscribe(data => this.compose(data));
      document.getElementById('tutorial').classList.add("active");
      document.getElementById('excercise').classList.remove("active");
      this.commentService.getComments(this.topicId, this.currentId).subscribe((data:any) => this.comments.push(...data));
    } else {
      this.http.get('assets/excercise/'+ this.topicId + '/' + this.currentId+ '.md', { responseType : "text"}).subscribe(data => this.compose(data));
      document.getElementById('excercise').classList.add("active");
      document.getElementById('tutorial').classList.remove("active");
    }
  }

  compose(data: string) {
    this.readString=data;
    this.parsedString = this.readString.split(/(?<![#\\s])#\s/g).filter(s => s.trim().length!=0).map(s => "# "+s);
    this.currentDisplay = this.parsedString[0];
    this.currentDisplayId = 0;
    this.tableOfContentCreatorOne();
    this.fragmentRoute();
  }

  fragmentRoute() {
    this.route.fragment.subscribe( value => {
      if(value === null || value === undefined){
        this.currentDisplay = this.parsedString[0];
        this.currentDisplayId = 0;
        
      } else {
        this.currentDisplay = this.parsedString[+value]
        this.currentDisplayId = +value;
      }
      this.highlightElement(this.currentDisplayId);
    });
  }

  highlightElement(element: number){
    const list = document.getElementById("content-table").querySelectorAll("#toc");
    for(var i=0; i<list.length;i++){
      if(i===element){
        list[i].classList.add("light-gray-background");
      } else {
        list[i].classList.remove("light-gray-background");
      }
    }
  }

  tableOfContentCreatorOne() {
    var final = document.getElementById("content-table");
    for(var i=0; i<this.parsedString.length; i++){
      let mainVal = this.parsedString[i].match(/(?<![#\\s])#\s.*/g)[0].replace("# ","").trim();
      
      final.append(this.createListBulletPoint(mainVal,i, true));
      const substringArray = this.parsedString[i].match(/(?<![#\\s])##\s.*/g);
      if(substringArray === null) return;
      for(var j=0; j< substringArray.length; j++) {
        let value = substringArray[j].replace("## ","").trim();
        final.append(this.createListBulletPoint(value, i, false));
      } 
    }

  }

  createListBulletPoint(content: string, listPoint: number, mainList: boolean) {
    var listElement = document.createElement("li");
    var linkElement = document.createElement("a");
    listElement.classList.add("nav-item");
    listElement.classList.add("highlight-hover");

    listElement.style.borderBottom = "solid 1px lightgray";

    if(mainList === true){
      linkElement.style.color='blue';
      listElement.id = 'toc';
    } else {
      linkElement.style.color='black';
    }
    linkElement.href=this.topicId+'/'+this.state+'/'+this.currentId+'#'+listPoint;
    linkElement.innerHTML = content;
    linkElement.style.display='inline-block';
    linkElement.style.width='100%';

    listElement.appendChild(linkElement);

    return listElement;
  }

  toggleContent(){
    if(this.state == "tutorial"){
      this.router.navigateByUrl(this.topicId+'/excercise/'+this.currentId+"#"+this.currentDisplayId);
    } else {
      this.router.navigateByUrl(this.topicId+'/tutorial/'+this.currentId+"#"+this.currentDisplayId);
    }
  }

  displayNextButton() {
    if(this.currentDisplayId < this.parsedString.length-1){
      return true;
    }
    return false;
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

  changeContent(url: string){
    this.router.navigateByUrl(url);
  }

  // tableOfContentCreator(){
  //   var final = document.getElementById("content-table");
  //   final.innerHTML = ''
  //   var content = document.getElementById("page-toc").children[0].children;
  //   for(var i=0; i<content.length;i++){
  //     if(content.item(i).localName === 'h1'){
  //       final.append(this.createListBulletPoint(content.item(i), true));
  //     } else if(content.item(i).localName === 'h2'){
  //       final.append(this.createListBulletPoint(content.item(i), false));
  //     }
  //   }
  // }

  // createListBulletPoint(content: any, mainList: boolean) {
  //   var listElement = document.createElement("li");
  //   var linkElement = document.createElement("a");
  //   listElement.classList.add("nav-item");
  //   listElement.style.borderBottom = "solid 1px lightgray";

  //   if(mainList === true){
  //     linkElement.style.color='blue';
  //   } else {
  //     linkElement.style.color='black';
  //   }
  //   linkElement.href = this.state+"/"+this.currentId+"#"+content.id;
  //   linkElement.innerHTML = content.innerText;

  //   listElement.appendChild(linkElement);

  //   return listElement;
  // }

  onSubmit() {
    var temp = new Comments();
    temp.comment = this.comment;
    temp.setTopicId(parseInt(this.topicId));
    temp.setTutorialId(parseInt(this.currentId));
    this.commentService.addComment(temp).subscribe( data => {
      this.comments.push(data);
    });
  }
}
