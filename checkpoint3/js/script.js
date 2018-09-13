var data = {
  totalRevs:0,
  totalCurrent:0,
  totalRPS: 0
};

setInterval(goGo,1000);
// while (data.totalRevs > 0 || data.totalRevs < 0) {
//   touches();
// }

function goGo() {
  data.totalRevs += data.totalRPS;
  data.totalCurrent += data.totalRPS;
  // $(".horse").css({ 'transform': 'rotate(' + data.totalRevs + 'deg)'});
  $(".horse").css({ 'transform': 'translate(' + -data.totalRevs/4 + 'px)'});
  updateReport();
}

function updateReport() {
  $("#currentTotal").text(Math.floor(data.totalCurrent));
  $("#rps").text((data.totalRPS/70.4).toFixed(3));
}

function touches() {
  var goal = $("#goal").position().left;
  console.log('goal', goal);
  var horse = $(".horse").position().left;
  console.log('horse', horse);
  if (horse <= goal) {
    console.log('reset');
    // $(".horse").css({ 'transform': 'translate(' + 724 + 'px)'});
    // $(".horse").css({'display': 'none'})
    $(".horse").remove()
 // create a ne element
 // append it
     // data = {
     //   totalRevs:0,
     //   totalCurrent:0,
     //   totalRPS: 0
     // };
    let newHorse = $('<img src="./img/horse.jpeg"  class="horse">')
    $('.flexbox').append(newHorse)
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
