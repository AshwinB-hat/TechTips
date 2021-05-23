import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { Comments } from '../model/Comments';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(topicId: String, tutorialId: String): Observable<any> {
    console.log(topicId);
    return this.http.get(AppConstants.API_BASE_URL+"comments"+"/"+topicId+"/"+tutorialId);
  }

  addComment(comment: Comments) : Observable<any>{
    return this.http.post(AppConstants.API_BASE_URL+"comments", comment, httpOptions);
  }
}
