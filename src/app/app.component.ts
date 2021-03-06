import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[]= [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post('https://back-end-angular-default-rtdb.firebaseio.com/posts.json',postData)
      .subscribe( postData=>
        {
          console.log(postData);
        }
      );
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost(){
    this.http.get<{[key: string]:Post}>('https://back-end-angular-default-rtdb.firebaseio.com/posts.json') 
    .pipe(
      map( responseData =>{
            const postArray: Post [] =[];
              for (const key in responseData)
              {
                if(responseData.hasOwnProperty(key))
                postArray.push({...responseData[key],id:key});
              }
        return postArray;
      })
    )
      .subscribe( posts =>
        {
          this.loadedPosts= posts;
        }
      );


  }
}
