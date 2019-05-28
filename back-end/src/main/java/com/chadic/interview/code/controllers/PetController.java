/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
package com.chadic.interview.code.controllers;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chadic.interview.code.entity.Pet;
import com.chadic.interview.code.entity.PetCategory;
import com.chadic.interview.code.entity.PetTags;
import com.chadic.interview.code.services.PetService;


@CrossOrigin(origins = { "http://localhost:4200"})
@RestController
@RequestMapping(value = "/pets")
public class PetController  {

	@Autowired
	private PetService petService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Pet> getPets() {
		return petService.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Object getPet(@PathVariable("id") Long id) throws EntityNotFoundException {
		return petService.findById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Pet addPet(@RequestBody Pet pet) {
		return petService.add(pet);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Pet updatePet(@RequestBody Pet pet) {
		return petService.update(pet);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public boolean deletePet(@PathVariable("id") Long id) {
		return petService.deleteById(id);
	}

	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public List<PetCategory> getPetCategories() {
		return petService.findAllCategories();
	}

	@RequestMapping(value = "/tags", method = RequestMethod.GET)
	public List<PetTags> getPetTags() {
		return petService.findAllTags();
	}
}
