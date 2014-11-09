/* 

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must result = "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")
  
  The "move" function should accept two arguments that the website will be passing in: 
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/#rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)


var move = function(gameData, helpers) {
  
  var getInfo = function(tileType) {
  var result = {};
  
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero,
                function(Tile) {
    result = Tile.type === tileType;
  });
    result.distanceTo = healthWellStats.distance;
    result.directionTo = healthWellStats.direction;
    
    return result;
  };
  
  
  var myHero = gameData.activeHero;
  
  isDefined = function (value) {
    result = {
            direction: "",
            distance: 1000000,
            coords: 0
          };;
    
    if ((typeof value != 'undefined') && (value != false)) {
      result = value;
    }

   return result; 
  }

  randomDirection = function() {
     var choices = ['North', 'South', 'East', 'West'];
//      console.log("random 90");
  return choices[Math.floor(Math.random()*4)];
  }
  
  oppositeDirection = function(a){
   var choices= { "North" : "South", "East": "West", "South": "North", "West": "East"};
    
   return choices[a.direction];
  }
  
  possible = function (a) {
    return a.distance < 100000; // any distance greater than this is considered non existant
  }
  
  nearestOf = function(a,b,c) {
    
    if ((a.distance <= b.distance) && (a.distance <= c.distance)) {
      result = a;
    }
    if ((b.distance <= a.distance) && (b.distance <= c.distance)) {
      result = b;
    }
    if ((c.distance <= a.distance) && (c.distance <= b.distance))
      result = c;
    
   return result;   
  }
  
  var heal = isDefined(helpers.findNearestHealthWell(gameData));
  var NearestNonTeamDiamondMine = isDefined(helpers.findNearestNonTeamDiamondMine(gameData));
  var NearestUnownedDiamondMine = isDefined(helpers.findNearestUnownedDiamondMine(gameData));
  var NearestWeakerEnemy = isDefined(helpers.findNearestWeakerEnemy(gameData));
  var NearestEnemy = isDefined(helpers.findNearestEnemy(gameData)); 
  
  var result = randomDirection();
  
//console.log(NearestNonTeamDiamondMine);
//console.log(NearestUnownedDiamondMine);
//console.log(NearestWeakerEnemy);
//console.log(heal);
  
  if ((myHero.health < 50) || ((myHero.health < 90) && (heal.distance == 1))) {  // heal only
//Heal no matter what if low health
    if (possible(heal)) {
//console.log(heal.direction);
      result = heal.direction;
    } else if (possible(NearestEnemy)) {
//console.log("running");
      result = oppositeDirection(NearestEnemy);
    }
  } else if (myHero.health < 70) {  // hunt diamonds
//console.log("Mining");
    if ((possible(NearestNonTeamDiamondMine)) || (possible(NearestUnownedDiamondMine))) {
      if (NearestNonTeamDiamondMine.distance <= NearestUnownedDiamondMine.distance) {
	  result = NearestNonTeamDiamondMine.direction;
      } else {
	  result = NearestUnownedDiamondMine.direction;
      }
    }  
  } else { // hunt enemy or heal
//console.log("hunting");
      if ((NearestWeakerEnemy.distance <= NearestNonTeamDiamondMine.distance) && (NearestWeakerEnemy.distance <= NearestUnownedDiamondMine.distance)) {
	if (possible(NearestWeakerEnemy)) {
	  result = NearestWeakerEnemy.direction;
	}
      } else {
        if (NearestNonTeamDiamondMine.distance <= NearestUnownedDiamondMine.distance) {
  	  if (possible(NearestNonTeamDiamondMine)) {
	    result = NearestNonTeamDiamondMine.direction
	  }
	} else {
	  if (possible(NearestUnownedDiamondMine)) {
	    result = NearestUnownedDiamondMine.direction
	  }
	}    
     }
   
   }
//console.log(result);   
   return result;
  
};
// // The "Northerner"
// // This hero will walk North.  Always.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   result = 'North';
// };

// // The "Blind Man"
// // This hero will walk in a random direction each turn.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   var choices = ['North', 'South', 'East', 'West'];
//   result = choices[Math.floor(Math.random()*4)];
// };

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     result = helpers.findNearestHealthWell(gameData);
//   } else {
//     result = helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     result = helpers.findNearestHealthWell(gameData);
//   } else {
//     result = helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 50) {
//     result = helpers.findNearestHealthWell(gameData);
//   } else {
//     result = helpers.findNearestWeakerEnemy(gameData);
//   }
// };

// // The "Safe Diamond Miner"
/*var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;

  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      result = true;
    }
  });
  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;
  

  if (myHero.health < 40) {
    //Heal no matter what if low health
    result = directionToHealthWell;
  } else if (myHero.health < 100 && distanceToHealthWell === 1) {
    //Heal if you aren't full health and are close to a health well already
    result = directionToHealthWell;
  } else {
    //If healthy, go capture a diamond mine!
    result = helpers.findNearestNonTeamDiamondMine(gameData);
  }
};
*/
// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       result = true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     result = directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     result = directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     result = helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };

// // The "Coward"
// // This hero will try really hard not to die.
// var move = function(gameData, helpers) {
//   result = helpers.findNearestHealthWell(gameData);
// }


// Export the move function here
module.exports = move;
