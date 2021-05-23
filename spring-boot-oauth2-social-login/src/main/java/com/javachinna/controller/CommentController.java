package com.javachinna.controller;

import com.javachinna.config.CurrentUser;
import com.javachinna.dto.LocalUser;
import com.javachinna.model.Comments;
import com.javachinna.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{topicId}/{tutorialId}")
    public List<Comments> getComments(@PathVariable("topicId") int topicId, @PathVariable("tutorialId") int tutorialId){
        return commentService.getCommentsByTopicIdAndTutorialId(topicId, tutorialId);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER')")
    public Comments addComment(@RequestBody Comments comments, @CurrentUser LocalUser user){
        return commentService.addComment(comments, user.getUser());
    }
}
