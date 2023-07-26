const mongoose = require("mongoose");
const validator = require("validator");

const elnathCredittable = new mongoose.Schema({
  empid: {
    type: String,
    require: true,
  },
  card_number: {
    type: Number,
    require: true,
  },
  employee_id: {
    type: String,
    require: true,
  },
  employee_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  manager_email: {
    type: String,
    require: true,
  },
  cost_center: {
    type: String,
    require: true,
  },
  department: String,
  cost_center_owner_name: String,
  company_id: {
    type: String,
    require: true,
  },
  super_admin: {
    type: String,
    require: true,
  },
  admin_id: {
    type: String,
    require: true,
  },
  local_admin: {
    type: String,
    default: null,
  },
  machine_id: {
    type: String,
    default: null,
    require: true,
  },
  monthly_limit: {
    type: Number,
    default: 0,
    require: true,
  },
  credit_balance: {
    type: Number,
    default: creditBalance,
    require: true,
  },
  transaction_count: {
    type: Number,
    default: 0,
    require: true,
  },
  credit_month: {
    type: String,
    default: currentMonth,
    require: true,
  },
  credit_validity_from: {
    type: Date,
    default: firstDayOfMonth,
    require: true,
  },
  credit_validity_to: {
    type: Date,
    default: oneMonthFromNow,
    require: true,
  },
  active_status: {
    type: Boolean,
    default: false,
    require: true,
  },
  creditid: {
    type: String,
    default: creditID,
    require: true,
    unique: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
}); //don't change the employee schema parameter (card_number) name, then u have change in (app.js:78,83) file where it compare with card number coming from get request from the vending machine........//

// we will create a new collecction
function oneMonthFromNow() {
  var d = new Date();
  var targetMonth = d.getMonth() + 1;
  d.setMonth(targetMonth);
  // if(d.getMonth() !== targetMonth % 12) {

  d.setHours(24, 0, 0, 0);
  d.setMinutes(0);
  d.setDate(1); // last day of previous month
  // }
  return d;
}
function firstDayOfMonth() {
  var d = new Date();
  var targetMonth = d.getMonth();
  d.setMonth(targetMonth);
  // if(d.getMonth() !== targetMonth % 12) {

  d.setHours(0, 0, 0, 0);
  d.setMinutes(0);
  d.setDate(02); // first day of previous month
  // }
  return d;
}
function currentMonth() {
  var d = new Date();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthname = month[d.getMonth()];
  return monthname + d.getFullYear();
}
function creditID() {
  var d = new Date();
  var st = "" + this.card_number + this.credit_month;

  return st;
}
function creditBalance() {
  return this.monthly_limit;
}

const ElnathCredittable = new mongoose.model(
  "elnathCredittable",
  elnathCredittable
);

module.exports = ElnathCredittable;
