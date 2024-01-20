package com.example.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "collections")
public class Collection {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public String name;

}
