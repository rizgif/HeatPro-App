// Retrieve the value of the 'docId' key from local storage
var docID = localStorage.getItem('docId');
console.log(docID);

var userName = localStorage.getItem('userName');
console.log(userName);

function getHikeName(id) {
    db.collection("locations")
      .doc(id)
      .get()
      .then((thisHike) => {
        var hikeName = thisHike.data().locationName;
        document.getElementById("hikeName").innerHTML = hikeName;
          });
}

getHikeName(docID);

function writeReview() {
    console.log("inside write review")
    let Flooded = document.querySelector('input[name="flooded"]:checked').value;
    //console.log(Flooded);
    if (Flooded === "More Cooler") {
        
        Flooded = "The experts were wrong and the temperature is cooler than " + localStorage.getItem("currweather1");
      } else if ( Flooded === "Cooler") {
        Flooded = "The experts were wrong and the temperature is cooler than "+ localStorage.getItem("currweather1");
      } 
        else if ( Flooded === "Same") {
        Flooded = "The experts were right"+ localStorage.getItem("currweather1");
        
      } 
      else if ( Flooded === "Hotter") {
        Flooded = "The experts were wrong and "+ localStorage.getItem("currweather1");
      } 
      else if ( Flooded === "More Hotter") {
        Flooded = "The experts were right"+ localStorage.getItem("currweather1");
      } 


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //var locationName = db.collection("locations").doc(locationName); //added
            //var locationCode = db.collection("locations").doc(code); //added
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;



                    db.collection("Temperatures").add({
                        // hikeDocID: hikeDocID,
                        userID: userID,
                        userName: userName,
                        locationDocID: docID,
                        
                        flooded: Flooded,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "eachLocation.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'review.html';
        }
    });
}