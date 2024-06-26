const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAIL_GUN_API_KEY,
});

/// mailgun ended

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v7wkgs9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("bistroDb").collection("users");
    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    const cartCollection = client.db("bistroDb").collection("carts");
    const paymentCollection = client.db("bistroDb").collection("payments");
    const bookingCollection = client.db("bistroDb").collection("bookings");
    const userLocation = client.db("bistroDb").collection("userlocation");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // middlewares
    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    const VerifyRider = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isRider = user.role === "rider";
      if (!isRider) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // rider verification
    // users related api
    app.get("/users/rider/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let rider = false;
      if (user) {
        rider = user?.role === "rider";
      }
      res.send({ rider });
    });

    // Update user location status
    // Update user location status
    app.put("/userlocations/:id", async (req, res) => {
      const orderId = req.params.id; 
      const newStatus = req.body.status;
      const currentUserEmail = req.body.assignedto; // Make sure to extract the assignedto field from the request body

      try {
        const result = await userLocation.updateOne(
          { _id: new ObjectId(orderId) },
          { $set: { status: newStatus, assignedto: currentUserEmail } }
        );

        if (result.modifiedCount === 1) {
          res.status(200).send({
            message: "User location status updated successfully",
            result,
          });
        } else {
          res.status(404).send({ message: "User location not found" });
        }
      } catch (error) {
        console.error("Error updating user location status:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });
    // Add a new route handler for deleting user locations
    app.delete("/userlocations/:id", async (req, res) => {
      const orderId = req.params.id;

      try {
        // Delete the user location with the given ID
        const result = await userLocation.deleteOne({
          _id: new ObjectId(orderId),
        });

        if (result.deletedCount === 1) {
          res
            .status(200)
            .send({ message: "User location deleted successfully" });
        } else {
          res.status(404).send({ message: "User location not found" });
        }
      } catch (error) {
        console.error("Error deleting user location:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // users related api
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesnt exists:
      // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "rider",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // menu related apis
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    });

    app.patch("/menu/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          recipe: item.recipe,
          image: item.image,
        },
      };

      const result = await menuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // carts collection
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    // POST route for handling form submission
    app.post("/bookings", async (req, res) => {
      const formData = req.body;
      formData.userId = req.userId; // Assuming you have a middleware to extract userId from request
      const result = await bookingCollection.insertOne(formData);
      res.send(result);
    });

    // GET user locations
    app.get("/userlocations", async (req, res) => {
      try {
        const userLocations = await userLocation.find().toArray();
        console.log(userLocations);
        res.send(userLocations);
      } catch (error) {
        console.error("Error fetching user locations:", error);
        res.status(500).send("Internal server error");
      }
    });

    // Update user location status
    app.put("/userlocations/:id", async (req, res) => {
      const orderId = req.params.id;
      const newStatus = req.body.status;

      try {
        // Update the status of the order with the given ID
        const result = await userLocation.updateOne(
          { _id: new ObjectId(orderId) },
          { $set: { status: newStatus } }
        );

        if (result.modifiedCount === 1) {
          res
            .status(200)
            .send({ message: "Order status updated successfully" });
        } else {
          res.status(404).send({ message: "Order not found" });
        }
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // saving user's location
    app.post("/userlocation", async (req, res) => {
      const formData = req.body;
      console.log(formData);
      const result = await userLocation.insertOne(formData);
      res.send(result);
    });

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, "amount inside the intent");

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/payments", async (req, res) => {
      try {
        const result = await paymentCollection.find({}).toArray();
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      //  carefully delete each item from the cart
      console.log("payment info", payment);
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };

      const deleteResult = await cartCollection.deleteMany(query);

      const data = {
        from: "Mailgun Sandbox <postmaster@sandboxcbb3b27232154f3eacdacdb5ce5851aa.mailgun.org>",
        to: "pybafegi@tutuapp.bid",
        subject: "Foodify ORDER CONFIRMATION",
        text: "Testing some Mailgun awesomness!",
        html: `
          <div>
          <h2>Thank you for your order</h2>
          <h4>Your transaction id: <strong>${payment.transactionId}</strong></h4>
          <p>We would like to get the feedback about food</p>
          </div>
          
        `,
      };

      mg.messages().send(data, function (error, body) {
        console.log(body);
      });

      res.send({ paymentResult, deleteResult });
    });

    //

    // stats or analytics
    // stats or analytics
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      // this is not the best way
      // const payments = await paymentCollection.find().toArray();
      // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });
    // order status
    /**
     * ----------------------
     *      Non efficent way
     * ----------------------
     * 1. load all the payments
     * 2. for every menuItemIds (array), go find the menuCollection
     * 3. for every item in the menuCollection found,
     */

    // using aggregate pipeline
    // app.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {

    // using aggregate pipeline
    app.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$menuItemIds",
          },
          {
            $lookup: {
              from: "menu",
              localField: "menuItemIds",
              foreignField: "_id",
              as: "menuItems",
            },
          },
          {
            $unwind: "$menuItems",
          },
          {
            $group: {
              _id: "$menuItems.category",
              quantity: { $sum: 1 },
              revenue: { $sum: "$menuItems.price" },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              quantity: "$quantity",
              revenue: "$revenue",
            },
          },
        ])
        .toArray();

      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server running ");
});

app.listen(port, () => {
  console.log(`Server port ${port}`);
});

/**
 * --------------------------------
 *      NAMING CONVENTION
 * --------------------------------
 * app.get('/users')
 * app.get('/users/:id')
 * app.post('/users')
 * app.put('/users/:id')
 * app.patch('/users/:id')
 * app.delete('/users/:id')
 *
 */
