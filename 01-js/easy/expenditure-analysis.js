/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  output = []
  transactions.forEach(element => {
    add_in_output(element.category, element.price, output)
  });
  return output;
}

function add_in_output(cat, price, output){
  found = false
  for (let item of output){
    if (item.category === cat){
      found = true
      item.totalSpent += price
    }
  }

  if (!found){
    output.push({category: cat, totalSpent: price})
  }
}
module.exports = calculateTotalSpentByCategory;
