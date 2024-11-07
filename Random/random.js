// Input string
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
