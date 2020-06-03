# Minimal-Calculator
A Minimalistic Calculator, optimized for quick &amp; simple calculations.

## Why?
- Quick calculations need a simple interface with simple features, and most day-to-day calculations, on average, are simple.
- Also, why not :)

## What?
A cross platform hybrid-application, built from same source, using Angular and Ionic.
- [PWA](https://minimal-calculator.github.io/)
- Android App (soon)
- iOS App (maybe. it's expensive)

## How?
The tools in the mix are: 
- [Angular](https://angular.io/) as JavaScript framework, and for PWA setup. 
- [Ionic-Capacitor](https://ionicframework.com/) for packaging and tooling for Mobile platforms.
- [MathJS](https://mathjs.org/) for the actual calculations.

These are the things that this App was able to achieve successfully:
- Minimalistic design optimised for one-handed quick calculations, no extra complexity, just the bare minimum every-day necessities.
- Truly platform-agnostic, super responsive, should be able to withstand almost any resolution/aspect-ratio.
- Automatic font-resize depending on the amount of space available and content to fill, similar to Google's Calculator.

Building a calculator should be pretty easy but getting all things working on all platforms and browsers is a still bit harder than I thought.
- Keeping the Soft-Keyboard hidden was made possible by not so widely supported [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#:~:text=The%20inputmode%20global%20attribute%20is,No%20virtual%20keyboard.) attribute.
It works in Android App, and webkit-based mobile-browsers. Other mobile-browsers would just have to do with abrupt `input.blur()` and without any cursor indicator.
- The PWA build built with Ionic was more than 3MBs, but luckily we only need Ionic for building Android/iOS Apps, there's no other dependency on Ionic, so the source-code was put into an Angular CLI App shell, and the PWA came to be just ~950KB, after excluding es5 bundles from ngsw cache.
-  MathJS is not tree-shakeable, so the 500KBs of 950KB is just MathJS, although we only use `evaluate` method, it probably requires a lot of features from MathJS but 500KB is still too much.

Timeline:
- Day1: 98% coding and styling done. Working, production-ready WebApp is complete. For calculation, went from `eval` to trying to implement `BigFloat` then trying to use a third party `BigFloat equivalent` library to finally settling on MathJS.
- Day2: Setup Ionic-Capacitor, created Logo and Splash screen, testing on actual Android device. Setup GitHub repo, sync-up. Published PWA as GitHub pages. 
- Day3: Spent disabling soft-keyboard, trying different techniques and configurations. CSS `min` fallback and some minor fixes. Some Logo modifications. More testing and tweaking.
- Day4: Settled on `input.blur()` for non-webkit browsers, tried to add a button to toggle soft-keyboard for complex expressions, decided not to. Splash-screen tweaks and fixes, stretching could not be solved, and could not be removed, so settled on a pitch-black empty image. More optimizations and testing/fixes.
- Day5: Publish on PlayStore, contemplate about publishing on AppStore, then decide not to.


