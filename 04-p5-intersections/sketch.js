const colours = {
  vanilla: "#FFF3E1",
  yellow: "#F2C166",
  //pink: "#F67C79",
  blue: "#84A6C2",
  green: "#B5A75E",
  //red: "#E14019",
  darkblue: "#2C435F",
  darkgreen: "#4B562F",
  //purple: "#793B52",
};

const totalWidth = 1000;
const totalHeight = 1000;
const margin = totalWidth * 0.05;
const rectWidth = totalWidth - margin * 2;
const rectHeight = totalHeight - margin * 2;
let horizontalSplitPoints = [];
let verticalSplitPoints = [];

function setup() {
  seed = int(fxrand() * 100000);
  //seed = 76141;
  console.log(seed);
  randomSeed(seed); 
  // 38851 70129 68896 42568 67166 49729 76141

  createCanvas(totalWidth, totalHeight);
  noStroke();

  // Make splits
  nInitialSplits = random(10, 20);
  // Horizontal splits
  horizontalSplitPoints = makeManySplits(
    "Horizontal",
    margin * 2,
    nInitialSplits
  );
  // Vertical splits
  verticalSplitPoints = makeSingleSplit(
    "Horizontal",
    margin * 5,
    horizontalSplitPoints
  );
}

function draw() {
  background(colours.vanilla);

  // Shift to start at margins, draw rectangles ----
  translate(margin, margin);

  mainSplitPoints = horizontalSplitPoints;
  mainSpan = rectWidth;
  secondarySplitPoints = verticalSplitPoints;
  secondarySpan = rectHeight;

  // Draw main splits - start from 1, not 0, because first is just 0
  for (let i = 1; i < mainSplitPoints.length; i++) {
    splitStart = mainSplitPoints[i - 1];
    splitSize = mainSplitPoints[i] - mainSplitPoints[i - 1];

    splitColour = random(Object.keys(colours));
    fill(colours[splitColour]);
    stroke(colours[splitColour]);
    translate(0, splitStart);
    rect(0, 0, secondarySplitPoints[i], splitSize);

    splitColour = random(Object.keys(colours));
    fill(colours[splitColour]);
    stroke(colours[splitColour]);
    translate(secondarySplitPoints[i], 0);
    rect(0, 0, mainSpan - secondarySplitPoints[i], splitSize);

    translate(-secondarySplitPoints[i], -splitStart);
  }

  const nCircles = 20;
  const circleMargins = margin / 2;
  const circleSpacing = abs(circleMargins) / 2;
  const circleSize =
    (rectWidth - circleMargins * 2 - circleSpacing * (nCircles - 1)) / nCircles;
  const multiplyShift = min(circleSize * 0.25, circleSpacing * 0.6);

  noStroke();
  translate(circleMargins, circleMargins);
  for (let i = 0; i < nCircles; i++) {
    translate(0, circleSize / 2);
    for (let j = 0; j < nCircles; j++) {
      translate(circleSize / 2, 0);
      fill(colours.vanilla);
      circle(0, 0, circleSize);

      //fill(colours.green);
      splitColour = random(Object.keys(colours));
      fill(colours[splitColour]);
      blendMode(MULTIPLY);
      circle(0, -multiplyShift, circleSize);
      blendMode(BLEND);

      // Shift left for next circle
      translate(circleSize / 2, 0);
      translate(circleSpacing, 0);
    }
    // Shift down for next row
    translate(0, circleSize / 2);
    translate(0, circleSpacing);

    // Shift left for next row
    translate(-(circleSize + circleSpacing) * nCircles, 0);
  }

  //saveCanvas("intersections" + seed, "png")
  
  noLoop();
}
