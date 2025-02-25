# arktype

## 1.0.9-alpha

### Patch Changes

-   improve type summaries for tuple/array intersections

    This change improves the inferred types of array intersections including one or more tuples.

    ```ts
    const tupleAndArray = type([
        [{ a: "string" }],
        "&",
        [{ b: "boolean" }, "[]"]
    ])

    // Failed to preserve tuple when inferring result
    type PreviousResult = { a: string; b: boolean }[]

    // Correctly preserves tuple literal
    type UpdatedResult = [{ a: string; b: boolean }]
    ```

    Thanks to KingPhipps on Twitter for [the inspiration](https://twitter.com/KingPhipps/status/1635212259973795841?s=20)!

## 1.0.8-alpha

### Patch Changes

-   add an "assert" utility to type instances that either directly returns valid data or throws a TypeError

    ```ts
    const t = type("string")
    // "foo"
    const resultOne = t.assert("foo")
    // Throws: TypeError: Must be a string (was number)
    const resultTwo = t.assert(5)
    ```

## 1.0.7-alpha

### Patch Changes

-   Allow discrimination between common builtin classes

    Previously, types like the following were incorrectly treated as non-discriminatable unions:

    ```ts
    const arrayOrDate = type([["instanceof", Array], "|", ["instanceof", Date]])

    attest(t.flat).snap([
        ["domain", "object"],
        // Whoops! Should have been a switch based on "class"
        [
            "branches",
            [[["class", "(function Array)"]], [["class", "(function Date)"]]]
        ]
    ])
    ```

    Now, unions like these are correctly discriminated if they occur anywhere in the type:

    ```ts
    const arrayOrDate = type([["instanceof", Array], "|", ["instanceof", Date]])

    attest(t.flat).snap([
        ["domain", "object"],
        // Correctly able to determine which branch we are on in constant time
        ["switch", { path: [], kind: "class", cases: { Array: [], Date: [] } }]
    ])
    ```

## 1.0.5-alpha

### Patch Changes

-   [#663](https://github.com/arktypeio/arktype/pull/663) [`27b1d972`](https://github.com/arktypeio/arktype/commit/27b1d972e3fe5044571bd16508dd49ddee0d7592) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - temporarily disable numeric literal narrow validation in range and divisibility expressions

    Unfortunately, our StackBlitz demos rely on an older version of TypeScript (<4.8) that does not support number literal narrowing. Hopefully we can migrate them to WebContainers or find another platform to host our demos and reenable this feature.

-   [#663](https://github.com/arktypeio/arktype/pull/663) [`27b1d972`](https://github.com/arktypeio/arktype/commit/27b1d972e3fe5044571bd16508dd49ddee0d7592) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - fixed a bug affecting the traversal of object unions with distilled keys

-   [#663](https://github.com/arktypeio/arktype/pull/663) [`27b1d972`](https://github.com/arktypeio/arktype/commit/27b1d972e3fe5044571bd16508dd49ddee0d7592) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - Fixed a bug that caused keys to be prematurely removed in "distilled" mode within a union

-   [#663](https://github.com/arktypeio/arktype/pull/663) [`27b1d972`](https://github.com/arktypeio/arktype/commit/27b1d972e3fe5044571bd16508dd49ddee0d7592) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - fix a bug affecting the keyof operator when used with the intersection of an unbounded array and a tuple or record including a numeric key

-   [#663](https://github.com/arktypeio/arktype/pull/663) [`27b1d972`](https://github.com/arktypeio/arktype/commit/27b1d972e3fe5044571bd16508dd49ddee0d7592) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - temporarily disable narrowed numeric literal validation

## 1.0.4-alpha

### Patch Changes

-   [#660](https://github.com/arktypeio/arktype/pull/660) [`06760fd1`](https://github.com/arktypeio/arktype/commit/06760fd1a08227d2a477844a4709b8672ae37e0c) Thanks [@ssalbdivad](https://github.com/ssalbdivad)! - temporarily disable narrowed numeric literal validation

## 1.0.3-alpha

### Patch Changes

-   ddedc880: update Deno release

## 1.0.2-alpha

### Patch Changes

-   0325e26d: rename api.ts entrypoints to main.ts to improve Deno compatibility

## 1.0.1-alpha

### Patch Changes

-   a871a43c: minor improvements to default problem messages

## 1.0.0-alpha

### Major Changes

-   1f7658f8: release 1.0.0-alpha ⛵

### Minor Changes

-   1f7658f8: allow adhoc problems via "mustBe" and "cases" codes
-   1f7658f8: add custom messages for validation keywords
-   1f7658f8: discriminated branches are now pruned to avoid redundant checks
-   1f7658f8: add config expressions, preserve configs during traversal
-   1f7658f8: add key traversal options for "distilled" and "strict" keys

### Patch Changes

-   1f7658f8: fix narrow tuple expression recursive inference
-   1f7658f8: add parsedNumber, parsedInteger validator keywords
-   1f7658f8: add Luhn Validation to creditCard keyword

## 0.6.0

### Minor Changes

-   da4c2d63: allow adhoc problems via "mustBe" and "cases" codes
-   da4c2d63: add custom messages for validation keywords
-   da4c2d63: discriminated branches are now pruned to avoid redundant checks
-   da4c2d63: add config expressions, preserve configs during traversal
-   da4c2d63: add key traversal options for "distilled" and "strict" keys

### Patch Changes

-   da4c2d63: fix narrow tuple expression recursive inference
-   da4c2d63: add parsedNumber, parsedInteger validator keywords
-   da4c2d63: add Luhn Validation to creditCard keyword

## 0.5.1

### Patch Changes

-   7a6d6504: fix narrow tuple expression recursive inference

## 0.5.0

### Minor Changes

-   285842e4: allow adhoc problems via "mustBe" and "cases" codes
-   285842e4: discriminated branches are now pruned to avoid redundant checks

### Patch Changes

-   285842e4: add parsedNumber, parsedInteger validator keywords
-   285842e4: add Luhn Validation to creditCard keyword

## 0.4.0

### Minor Changes

-   33682224: add expression helper functions (intersection, arrayOf, etc.)
-   33682224: include prototype keys in keyof types, align inference with TS keyof

## 0.3.0

### Minor Changes

-   db9379ee: improve problem configs, make them available at type and scope levels
-   db9379ee: add prerequisite props (props that must be valid for others to check)
-   db9379ee: keep track of configs during traversal, query most specific relevant options
-   db9379ee: fix return values for nested morphs
-   db9379ee: infer keyof array types as `${number}`

### Patch Changes

-   db9379ee: fix multi-part error message writers

## 0.2.0

### Minor Changes

-   37aa4054: improve problem configs, make them available at type and scope levels
-   37aa4054: keep track of configs during traversal, query most specific relevant options

### Patch Changes

-   37aa4054: fix multi-part error message writers

## 0.1.4

### Patch Changes

-   27f2ec8c: improve duplicate alias error messages for scope imports
-   27f2ec8c: add validation for keyof operands

## 0.1.3

### Patch Changes

-   f3776be1: add new default jsObjects space
-   f3776be1: replace subdomain with objectKind, allow configurable instanceof checks

## 0.1.2

### Patch Changes

-   6956bae: allow access to internal API through arktype/internal

## 0.1.1

### Patch Changes

-   3a0fa48: - include data in check results regardless of success
    -   fix morph inference within node definitions

## 0.1.0

### Minor Changes

-   cad89ca: refactor: arktype 1.0 prerelease
