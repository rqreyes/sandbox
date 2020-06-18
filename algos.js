// **************************************** MUTATE THE ARRAY ****************************************
const mutateTheArray = (n, a) => {
  return a.map((num, i) => (a[i - 1] || 0) + a[i] + (a[i + 1] || 0));
};

// tests
console.log(mutateTheArray(5, [4, 0, 1, -2, 3])); // [4, 5, -1, 2, 1]

// **************************************** ALTERNATING SORT ****************************************
const alternatingSort = (a) => {
  const aSorted = [...a].sort((a, b) => a - b);
  const b = [];

  while (a.length > 0) {
    b.push(a.shift());
    b.push(a.pop());
  }

  for (let i = 0; i < aSorted.length; i += 1) {
    if (aSorted[i] !== b[i]) return false;
  }

  return true;
};

// const alternatingSort = (a) => {
//   // const aSorted = [...a].sort((a, b) => a - b);
//   // let b = [];

//   const helperFunction = (arr) => {
//     if (!arr.length) return true;
//     if (arr[0] <arr[arr.length - 1]) return false;
//     // b.push(arr[0]);
//     // b.push(arr[arr.length - 1]);

//     return helperFunction(arr.slice(1, arr.length - 1));
//   };

//   return helperFunction(a);

//   // for (let i = 0; i < aSorted.length; i += 1) {
//   //   if (aSorted[i] !== b[i]) return false;
//   // }

//   // return true;
// };

// const alternatingSort = (a) => {
//   const first = a.shift();
//   console.log('first: ', first);
//   const last = a.pop();
//   console.log('last: ', last);

//   console.log(a);

//   if (first > last) return false;
//   if (!a.length) return true;

//   return alternatingSort(a);
// };

// tests
// console.log(alternatingSort([1, 3, 5, 6, 4, 2])); // true
// console.log(alternatingSort([1, 3, 5, 7, 6, 4, 2])); // true
// console.log(alternatingSort([1, 4, 5, 6, 3])); // false
// console.log(alternatingSort([5, 4, 6, 10])); // false
// console.log(alternatingSort([4])); // true

// **************************************** MERGE STRINGS ****************************************
const mergeStrings = (s1, s2) => {
  const a1 = s1.split('');
  const a2 = s2.split('');
  const a1Count = {};
  const a2Count = {};
  const merged = [];

  a1.forEach((char) => {
    a1Count[char] = (a1Count[char] || 0) + 1;
  });
  a2.forEach((char) => {
    a2Count[char] = (a2Count[char] || 0) + 1;
  });

  for (let i = 0; i < (s1 + s2).length; i += 1) {
    if (a1Count[a1[0]] < a2Count[a2[0]] || a1[0] < a2[0])
      merged.push(a1.shift());
    else merged.push(a2.shift());
  }

  return merged.join('');
};

// tests
console.log(mergeStrings('super', 'tower')); // 'stouperwer'
console.log(mergeStrings('dce', 'cccbd')); // 'dcecccbd'
