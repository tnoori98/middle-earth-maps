package com.example.backend.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "collection_id", nullable = false)
    private Collection collection;

    public Collection getCollection(){
        return collection;
    }

    public Assessment(){}

    public Assessment(Long id, Collection collection) {
        this.id = id;
        this.collection = collection;
    }

    public Long getId() {
        return id;
    }
}
