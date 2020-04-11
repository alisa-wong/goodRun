const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));

$(document).ready(function() {
    let drag = false;
    $(".availability-block").on("mousedown", function() {
        drag = true;
        $(this).toggleClass("available");
    });
    $("#availability-table").on("mouseup", function() {
        drag = false;
    });
    $(".availability-block").on("mouseenter", function() {
        if (drag) $(this).toggleClass("available");
    });
    // $(".availability-block").on("click", function() {
    //     $(this).toggleClass("available");
    // });

    let blocks = zeros(96, 7);

    $("#update-availability").on("click", function() {
        $(".available").each(function() {
            blockId = this.id;
            dashIndex = blockId.indexOf('-');
            colonIndex = blockId.indexOf(':');
            day = blockId.substring(0,dashIndex);
            hour = blockId.substring(dashIndex + 1,colonIndex);
            minute = blockId.substring(colonIndex + 1);
            dayIndex = days.indexOf(day);
            blockIndex = parseInt(hour)*4 + parseInt(minute)/15;
            blocks[blockIndex][dayIndex] = 1;
        });

        $.ajax({
            type: "POST",
            url: "/players/availability/update",
            data: { data: JSON.stringify(blocks)},
            dataType: "json"
        });
    });





});