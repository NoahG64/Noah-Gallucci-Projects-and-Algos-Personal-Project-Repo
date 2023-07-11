package com.codingdojo.igdb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.codingdojo.igdb.models.LoginUser;
import com.codingdojo.igdb.models.User;
import com.codingdojo.igdb.services.UserService;

@Controller
public class UserController {

	@Autowired
	private UserService userService;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/user")
	public ResponseEntity<List<User>> getAllUsers(){
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/user/{id}")
	public ResponseEntity<User> getOneUser(@PathVariable("id")Long id) {
		return new ResponseEntity<>(userService.getOneUserById(id), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/user/login")
	public ResponseEntity<User> loginUser(@RequestBody LoginUser loginUser){
		return new ResponseEntity<>(userService.login(loginUser), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/api/user")
	public ResponseEntity<User> createUser(@RequestBody User newUser) {
		return new ResponseEntity<>(userService.createUser(newUser), HttpStatus.CREATED);
	}
		@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@DeleteMapping("/api/user/{id}")
	public void deleteUser(@PathVariable("id")Long id) {
		userService.deleteUser(id);
	}
}
