package com.codingdojo.igdb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingdojo.igdb.models.Game;
import com.codingdojo.igdb.repositories.GameRepository;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepo;
	
	public Game createGame(Game game) {
		return gameRepo.save(game);
	}
	
	public List<Game> getAllGames(){
		return gameRepo.findAll();
	}
	
	public Game getOneGameById(Long id) {
		Optional<Game> oneGame = gameRepo.findById(id);
		
		if(oneGame.isPresent()) {
			return oneGame.get();
		}
		
		return null;
	}
	
	public Game updateGame(Game game) {
		return gameRepo.save(game);
	}
	
	public void deleteGame(Long id) {
		gameRepo.deleteById(id);
	}
}
