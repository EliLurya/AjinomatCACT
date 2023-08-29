1. TypeError: nodes is not iterable
   The main problem was flow (from DB) is undefined, I tried to solve it by checking the nodes and edges of each protocol and resetting them, for some reason it didn't help, so
   in src\pages\protocols\partials\hooks.tsx I built a function that checks if nodes is undefined, if so, it resets it to an empty array, and inserts node, if not, inserts node, and I also updated all the nodes' id types if they are undefined (In such a situation we would receive an ingredient id, ingredient-Nan).
   Then another error came when they connected with edge 2 nodes (the array of Edges undefined), I corrected it in src\pages\protocols\create_edit.tsx, I added useEffect, so that every time the user creates a new node, it is checked if edges are undefined, if so, reset the edges to an empty array

2. I adjusted the size of grids (columns and rows) in Design in components /sensory/index.tsx and sensory/charts/index.tsx
   And I also arranged the arrows and their background in the list of Sensory panel, Taste intensityl, Aroma Intensity
   as well as preventing text from overflowing the line in :
   src\pages\protocols\components\tabs\design\component\extraList.tsx
   src\pages\protocols\components\tabs\design\component\list.tsx

3. I changed the autocomplete in Ingredient and Process to startsWith (from contain)

4. I added select in Report
in src\pages\Reports\partials\charts.tsx, I added to the fetch function useState to hold all projects, and I also added useEffect when a new project is selected
In src\pages\Reports\index.tsx I called useState and from there it was sent to src\pages\Reports\components\statistics\index.tsx (I did it the way of the programmer who wrote the code...), I created a Select there according to the ID of the project

Old missions
1. In src\utilities\endpoints.ts I added endPoint "all_ingredients", which receives all ingredients.   
In src\pages\protocols\partials\hooks.ts I added a fetch list of ingredients.
In src\pages\protocols\components\ingredient-row\index.tsx I called ingredients and did Autocomplete for the ingredient node, and also added valdtion to the amount (negative number, decimal)

2. In src\pages\protocols\partials\hooks.ts I added to merge mergeActions, that merge can get time

3. In src\pages\protocols\components\protocols\components\time-picker\index.tsx I added validation - minus, a decimal number, so in this way, merge and process has validation 

4. In src\pages\protocols\components\tabs\Add\index.tsx I added to Process Autocomplete
