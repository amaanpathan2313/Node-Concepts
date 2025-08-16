

db.orders.aggregate([{$group : {_id : "$status"}}])
=> group by different status



db.orders.aggregate([{$group : {_id : "$status", total_value : {$sum : "$amount"}}}])
=> group by different status and sum their amounts

db.orders.aggregate([{$match : {status : "pending"}}, {$group : {_id : "$amount"}} ])
                      -----------------------------    -------------------------------
                              stage 1                              stage 2

                    

db.orders.aggregate([{$match : {status : "pending"}}, {$group : {_id : "$name", total_sum : {$sum : "$amount"}}} ])
                    ------------------------------    --------------------------------------------------------
                                     stage 1                              stage 2


db.orders.aggregate([{$match : {status : "delivered"}}, {$group : {_id : "$name"}},{$project:{name:"$_id", _id : 0}}])
                    ----------------------------------   -------------------------  ---------------------------------
                                   stage 1                       stage 2                         stage 3



db.orders.aggregate([{$match: {status : "pending"}},
                     {$project : {current : "status", _id : 0}}])               // use Ctrl + enter to go on next line  


                
db.orders.aggregate([
                       {$match: {status : "pending"}}, 
                       {$sort: { amount: -1 } },
                       {$project : {current : "$status", _id : 0}}
                    ])
 




 db.orders.aggregate([{$group : {_id : "$status" , order : {$push : "$$ROOT" }}}])



 # Lookup : Look into another collection and extract values

 db.users.aggregate([{$lookup : { 
  from: "orders",                     //  which collection you want to look
  localField : "_id",                // your field name same as other collection field name
  foreignField : "userId",          // other collection field name 
  as : "orders"                    //  name of the array
}}])



db.orders.aggregate([{$lookup : {
  from : "users",
  localField : "userId",
  foreignField : "_id",
  as : "usersList"
}}])


# unwind : It split array into single - single Object


db.orders.aggregate([
  {
    $lookup: {
      from: "users",          // Collection to join with
      localField: "userId",   // Field in orders
      foreignField: "_id",    // Field in users
      as: "usersList"         // Store matched user docs in this array
    }
  },
  {
    $unwind: "$usersList"     // Flatten the array into a single object
  }
])




====================================================================


db.orders.aggregate([
  {
    $lookup: {
      from: "users",            // The other collection to join (users)
      localField: "userId",     // Field in orders
      foreignField: "_id",      // Field in users to match with userId
      as: "user"                // The joined data will appear in an array called "user"
    }
  },
  {
    $unwind: "$user"            // Since lookup gives an array, unwind turns it into an object
  },
  {
    $project: {
      ProductName: "$itemName", // Rename 'itemName' → 'ProductName'
      OrderBy: "$user.name"     // Get the user's name from the joined collection
    }
  }
])

=========================================================



   db.orders.aggregate([
  {
    $bucket: {
      groupBy: "$amount",              // Field used for bucketing
      boundaries: [0, 500, 1000],      // Define ranges (buckets)
      default: "others",               // Anything outside these boundaries
      output: {
        count: { $sum: 1 },            // Count documents in each bucket
        products: { $push: "$itemName" }, // Collect product names
        price: { $push: "$amount" }    // Collect amounts
      }
    }
  }
])


==============================================================



Stage / Operator  - Purpose
------------------------------------------------------------
$sort             - Sort the result
$limit            - Limit number of documents
$skip             - Skip N documents (useful for pagination)
$count            - Count number of documents
$addFields        - Add calculated/derived fields
$unset            - Remove specific fields
$in               - Match documents where a field’s value exists in a given array
$nin              - Match documents where a field’s value is NOT in a given array


====================================================================================


Stage     - Use Case
---------------------------------------------------------------
$facet    - Run multiple pipelines in parallel and combine results
$bucket   - Group documents into dynamic ranges (like age groups, price buckets)
$cond     - Conditional logic (if/else) inside aggregation







========================================================================


 Summary Cheatsheet

 ---------------------------------------------------------------
Stage	                                  Summary
-----------------------------------------------------------------------
$match	    ==================>     Filter documents like .find()
$group	    ==================>     Group by field and perform aggregation
$project	  ==================>     Select and shape fields
$lookup	    ==================>     Perform join-like operations
$unwind     ==================>     	Deconstruct arrays to individual documents
$sort	      ==================>     Sort documents
$limit	     ==================>     Return N documents
$addFields	  ==================>     Add computed or new fields


🧪 Interviewer Observations
Do they know why aggregation is needed over queries?
Do they understand $group, $match, $lookup clearly?
Can they explain the pipeline flow?
Do they understand $unwind necessity after $lookup?
📝 Notes for Practice
✅ Try building a pipeline that:

Filters delivered orders
Groups by customer
Calculates total amount
Projects name and total
✅ Join users and orders, and find total amount per user.

✅ Use $facet to get two results: top 3 customers and bottom 3 customers.