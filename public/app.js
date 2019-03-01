// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + 
      "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#note-title").val("");
    $("#note-text").val("");
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#modal-title").html(data.title);
        $("#save-btn").attr("data-id", data._id);
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#note-title").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#note-text").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#save-btn", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#note-title").val(),
        // Value taken from note textarea
        body: $("#note-text").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
      });
  });
  