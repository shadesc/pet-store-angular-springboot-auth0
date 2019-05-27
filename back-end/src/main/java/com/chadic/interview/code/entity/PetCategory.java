package com.chadic.interview.code.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQuery(name="find_all_categories", query="select p from PetCategory p")
@Table(name = "Petcategory")
public class PetCategory {
	@Id
	@GeneratedValue
	@Column(name="CATEGORY_ID")
	private Long id;
	
	private String name;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
