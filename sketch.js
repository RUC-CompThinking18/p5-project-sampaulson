/*
As soon as I saw that p5.js had extensive libraries for interacting with audio,
I immediately knew that I wanted to try something in that area. One component
that particular caught my attention was the frequency analyzer, which basically
tells you the amplitude of each frequency in an audio sample.

My project takes the sound that is inputted through the computer's mic and
produces a Rorschach-esque visual profile of that sound. The profile is
comprised of a horizontal line of circles that span the width of the canvas,
with each circle corresponding to a frequency in the sound.

Depending on the pitch, volume, and timbre of the source, it can produce a
very wide range of analyses, so this project can be played with in many ways
to produce a variety of results. For instance, a user might choose to use their
own voice, an instrument, a children's choir, a tiny borking pupper, a whoopie
cushion, and so on: and with each input, they will experience a unique output.
*/

var fft, mic;

function setup() {
  createCanvas(720, 400);
  background(0);
  //Allows the user to interact with the program through the computer's mic.
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT();
  //The program will look at the sound that is inputted through the mic and
  //use it as the subject of its analysis.
  fft.setInput(mic);
}

function draw() {
  //The analyze() function computes the amplitude of every frequency present
  //in the sound being analyzed and stores the amplitudes in an array.
  var spectrum = fft.analyze();

  //This for loop looks at every index of that array and uses the magnitude of
  //each frequency's amplitude to determine the size of the circle representing
  //that frequency. The larger the amplitude, the larger the circle.
  for (var i = 0; i < spectrum.length; i++){
    //The color of each circle is determined by how "low" or "high" the
    //frequency is. If it's low, it'll be bluer, and if it's high, it'll
    //be pinker. The map() function is used to ensure that all the frequencies
    //are represented within this blue-pink spectrum.
		var c = color(map(i,0, spectrum.length, 0, 400), 123, 123)
    fill(c);
    noStroke();
    //The amplitude corresponds to the circle's diameter.
    ellipse(i, 200, spectrum[i], spectrum[i]);
  }
}

//By clicking on the canvas, you can save an image of the sound profile you've
//created. Consider it an artifact of the specific circumstances in which you
//interacted with the program.
function mousePressed() {
  saveCanvas('pitchRorschach', 'jpg');
  return false;
}
