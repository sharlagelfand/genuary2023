const colours = {
  yellow: "#F2C166",
  pink: "#F67C79",
  blue: "#84A6C2",
  green: "#B5A75E",
  red: "#E14019",
  darkblue: "#2C435F",
  darkgreen: "#4B562F",
  purple: "#793B52",
};

const vanilla = "#FFF3E1";

const totalWidth = 1000;
const totalHeight = 1000;
const margin = totalWidth * 0.05;
const rectWidth = totalWidth - margin * 2;
const rectHeight = totalHeight - margin * 2;

function setup() {
  createCanvas(totalWidth, totalHeight);
  strokeCap(SQUARE);

  seed = int(fxrand() * 100000);
  //seed = 96023
  // 451 85775 78473 96029 93566 23612 5722 94125 54699 56942 43364
  // 7014 86680 96023 62221 67538
  console.log(seed);
  randomSeed(seed);
}

function draw() {
  pixelDensity(3);
  background(vanilla);
  noFill();

  lineColour = random(Object.keys(colours));
  stroke(colours[lineColour]);
  strokeWeight(1.5);

  // Main square
  //translate(margin, margin);
  //rect(0, 0, rectWidth, rectHeight);

  nRect = int(random(13, 20));
  rectGap = margin * 0.25;
  translate(margin, margin);

  // Determine if horizontal or vertical panels
  panelType = random(["horizontal", "vertical"]);
  //panelType = "vertical";
  indvRectSize = (rectWidth - (nRect - 1) * rectGap) / nRect;

  panelOutline = random() > 0.5;

  lineDirection = random(["up", "down", "straight"]);
  sectionSizing = random(["fixed", "varying"]);
  fullSectionPlacement = random(["first", "last", "middle", "random"]);
  sectionDensityPattern = random(["fixed density", "varying density"]);

  console.log(
    lineDirection +
      " " +
      sectionSizing +
      " " +
      fullSectionPlacement +
      " " +
      sectionDensityPattern
  );

  if (sectionSizing == "fixed") {
    nSections = int(random(5, 20));
  }

  if (fullSectionPlacement == "first") {
    fullSection = 1;
  } else if ((fullSectionPlacement == "last") & (sectionSizing == "fixed")) {
    fullSection = nSections;
  }

  if (sectionDensityPattern == "fixed density") {
    sectionDensity = random(0.2, 0.5) * 0.8;
  }

  lineAngle = indvRectSize * random(0.15, 0.3);
  linesPadding = rectGap * random(-0.15, 0.25);

  for (let i = 0; i < nRect; i++) {
    if (panelType == "vertical") {
      if (panelOutline) {
        rect(0, 0, indvRectSize, rectHeight);
      }

      // Break each rectangle into sections
      // Determine which section is the "full" one
      // Do a % of lines in each section based on how far it is from the "full" one

      if (sectionSizing != "fixed") {
        nSections = int(random(5, 20));

        if (fullSectionPlacement == "last") {
          fullSection = nSections;
        }
      }

      if (fullSectionPlacement == "random") {
        fullSection = int(random(1, nSections));
      } else if (fullSectionPlacement == "middle") {
        fullSection = floor(nSections / 2);
      }
      sectionSize = rectHeight / nSections;

      if (sectionDensityPattern == "fixed density") {
        fullLines = ceil(sectionSize * sectionDensity);
      } else {
        fullLines = ceil(sectionSize * random(0.2, 0.5) * 0.8);
      }

      //fullLines = 15;

      for (let j = 1; j <= nSections; j++) {
        // Start at 1 to make setting fullSection easier

        // Determine how many lines there are
        fullDistance = abs(fullSection - j);
        nLines = ceil(fullLines * (1 - fullDistance / nSections));
        lineIncrement = sectionSize / (nLines + 1);
        if (lineDirection == "up") {
          lineStart = lineAngle / 2;
          lineEnd = 0;
        } else if (lineDirection == "down") {
          lineStart = 0;
          lineEnd = lineAngle / 2;
        } else {
          lineStart = lineIncrement;
          lineEnd = lineIncrement;
        }

        for (let k = 0; k <= nLines; k++) {
          line(linesPadding, lineStart, indvRectSize - linesPadding, lineEnd);
          translate(0, lineIncrement);
        }
        translate(0, -lineIncrement * (nLines + 1));

        translate(0, sectionSize);
      }
      translate(0, -sectionSize * nSections);

      translate(indvRectSize + rectGap, 0);
    } else {
      if (panelOutline) {
        rect(0, 0, rectHeight, indvRectSize);
      }

      // Break each rectangle into sections
      // Determine which section is the "full" one
      // Do a % of lines in each section based on how far it is from the "full" one

      if (sectionSizing != "fixed") {
        nSections = int(random(5, 20));

        if (fullSectionPlacement == "last") {
          fullSection = nSections;
        }
      }

      if (fullSectionPlacement == "random") {
        fullSection = int(random(1, nSections));
      } else if (fullSectionPlacement == "middle") {
        fullSection = floor(nSections / 2);
      }
      sectionSize = rectWidth / nSections;

      if (sectionDensityPattern == "fixed density") {
        fullLines = ceil(sectionSize * sectionDensity);
      } else {
        fullLines = ceil(sectionSize * random(0.2, 0.5));
      }

      //fullLines = 15;

      for (let j = 1; j <= nSections; j++) {
        // Start at 1 to make setting fullSection easier

        // Determine how many lines there are
        fullDistance = abs(fullSection - j);
        nLines = ceil(fullLines * (1 - fullDistance / nSections));
        lineIncrement = sectionSize / (nLines + 1);
        if (lineDirection == "up") {
          lineStart = lineAngle / 2;
          lineEnd = 0;
        } else if (lineDirection == "down") {
          lineStart = 0;
          lineEnd = lineAngle / 2;
        } else {
          lineStart = lineIncrement;
          lineEnd = lineIncrement;
        }

        for (let k = 0; k <= nLines; k++) {
          line(lineStart, linesPadding, lineEnd, indvRectSize - linesPadding);
          translate(lineIncrement, 0);
        }
        translate(-lineIncrement * (nLines + 1), 0);

        translate(sectionSize, 0);
      }
      translate(-sectionSize * nSections, 0);

      translate(0, indvRectSize + rectGap);
    }
  }

  //saveCanvas("steal" + seed, "png")
  noLoop();
}
