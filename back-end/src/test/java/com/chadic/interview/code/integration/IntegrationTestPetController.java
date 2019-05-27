package com.chadic.interview.code.integration;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.chadic.interview.code.controllers.PetController;
import com.chadic.interview.code.customExceptions.RestExceptionHandler;
import com.chadic.interview.code.entity.Pet;
import com.chadic.interview.code.services.PetService;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class IntegrationTestPetController {

	private MockMvc mvc;

	@Mock
	private PetService mockPetService;

	@InjectMocks
	private PetController petController;

	private JacksonTester<Pet> jsonPet;

	@Before
	public void setup() {
		JacksonTester.initFields(this, new ObjectMapper());
		mvc = MockMvcBuilders
				.standaloneSetup(petController)
				.setControllerAdvice(new RestExceptionHandler()) // hook the @ControlAdvice that we have
				.build();
	}

	@Test
	public void canFindPetById_GivenItExists() throws Exception {
		Long id = Long.valueOf(1);
		when(mockPetService.findById(id)).thenReturn(new Pet(id));

		MockHttpServletResponse response = mvc.perform(get("/pets/" + id)
				.accept(MediaType.APPLICATION_JSON))
				.andReturn().getResponse();

		System.out.println("Response Status: " + response.getStatus());
		System.out.println("Response Data: " + response.getContentAsString());
		assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
		assertThat(response.getContentAsString()).isEqualTo(jsonPet.write(new Pet(id)).getJson());
	}
}
