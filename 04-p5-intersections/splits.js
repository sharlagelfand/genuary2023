function makeManySplits(split, minSize, nInitialSplits = 10) {
  if (split == "Horizontal") {
    splitSize = rectHeight;
  } else {
    splitSize = rectWidth;
  }

  // Generate a bunch of breakpoints
  splitPointsOriginal = [];
  for (let i = 1; i <= nInitialSplits; i++) {
    splitPoint = random(0, splitSize);
    splitPointsOriginal.push(splitPoint);
  }
  // Order them
  splitPointsOriginal = splitPointsOriginal.sort(function (a, b) {
    return a - b;
  });

  // Find first split that is >= minSize, add it to splitPoints
  splitPoints = [];
  var firstSplitIndex = splitPointsOriginal.findIndex(function (number) {
    return number >= minSize;
  });
  splitPoints.push(splitPointsOriginal[firstSplitIndex]);
  iAcceptedSplit = 0;

  // Find subsequent ones that are >= minSize from horizontalSplitPoints[i], i++
  for (let i = firstSplitIndex + 1; i < splitPointsOriginal.length; i++) {
    if (splitPointsOriginal[i] - splitPoints[iAcceptedSplit] >= minSize) {
      if (splitSize - splitPointsOriginal[i] >= minSize) {
        // Ensures all (i.e., especially last split) are salso distance from final edge
        splitPoints.push(splitPointsOriginal[i]);
        iAcceptedSplit += 1;
      }
    }
  }

  // Add final edge as final split
  splitPoints.push(splitSize);
  // Add 0 as first split
  splitPoints.unshift(0);

  return splitPoints;
}

function makeSingleSplit(split, minSize, splits) {
  if (split == "Horizontal") {
    splitSize = rectWidth;
  } else {
    splitSize = rectHeight;
  }

  // Split vertically only once
  splitPoints = [];
  for (let i = 0; i < splits.length; i++) {
    splitPoint = random(minSize, splitSize - minSize);
    splitPoints.push(splitPoint);
  }

  return splitPoints;
}
