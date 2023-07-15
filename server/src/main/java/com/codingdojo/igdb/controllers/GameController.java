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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.codingdojo.igdb.models.Game;
import com.codingdojo.igdb.services.GameService;

@Controller
public class GameController {

	@Autowired
	private GameService gameService;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/game")
	public ResponseEntity<List<Game>> getAllGames(){
		return new ResponseEntity<>(gameService.getAllGames(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/game/{id}")
	public ResponseEntity<Game> getOneGame(@PathVariable("id")Long id){
		return new ResponseEntity<>(gameService.getOneGameById(id), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/api/game")
	public ResponseEntity<Game> createGame(@RequestBody Game newGame){
		return new ResponseEntity<>(gameService.createGame(newGame), HttpStatus.CREATED);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@PutMapping("/api/game/{id}")
	public ResponseEntity<Game> updateGame(@RequestBody Game editedGame){
		return new ResponseEntity<>(gameService.updateGame(editedGame), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@ResponseStatus(HttpStatus.OK)
	@DeleteMapping("/api/game/{id}")
	public void deleteGame(@PathVariable("id")Long id) {
		gameService.deleteGame(id);
	}
}