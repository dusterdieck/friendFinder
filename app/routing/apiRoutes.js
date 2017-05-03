// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
var friendData = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // returns best matching friend
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {
      //more useful name for posted data
      let user = req.body;
      //console.log(user);

      let minScore = 41; //1 more than maximum possible aggregate difference. should probably be dynamic, in the case more survey questions were added, but meh
      let mostCompatible; //variable for storing index of most compatible
      //loops through each user in friendData
      for(let i = 0; i < friendData.length; i++){
        //sets the array to be compared to the scores array in the current user
        var currentCompare = friendData[i].scores;
        //zeroes out the current comparison score
        var currScore = 0;
        //loops through the scores array of both the posted user and the current user from the stored data
        for(let j = 0; j < 10; j++){
           //sums the absolute value of the differences of each score
           currScore += Math.abs( parseInt(user.scores[j]) - parseInt(currentCompare[j]) );
        }
        //after loop is done, if the current score is less than the minimum score, sets that index to the most compatible
        if (currScore < minScore) {
          minScore = currScore;
          mostCompatible = i;
        }
      }

      //push new user to our friend data. important to do this after the compatibility check, otherwise it would always return the user as most compatible with themselves.
      friendData.push(user);
      //after it's checked all of the users, returns the full object for the most compatible user in the data
      console.log('Most compatible: ', friendData[ mostCompatible ].name)
      res.json(friendData[ mostCompatible ]);


  });
  // clear data, basically just for testing purposes

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    console.log(friendData);
  });
};