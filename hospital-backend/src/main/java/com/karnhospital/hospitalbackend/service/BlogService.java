package com.karnhospital.hospitalbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.karnhospital.hospitalbackend.entity.Blog;
import com.karnhospital.hospitalbackend.repository.BlogRepository;

@Component
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    // ✅ NAYA: Save/Update blog
    public Blog saveBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    // ✅ NAYA: Delete blog
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}