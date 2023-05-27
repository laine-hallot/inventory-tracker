# Inventory Tracker

Note: This repo is in its early stages and the code here is actively being updated.

This is a fairly simple inventory tracking program with a frankly overkill project setup because I wanted to experiment with a few things.

### The end goals of this project:

- Track the quantity of different kinds of inventory items which may or may not have their own subtypes of themselves, and those subtypes may or may not have their own decay rates applied to them.
- Modular storage system that allows you to chose different storage backends or even implement your own (ie. Web browser local storage, REST backend, or saving to a file on the system's file system).
- The program can be run in the browser or locally.
- Integration with stuff like discord bots or email to notify the user when a supplies are low.
- Drain sources connected to real world devices so inventory can be tracked in real time instead of just a number that gets subtracted at a set time interval.
