package com.codingdojo.igdb.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingdojo.igdb.models.Game;
import com.codingdojo.igdb.models.LoginUser;
import com.codingdojo.igdb.models.User;
import com.codingdojo.igdb.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private GameService gameService;

	public User createUser(User newUser){

		Optional<User> potentialUser = userRepo.findByEmail(newUser.getEmail());
		String passwordEntered = newUser.getPassword();

		if (potentialUser.isPresent()) {
			return null;
		}

		if (!newUser.getPassword().equals(newUser.getConfirmPassword())) {
			return null;
		}

		String hashed = BCrypt.hashpw(passwordEntered, BCrypt.gensalt());

		newUser.setPassword(hashed);
		return userRepo.save(newUser);
	}
	
	public User login(LoginUser loginUser) {

		Optional<User> potentialUser = userRepo.findByEmail(loginUser.getEmail());

		if (potentialUser.isEmpty()) {
			return null;
		}

		User userFromDb = potentialUser.get();

		if (!BCrypt.checkpw(loginUser.getPassword(), userFromDb.getPassword())) {
			return null;
		}
		
		return userFromDb;
	}

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public User getOneUserById(Long id) {
		Optional<User> oneUser = userRepo.findById(id);

		if (oneUser.isPresent()) {
			return oneUser.get();
		}

		return null;
	}

	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}

	public User addFavorite(Long userId, Long gameId) {
		User currentUser = getOneUserById(userId);
		Game currentGame = gameService.getOneGameById(gameId);

		currentUser.getFavoriteGames().add(currentGame);
		return userRepo.save(currentUser);
	}
	
	public List<Game> getOneUsersFavoriteGames(Long id){
		Optional<User> user = userRepo.findById(id);
		
		if(user.isPresent()) {
			return user.get().getFavoriteGames();
		}
		
		return null;
	}
}
