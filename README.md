# Fridg·u·Dare Client App
Created by [Phoebe Law](http://shiningjustice.github.io/)

Fridg·u·Dare was born from a desire to *1. reduce food waste* and *2. save time and money*. By keeping an inventory of what's in your fridge, visually aging items by item type, and keeping this as simple as possible, users should be able to accomplish both goals in a feasible way. This can be accomplished by helping you see what you have and if it's going bad (so you don't forget to buy something/don't forget that you already have something) and by helping you see if you have food you can finish before going out to eat. An secondary use for this is maintaining a clean fridge - being able to quickly see what is too old will prevent anything from going bad for too long (e.g., if tupperware is hiding behind the gallon of milk). 

Additionally, this app can be scaled to include API support to simplify adding items to your list (specifically scanning barcodes to auto add item to the right category). 

[Link to live site](https://fridgeudare-app.shiningjustice.now.sh/)
[Link to server repo](https://github.com/shiningjustice/fridgeudare-server)

## Tech Stack
HTML, CSS, JavaScript, React, Node.js

## Screenshots and Components 
Within the app itself (`/demo`), there are three main routes (`/demo`, `demo/add-item`, and `demo/edit-item/:itemId`). Independent of these three routes is the `Modal` component.  

### The `/demo` Route

![The demo route](https://imgur.com/DYjab1W.png)

Here, the `Options` and `Fridge` components are rendered. For mobile and tablet widths, the `Options` component is rendered within the navigation bar (`DemoNav`). 

![The options component in a smaller screen](https://imgur.com/lfyHO5t.png)

For laptop and larger widths, it's rendered within the main component (`DemoMain`). The `Fridge` component consists of nested `FridgeSection` and `FridgeItem` components. 

### The `/demo/add-item` and  `/demo/edit-item/:itemId` Routes

![The add item route](https://imgur.com/2KKIIyk.png)
![The edit item route](https://imgur.com/6qQjsE8.png)

Nested within both the `AddItem` and `EditItem` components is the `ItemForm` component, which is used to render both forms (the parent component passes in necessary distinctions for function, UI, such as name of the form, the way info (if any) is rendered (i.e., item info for the edit item), as well as how the state is updated and fetch calls run for each. 

### The `Modal` Component

![The Modal component](https://imgur.com/s1Ekbsx.png)

The `Modal` component that takes signups is rendered outside of the `DemoMain` component as it can be rendered from the `/` route and was written from scratch. It displays  
