package com.codingdojo.igdb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.codingdojo.igdb.models.Game;
import com.codingdojo.igdb.models.User;
import com.codingdojo.igdb.services.UserService;

@Controller
public class FavoriteGamesController {

	@Autowired
	private UserService userService;

	@ResponseStatus(HttpStatus.OK)
	@PutMapping("/api/favorite/{user_id}/{game_id}")
	public ResponseEntity<User> addFavoriteGames(@PathVariable("user_id") Long user_id, @PathVariable("game_id") Long game_id) {
		return new ResponseEntity<>(userService.addFavorite(user_id, game_id), HttpStatus.OK);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/api/favorite/{user_id}")
	public ResponseEntity<List<Game>> getOneUsersFavoriteGames(@PathVariable("user_id")Long user_id){
		return new ResponseEntity<>(userService.getOneUsersFavoriteGames(user_id), HttpStatus.OK);
	}
}
