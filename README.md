# Wrong peer-dependencies with hoisting

This repo illustrates a limitation of the hoisting strategy for installing npm dependencies.

# Explanation

This repo has the folling dependeny graph setup:

- root
  - A@1.0.0
    - B@1.0.0
    - C@1.0.0
      - B@* (peerDependency)
      - D@1.0.0
	    - B@2.0.0
	    - C@1.0.0 (circular dependency)

Since C has a peer dependency on B, it should get access to the version of B provided by its parent.
If we look at the package returned by the following resolution chain: A -> C -> D -> C
This package should be able to import the version of B that is used by its parent D (v2.0.0). But as a result
of the hoisting strategy, this package has access to the wrong version of B (v1.0.0).

# repro

```bash
npm install
node . # observe the code failing
```
