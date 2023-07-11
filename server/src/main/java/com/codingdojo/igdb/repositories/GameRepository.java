package com.codingdojo.igdb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codingdojo.igdb.models.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

}
