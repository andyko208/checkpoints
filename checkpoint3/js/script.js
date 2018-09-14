var data = {
  totalRevs:0,
  totalCurrent:0,
  totalRPS: 0
};

setInterval(goGo,1000);
setInterval(touches, 1000);   /*whenever the horse touches goal, reset*/
setInterval(itsMoving, 1000);

function goGo() {           /*horse moves*/
  data.totalRevs += data.totalRPS;
  data.totalCurrent += data.totalRPS;
  var speed = data.totalRevs / -4; /*change to data.totalRevs * 100 to see it go faster*/
  $(".horse").css({ 'transform': 'translate(' + speed + 'px)'});
  updateReport();
}

function updateReport() {   /*updates MPH and score in the green area*/
  $("#currentTotal").text(Math.floor(data.totalCurrent));
  $("#rps").text((data.totalRPS/70.4).toFixed(3));
}

function touches() {    /*condition if horse touches goal*/
  var goal = $("#goal").position().left;
  // console.log('goal', goal);
  var horse = $(".horse").position().left;
  // console.log('horse', horse);
  if (horse <= goal) {
     let x = data.totalCurrent;
     let y = data.totalRPS
     data = {         /*leave mph and total, only change position*/
       totalRevs:0,
       totalCurrent:x,
       totalRPS: y
     };
  }
}
function itsMoving() {
  var speed = data.totalRevs / -4;
  if (speed > -100 && speed != 0) {
    $(".notice").text("IT'S MOVING! KEEP CLICKING!")
  }
  else {
    $(".notice").text("")
  }
}
$(".horse").click(function (){
  data.totalRevs++;
  data.totalCurrent++;
  updateReport();
  touches();
})

$(".button").click(function (){
  var addVal = $(this).data( "cost" );
  if ($(this).data( "cost" ) < data.totalCurrent ) {
    data.totalCurrent -=  parseFloat($(this).data( "cost" ).toPrecision(2));
    data.totalRPS += parseFloat($(this).data( "val" ));
    $( this ).children("span").html( parseInt($( this ).children("span").html()*1.15));
    $( this ).data( "cost", parseInt($(this).data( "cost" ) * 1.15) );
  }
  updateReport();
})
