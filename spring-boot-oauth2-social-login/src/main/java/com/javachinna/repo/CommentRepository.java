package com.javachinna.repo;

import com.javachinna.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllByTopicIdAndTutorialId(int topicId, int tutorialId);
}
