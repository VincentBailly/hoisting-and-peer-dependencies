const path = require("path");

// Resolving the dependency A -> C -> D -> C -> B
// version of B should be 2.0.0

// A
const A = path.dirname(require.resolve("A/package.json"));

// AC
const AC = path.dirname(require.resolve("C/package.json", { paths: [A]}));

// ACD
const ACD = path.dirname(require.resolve("D/package.json", { paths: [AC]}));

// ACDC
const ACDC = path.dirname(require.resolve("C/package.json", { paths: [ACD]}));

// ACDCB
const ACDCB = path.dirname(require.resolve("B/package.json", { paths: [ACDC]}));

const ACDCBversion = require(path.join(ACDCB, "package.json")).version;
if (ACDCBversion !== '2.0.0') {
    throw new Error(`The peer dependency B of A>C>D>C should be v2.0.0, but was ${ACDCBversion}`);
}