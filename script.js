$(document).ready(function() {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Generate timeblocks
    function generateTimeblocks() {
      var currentHour = dayjs().hour();
  
      $(".container").empty(); // Clear previous timeblocks
  
      for (var i = 9; i <= 17; i++) {
        var timeblockEl = $("<div>").addClass("row time-block");
        var hourEl = $("<div>").addClass("col-md-1 hour").text(dayjs().hour(i).format("hA"));
        var textAreaEl = $("<textarea>").addClass("col-md-10").attr("data-hour", i);
        var saveBtnEl = $("<button>").addClass("col-md-1 saveBtn").html("<i class='fas fa-save'></i>");
  
        if (i < currentHour) {
          textAreaEl.addClass("past");
        } else if (i === currentHour) {
          textAreaEl.addClass("present");
        } else {
          textAreaEl.addClass("future");
        }
  
        // Load events from local storage
        var savedEvent = localStorage.getItem("event_" + i);
        if (savedEvent) {
          textAreaEl.val(savedEvent);
        }
  
        timeblockEl.append(hourEl, textAreaEl, saveBtnEl);
        $(".container").append(timeblockEl);
      }
    }
  
    // Call generateTimeblocks to create timeblocks
    generateTimeblocks();
  
    // Save event when save button is clicked
    $(".saveBtn").on("click", function() {
      var hour = $(this).siblings("textarea").attr("data-hour");
      var eventText = $(this).siblings("textarea").val();
      localStorage.setItem("event_" + hour, eventText);
    });
  });
  