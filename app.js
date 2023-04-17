var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const { check, validationResult, param } = require("express-validator");
// custom module
const {
  searchReservation,
  insertReservation, 
  updateReservation,
  deleteReservation,
  searchRoom,
  insertRoom,
  updateRoom,
  deleteRoom,
  searchType,
  insertType,
  updateType,
  deleteType,
} = require("./model/lab101.model");

// load .env
require("dotenv").config();

// check Validator
const ReservationformsaveDataValidator = [
  check("reservation_id").not().isEmpty().withMessage("Please input your reservation_id"),
  check("customer_id").not().isEmpty().withMessage("Please input your customer_id"),
  check("num_guests").not().isEmpty().withMessage("Please input your num_guests"),
  check("check_in_date").not().isEmpty().withMessage("Please input your check_in_date"),
  check("check_out_date").not().isEmpty().withMessage("Please input your check_out_date"),
  check("total_amount").not().isEmpty().withMessage("Please input your total_amount"),
  check("transaction_datetime").not().isEmpty().withMessage("Please input your transaction_datetime"),
  check("account_name").not().isEmpty().withMessage("Please input your account_name"),
  check("payment_status").not().isEmpty().withMessage("Please input your payment_status"),
];

// check Validator
const RoomformsaveDataValidator = [
  check("room_id").not().isEmpty().withMessage("Please input your room_id"),
  check("type_id").not().isEmpty().withMessage("Please input your type_id"),
];
const TypeformsaveDataValidator = [
  check("type_id").not().isEmpty().withMessage("Please input your type_id"),
  check("type_name").not().isEmpty().withMessage("Please input your type_name"),
  check("num_beds").not().isEmpty().withMessage("Please input your num_beds"),
  check("max_guests").not().isEmpty().withMessage("Please input your max_guests"),
  check("price").not().isEmpty().withMessage("Please input your price"),

];

// start express
var app = express();
app.use(cors());

const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json({ verify: rawBodySaver }));

// start ejs (Embedded JavaScript templates)
app.set("view engine", "ejs");

// list data
app.get("/room", async function (req, res) {
  let results = await searchRoom(res);
  res.render("room_listdata", {
    resultsRoom: results.recordset,
  });
});

// input form
app.get("/room/form", function (req, res) {
  res.render("room_formdata");
});

// insert new record
app.post("/room/formsave", RoomformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("room_formdata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      room_id: req.body.room_id,
      type_id: req.body.type_id,
    };

    console.log("insert new record: " + my_paylaod);

    let results = await insertRoom(res, my_paylaod);

    if (results == 1) {
      return res.redirect("/room/");
    } else {
      console.log(results);
    }
  }
});

// update form
app.get("/room/update/:room_id", function (req, res) {
  console.log(req.params.room_id);
  // query for get name
  // ...

  res.render("room_updatedata", {
    idRoom: req.params.room_id,
  });
});

app.post("/room/updatesave", RoomformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("room_updatedata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      room_id: req.body.room_id,
      type_id: req.body.type_id,      
    };

    console.log("update: " + my_paylaod);

    let results = await updateRoom(res, my_paylaod);

    if (results == 1) {
      return res.redirect("/room/");
    } else {
      console.log(results);
    }
  }
});

// delete form
app.get("/room/delete/:room_id", async function (req, res) {
  console.log(req.params.room_id);
  // query for get name
  // ...
  let results = await deleteRoom(res,req.params.room_id);
  if (results == 1) {
    return res.redirect("/room/");
  } else {
    console.log(results);
  }
});

// list data
app.get("/reservation", async function (req, res) {
  let results = await searchReservation(res);
  res.render("reservation_listdata", {
    resultsReservation: results.recordset,
  });
});

// index
app.get("/", function (req, res) {
  res.render("index");
});

// input form
app.get("/reservation/form", function (req, res) {
  res.render("reservation_formdata");
});


// update form
app.get("/reservation/update/:reservation_id", function (req, res) {
  console.log(req.params.reservation_id);
  // query for get name
  // ...

  res.render("reservation_updatedata", {
    idReservation: req.params.reservation_id,
  });
});

// delete form
app.get("/reservation/delete/:reservation_id", async function (req, res) {
  console.log(req.params.reservation_id);
  // query for get name
  // ...
  let results = await deleteReservation(res,req.params.reservation_id);
  if (results == 1) {
    return res.redirect("/reservation");
  } else {
    console.log(results);
  }
});

// insert new record
app.post("/reservation/formsave", ReservationformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("reservation_formdata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      reservation_id: req.body.reservation_id,
      customer_id: req.body.customer_id,
      num_guests: req.body.num_guests,
      check_in_date: req.body.check_in_date,
      check_out_date: req.body.check_out_date,
      total_amount: req.body.total_amount,
      transaction_datetime: req.body.transaction_datetime,
      account_name: req.body.account_name,
      payment_status: req.body.payment_status
    };

    console.log("insert new record: " + my_paylaod);
    let results = await insertReservation(res, my_paylaod)
    if (results == 1) {
      return res.redirect("/reservation");
    } else {
      console.log(results);
    }
  }
});

// insert new record
app.post("/reservation/updatesave", ReservationformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("reservation_updatedata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      reservation_id: req.body.reservation_id,
      customer_id: req.body.customer_id,
      num_guests: req.body.num_guests,
      check_in_date: req.body.check_in_date,
      check_out_date: req.body.check_out_date,
      total_amount: req.body.total_amount,
      transaction_datetime: req.body.transaction_datetime,
      account_name: req.body.account_name,
      payment_status: req.body.payment_status
    };

    console.log("Update: " + my_paylaod);
    let results = await updateReservation(res, my_paylaod)
    if (results == 1) {
      return res.redirect("/reservation");
    } else {
      console.log(results);
    }
  }
});
// list data
app.get("/type", async function (req, res) {
  let results = await searchType(res);
  res.render("type_listdata", {
    resultsType: results.recordset,
  });
});


// input form
app.get("/type/form", function (req, res) {
  res.render("type_formdata");
});

// update form
app.get("/type/update/:type_id", function (req, res) {
  console.log(req.params.type_id);
  // query for get name
  // ...

  res.render("type_updatedata", {
    idType: req.params.type_id,
  });
});

// delete form
app.get("/type/delete/:type_id", async function (req, res) {
  console.log(req.params.type_id);
  // query for get name
  // ...
  let results = await deleteType(res,req.params.type_id);
  if (results == 1) {
    return res.redirect("/type");
  } else {
    console.log(results);
  }
});

// insert new record
app.post("/type/formsave", TypeformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("type_formdata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      type_id: req.body.type_id,
      type_name: req.body.type_name,
      num_beds: req.body.num_beds,
      max_guests: req.body.max_guests,
      price: req.body.price,
    };

    console.log("insert new record: " + my_paylaod);

    let results = await insertType(res, my_paylaod);

    if (results == 1) {
      return res.redirect("/type");
    } else {
      console.log(results);
    }
  }
});

app.post("/type/updatesave", TypeformsaveDataValidator, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("type_updatedata", {
      initData: req.body,
      errorData: errors.mapped(),
    });
  } else {
    let my_paylaod = {
      type_id: req.body.type_id,
      type_name: req.body.type_name,
      num_beds: req.body.num_beds,
      max_guests: req.body.max_guests,
      price: req.body.price,
    };

    console.log("update: " + my_paylaod);

    let results = await updateType(res, my_paylaod);

    if (results == 1) {
      return res.redirect("/type");
    } else {
      console.log(results);
    }
  }
});



app.listen(process.env.PORT, () => {
  console.log("server run at port " + process.env.PORT);
});
