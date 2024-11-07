# Random Username Selector

This script randomly selects a set of unique usernames from a predefined list and returns them as a comma-separated string. The number of selected usernames is randomized to either 3 or 4.

## Code Overview

The script is written in the Arcade scripting language, which is commonly used for custom expressions in ArcGIS. It utilizes built-in functions to manipulate arrays and generate random values.

## How It Works

1. **Define Input**: An initial list of placeholder usernames (`username1`, `username2`, `username3`, etc.) is created in the form of a comma-separated string.
2. **Split Input**: The string is split into an array called `items` using the `Split` function.
3. **Random Number of Items**: A random number, either 3 or 4, is generated to specify how many usernames to select.
4. **Selection Loop**: A `while` loop is used to add random usernames from the `items` array to `selectedItems`. This loop ensures:
   - Each selected username is unique.
   - Selection continues until the desired number of usernames (3 or 4) is reached.
5. **Concatenate Output**: The selected usernames are combined into a single comma-separated string.
6. **Return Output**: The script returns the final string of usernames.

## Code

```javascript
// Input string with placeholder usernames
var input = "username1, username2, username3, username4, username5"

// Split input string by commas
var items = Split(input, ", ")

// Initialize an empty list to hold selected items
var selectedItems = []

// Generate a random number between 3 and 4 for the number of items to select
var numItems = Round(Random() * 1) + 3  // This will be 3 or 4

// Loop until we have selected the desired number of random, unique items
while(Count(selectedItems) < numItems) {
    var randomIndex = Floor(Random() * Count(items))  // Get a random index from the items list
    var randomItem = items[randomIndex]

    // Add the item if it's not already in the selectedItems list
    if (IndexOf(selectedItems, randomItem) == -1) {
        Push(selectedItems, randomItem)
    }
}

// Join the selected items with commas to create the output
var output = Concatenate(selectedItems, ", ")

// Display the output
return output
```

## Example Output

Running this code will generate a random output with 3 or 4 usernames from the list, for example:
```
username3, username1, username5
```

## Notes

- The script guarantees that the selected usernames are unique.
- The function `Round(Random() * 1) + 3` ensures that `numItems` will be either 3 or 4.
- This script can be adapted to use different usernames by modifying the `input` string.

## Requirements

- This code is written for use in ArcGIS with the Arcade language, compatible with environments where Arcade expressions are supported.
