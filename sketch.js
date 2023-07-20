let webcam;
let graphic;
let scale = 7;

let hsb_modus = true;

let karakters = ' .":~!/%=#&$@';

let button, knop2, input;

function setup() {
    webcam = createCapture(VIDEO);
    webcam.hide();

    createCanvas(webcam.width, webcam.height);

    button = createButton("📸");
    button.mousePressed(FOTO);
    knop2 = createButton("verander kleur modus");
    knop2.mousePressed(verader_modus);
    input = createInput(' .":~!/%=#&$@');
}

function draw() {
    background(52);
    if (webcam.width != width) {
        resizeCanvas(webcam.width, webcam.height);
        graphic = createGraphics(Math.floor(webcam.width/scale), Math.floor(webcam.height/scale));
    }

    if (graphic != null) {
        graphic.image(webcam, 0, 0, graphic.width, graphic.height);

        graphic.loadPixels();
        let d = pixelDensity();
        karakters = input.value();

        for (let y = 0; y < graphic.height; y++) {
            for (let x = 0; x < graphic.width; x++){
                push();
                noStroke();
                let index = 4*d*(x + graphic.width*y*d);
                let kleur = color(graphic.pixels[index], graphic.pixels[index + 1], graphic.pixels[index + 2]);
                if (hsb_modus) {fill(color(`hsb(${Math.floor(hue(kleur))}, ${Math.floor(saturation(kleur))}%, 100%)`  ));}
                else {fill(kleur);}
                text(kies_karakter(karakters, kleur), x*scale, y*scale);
                pop();
            }
        }
    }
}

function kies_karakter(chars, kleur) {
    return chars[Math.floor(chars.length*(brightness(kleur)/100)) - 1];
}

function FOTO() {
    saveCanvas('FOTO', 'png')
}

function verader_modus() {
    hsb_modus = !hsb_modus;
}