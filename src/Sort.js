import React from "react";
//import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";
import "./styles.css";

function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;

  const mod = longestNumber - size;
  return string[place - mod] || 0;
}

//longest Number
function getLongestNumber(array) {
  let longest = 0;

  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }

  return longest;
}

function Sort(array) {
  //find Longest Number
  snapshot(array);
  const longestNumber = getLongestNumber(array);

  //create how many bucket you need
  //an array of 10
  const buckets = new Array(10).fill().map(() => []);

  for (let i = longestNumber; i >= 0; i--) {
    while (array.length) {
      const current = array.shift();
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    for (let j = 0; j < buckets.length; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift());
      }
    }
    snapshot(array);
  }

  return array;
}

export default function SortComponent() {
  clear();
  const fill = 99;
  const nums = new Array(fill)
    .fill()
    .map(() => Math.floor(Math.random() * 500000));
  Sort(nums);
  done();
  return <App />;
}
