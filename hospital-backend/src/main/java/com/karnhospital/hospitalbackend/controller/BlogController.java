package com.karnhospital.hospitalbackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karnhospital.hospitalbackend.entity.Blog;
import com.karnhospital.hospitalbackend.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    // ✅ NAYA: Naya blog add karna
    @PostMapping
    public ResponseEntity<?> addBlog(@RequestBody Blog blog) {
        try {
            Blog savedBlog = blogService.saveBlog(blog);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Blog added successfully!",
                "data", savedBlog
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to add blog: " + e.getMessage()
            ));
        }
    }

    // ✅ NAYA: Blog update karna
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Blog existing = blogService.getBlogById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        
        existing.setTitle(blog.getTitle());
        existing.setContent(blog.getContent());
        existing.setAuthor(blog.getAuthor());
        existing.setPublishDate(blog.getPublishDate());
        existing.setCategory(blog.getCategory());
        existing.setImageUrl(blog.getImageUrl());
        
        Blog updated = blogService.saveBlog(existing);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Blog updated successfully!",
            "data", updated
        ));
    }

    // ✅ NAYA: Blog delete karna
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        Blog existing = blogService.getBlogById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        blogService.deleteBlog(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Blog deleted successfully!"
        ));
    }
}