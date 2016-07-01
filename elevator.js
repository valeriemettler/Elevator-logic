//floor0, floor00
//floor1, floor11


var current_floor = 0;
var number_of_floors = 1;
var peeps_on_0 = [];
var peeps_on_1 = [];
var peeps_in_ele = [];


var display_floors = function(floors) {
    var x = "";
    x = x + '<table width="350" height="200">';
    for (var i = 0; i < floors; i++) {
        var j = i + 1;
        x = x + '<tr><td id="floor' + i + '" style="vertical-align:bottom;border-bottom: 1px solid black;height:100px;width:100px;"></td>'
        x = x + '<td id="floor' + i + '' + i + '"style="vertical-align:bottom;border-bottom: 1px solid black;height:100px;width:100px;"></td>'
        x = x + '<td><button class="upfloor' + i + '" type="button">UP</button></td><td><button class="downfloor' + i + '"type="button">DOWN</button></td><td><button class="add-person' + i + '"type="button">ADD PERSON</button></td></tr>';
    }
    x = x + '</table>';
    $('#container').html(x);
};



var display_elevator = function(floor) {
    // if (current_floor != undefined){
    $('#floor' + current_floor).css({
        "border-top": "none",
        "border-right": "none",
        "border-left": "none",
    });
    // }

    $('#floor' + floor).css({
        "border-top": "1px solid black",
        "border-right": "1px solid black",
        "border-left": "1px solid black",
    });

    //console.log("current_floor", current_floor);

    var x = "";
    for (var i = 0; i < peeps_in_ele.length; i++) {
        x = x + "O";
    }
    if (current_floor === 0) {
        $('#floor0').html("");
        $('#floor1').html(x);
        peeps_in_ele = [];
        x = "";
        window.setTimeout(function() {
            $('#floor1').html(x)
        }, 5000);

    }
    if (current_floor === 1) {
        $('#floor1').html("");
        $('#floor0').html(x);
        peeps_in_ele = [];
        x = "";
        window.setTimeout(function() {
            $('#floor0').html(x)
        }, 5000);
    }

    current_floor = floor;


};




var move_people_into_ele = function() {

    var x = "";
    for (var i = 0; i < peeps_in_ele.length; i++) {
        x = x + "O";
    }
    if (current_floor === 0) {
        $('#floor00').html("");
        $('#floor0').html(x);
    }
    if (current_floor === 1) {
        $('#floor11').html("");
        $('#floor1').html(x);
    }

};


var display_btnInterface = function() {
    var x = "";
    for (var i = 0; i <= number_of_floors; i++) {
        x = x + '<button class="floor' + i + '" style="display:block;" type="button">FLOOR ' + i + '</button>';
    }

    $('#btn-interface').html(x);
};
display_btnInterface();

var up = function() {
    $('.upfloor1').on('click', function(e) {
        e.stopPropagation();
        var that = this;
        //console.log("up");
        display_elevator(1);
        enter();
    })
    $('.downfloor1').on('click', function(e) {
        e.stopPropagation();
        var that = this;
        //console.log("up");
        display_elevator(1);
        enter();
    })
};

var down = function() {
    $('.downfloor0').on('click', function(e) {
        e.stopPropagation();
        var target = $(event.target).attr('class');
        //console.log("target", target); //downfloor0
        var that = this;
        //console.log("down");
        display_elevator(0);
        enter();
    })
    $('.upfloor0').on('click', function(e) {
        e.stopPropagation();
        var target = $(event.target).attr('class');
        //console.log("target", target); //downfloor0
        var that = this;
        //console.log("down");
        display_elevator(0);
        enter();
    })
};

var enter = function() {
    if (current_floor === 0) {
        // $('#floor' + current_floor + "1").html("");
        // $('#floor' + current_floor).html("O");
        peeps_in_ele = peeps_on_0;
        move_people_into_ele();
    }
    if (current_floor === 1) {
        // $('#floor' + current_floor + "1").html("");
        // $('#floor' + current_floor).html("O");
        peeps_in_ele = peeps_on_1;
        move_people_into_ele();
    }
};

var exit = function() {
    if (current_floor === 0) {
        $('#floor' + current_floor).html("");
        $('#floor' + current_floor + "1").html("O");
    }
};

var choose_floor = function() {
    $('.floor0').on('click', function(e) {
        e.stopPropagation();
        var target = $(event.target).attr('class');
        //console.log("target", target); //floor0
        var that = this;
        display_elevator(0);

    })
    $('.floor1').on('click', function(e) {
        e.stopPropagation();
        var target = $(event.target).attr('class');
        //console.log("target", target); //floor1
        var that = this;
        display_elevator(1);
    })
};

var display_people = function(target) {
    if (target === 'add-person0') {
        var x = "";
        for (var i = 0; i < peeps_on_0.length; i++) {
            x = x + "O";
        }
        $('#floor00').html(x)
    }

    if (target === 'add-person1') {
        var x = "";
        for (var i = 0; i < peeps_on_1.length; i++) {
            x = x + "O";
        }
        $('#floor11').html(x)
    }

};


var add_person = function(e) {
    e.stopPropagation();
    var target = $(event.target).attr('class');
    //console.log("target", target); //add-person0
    var that = this;
    if (peeps_on_0.length >= 8) {
        console.log("Only 8 people allowed on one floor at a time.")
    } else {
        peeps_on_0.push(1);
        display_people(target);
    }
};

$(document).ready(function() {
    $('.add-person0').on('click', add_person(e) {});
    $('.add-person1').on('click', add_person(e) {});
    display_floors(2);
    display_elevator(current_floor);
    up();
    down();
    choose_floor();
    add_person();
});