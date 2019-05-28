/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
package com.chadic.interview.code.services;

import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import com.chadic.interview.code.entity.Pet;
import com.chadic.interview.code.jpa.PetJpaRepository;
import com.chadic.interview.code.services.PetService;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class PetServicesTest {
	@Mock
	PetJpaRepository petRepositoryMock;

	@InjectMocks
	PetService petService;
	
	@Test
	public void findPetById_PetExistsInDatabase_Should_Return_Pet() {
		Long queriedPetId = Long.valueOf(1000);
		Pet pet = new Pet(queriedPetId);
		when(petRepositoryMock.findById(queriedPetId)).thenReturn(pet);
	
		assertEquals(pet, petService.findById(queriedPetId));
	}
	
//	@Test
//	public void findPetById_PetDoesNotExistInDatabase_Should_Return_Not_Found() {
//		Long queriedPetId = Long.valueOf(1000);
//		Pet pet = null;
//		when(petRepositoryMock.findById(queriedPetId)).thenReturn(pet);
//	
//		assertEquals(pet, petService.findById(queriedPetId));
//	}
	
	@Test
	public void findAllPets_GivenAtLeastOnePetExists_Should_Return_Pets() {
		Long petOne = Long.valueOf(1000);
		Long petTwo = Long.valueOf(2000);
		List<Pet> pets = Arrays.asList(new Pet(petOne), new Pet(petTwo));
		when(petRepositoryMock.findAll()).thenReturn(pets);
	
		assertEquals(pets, petService.findAll());
	}
	

}
