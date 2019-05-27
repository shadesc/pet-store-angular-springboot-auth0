package com.chadic.interview.code.entity;

import java.net.URL;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@NamedQuery(name = "find_all_pets", query = "select p from Pet p")
@Table(name = "Pet")
public class Pet {
	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long id;

	@Column(nullable = false)
	@NotNull // validation
	@Size(min = 2, message = "Name should have atleast 2 characters") //validation
	private String name;

	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private PetStatus status;

	@ElementCollection
	@Column(name = "photo_urls")
	@CollectionTable(name = "photos", 
		uniqueConstraints = @UniqueConstraint(columnNames = { "pet_id", "photo_urls" })
	)
	private List<URL> photoUrls;

	@JoinTable(name = "PET_TAG_MAPPING", 
			joinColumns = @JoinColumn(name = "PET_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "TAG_ID", referencedColumnName = "TAG_ID"), 
			uniqueConstraints = @UniqueConstraint(columnNames = {"PET_ID", "TAG_ID" })
	)
	@ManyToMany
	private List<PetTags> tags;

	@JoinTable(name = "PET_CAT_MAPPING", 
			joinColumns = @JoinColumn(name = "PET_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "CATEGORY_ID", referencedColumnName = "CATEGORY_ID")
	)
	@ManyToOne
	private PetCategory category;
	
	public Pet() {}

	public Pet(Long id) {
		this.id = id;
	}

	public PetCategory getCategory() {
		return category;
	}

	public void setCategory(PetCategory category) {
		this.category = category;
	}

	public List<PetTags> getTags() {
		return tags;
	}

	public void setTags(List<PetTags> tags) {
		this.tags = tags;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PetStatus getStatus() {
		return status;
	}

	public void setStatus(PetStatus status) {
		this.status = status;
	}

	public List<URL> getPhotoUrls() {
		return photoUrls;
	}

	public void setPhotoUrls(List<URL> photoUrls) {
		this.photoUrls = photoUrls;
	}

}
