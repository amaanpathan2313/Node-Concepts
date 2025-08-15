

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