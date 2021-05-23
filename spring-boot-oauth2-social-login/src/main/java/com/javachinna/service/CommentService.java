package com.javachinna.service;

import com.javachinna.model.Comments;
import com.javachinna.model.User;
import com.javachinna.repo.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comments> getCommentsByTopicIdAndTutorialId(int topicId, int tutorialId){
        return commentRepository.findAllByTopicIdAndTutorialId(topicId,tutorialId);
    }

    public Comments addComment(Comments comment,User user){
        comment.setUser(user);
        return commentRepository.save(comment);
    }
}
