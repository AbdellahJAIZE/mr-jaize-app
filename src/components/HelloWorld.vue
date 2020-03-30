<template>
  <div class="hello">
    <h1>{{ title }}</h1>

    <div class="row">
      <div class="column">
        <button @click="views.add = true" class="btn">
          <i class="fa fa-plus"></i> Add
        </button>
      </div>
      <div class="column"></div>
    </div>

    <h2>My Folders</h2>

    <input
      type="text"
      id="myInput"
      onkeyup="myFunction()"
      placeholder="Search for codes.."
      title="Type in a code number"
    />

    <table id="myTable">
      <tr class="header">
        <th>*</th>
        <th>Code</th>
        <th>Region</th>
        <th>Date</th>
        <th style="width:15%;">Options</th>
      </tr>
      <tr v-for="doc in folders">
        <td></td>
        <td>{{ doc.data.code }}</td>
        <th>{{ doc.data.region }}</th>
        <th>{{ doc.data.date }}</th>
        <td style="width:20%;">
          <div class="row">
            <div class="columnbtn">
              <button
                @click="
                  views.edit = true;
                  fill(doc);
                "
                class="btn"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </div>
            <div class="columnbtn">
              <button @click="trash(doc)" class="btn">
                <i class="fa fa-trash"></i>
              </button>
            </div>
            
          </div>
        </td>
      </tr>
    </table>

    <!-- The Modal -->
    <div v-if="views.add" class="modal" style="display: block">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="views.add = false" class="close">&times;</span>
        <form action="" style="max-width:500px;margin:auto" v-on:submit.prevent>
          <div class="input-container">
            <select v-model="add.region" class="input-field">
              <option value="notSet">Region</option>
              <option value="BERR">BERR</option>
              <option value="DRA">DRA</option>
              <option value="OZN">OZN</option>
              <option value="OZD">OZD</option>
              <option value="KMD">KMD</option>
              <option value="RYH">RYH</option>
              <option value="JQM">JQM</option>
              <option value="OCH">OCH</option>
              <option value="EGR">EGR</option>
            </select>
          </div>

          <div class="input-container">
            <i class="fa fa-folder icon"></i>
            <input v-model="add.code"
              class="input-field"
              type="text"
              placeholder="folder"
              name="folder"
            />
          </div>

          <div class="input-container">
            <i class="fa fa-calendar icon"></i>
            <input v-model="add.date"
              class="input-field"
              type="date"
              placeholder="date"
              name="date"
            />
          </div>

          <button @click="addData" type="submit" class="btn">Register</button>
        </form>
      </div>
    </div>

    <div v-if="views.edit" class="modal" style="display: block">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="views.edit = false" class="close">&times;</span>
        <form action="" style="max-width:500px;margin:auto" v-on:submit.prevent>
          <div class="input-container">
            <select v-model="edit.region" class="input-field">
              <option value="notSet">Region</option>
              <option value="BERR">BERR</option>
              <option value="DRA">DRA</option>
              <option value="OZN">OZN</option>
              <option value="OZD">OZD</option>
              <option value="KMD">KMD</option>
              <option value="RYH">RYH</option>
              <option value="JQM">JQM</option>
              <option value="OCH">OCH</option>
              <option value="EGR">EGR</option>
            </select>
          </div>

          <div class="input-container">
            <i class="fa fa-folder icon"></i>
            <input v-model="edit.code"
              class="input-field"
              type="text"
              placeholder="folder"
              name="folder"
            />
          </div>

          <div class="input-container">
            <i class="fa fa-calendar icon"></i>
            <input v-model="edit.date"
              class="input-field"
              type="date"
              placeholder="date"
              name="date"
            />
          </div>

          <button @click="editData()" type="submit" class="btn">Register</button>
        </form>
      </div>
    </div>

    <div v-if="views.details" class="modal" style="display: block">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="views.details = false" class="close">&times;</span>
        .....
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../db.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      title: "Welcome to Mr-Jaize App",
      folders: [],
      add: {
        code: '',
        region: 'notSet',
        date:''
      },
      edit: {
        code: '',
        region: '',
        date:''
      },
      views: {
        add: false,
        edit: false,
        details: false
      },
      document:{}
    };
  },
  beforeMount: function() {},
  beforeCreate: function() {
    this.$session.start();
  },
  created() {
    db.collection("folders")
      .get()
      .then(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => {
          this.folders.push({
            id: doc.id,
            data: doc.data()
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  },
  methods: {
    trash: function(doc) {
      console.log(doc.id)
      db.collection('folders').doc(doc.id).delete();
      this.folders = this.folders.filter(obj => obj.id != doc.id);
    },
    view: function(doc) {
      console.log(doc);
    },
    fill: function(doc){
      this.edit = doc.data
      this.document = doc
    },
    editData: function() {
      if(this.edit.region == 'notSet'){
        alert("Region is no set")
      }else{
        console.log(this.document.id)
        console.log(this.edit)
        
        db.collection('folders').doc(this.document.id).delete();
        db.collection("folders")
          .add(this.edit)
          .then(ref => {
            location.reload();
          });
      }
      
    },
    addData: function() {
      db.collection("folders")
        .add(this.add)
        .then(ref => {
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#myInput {
  background-image: url("/css/searchicon.png");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

#myTable {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  font-size: 18px;
}

#myTable th,
#myTable td {
  text-align: left;
  
}

#myTable tr {
  border-bottom: 1px solid #ddd;
}

#myTable tr.header,
#myTable tr:hover {
  background-color: #f1f1f1;
}

.custom-select {
  position: relative;
  font-family: Arial;
}

.custom-select select {
  display: none; /*hide original SELECT element:*/
}

.select-selected {
  background-color: DodgerBlue;
}

/*style the arrow inside the select element:*/
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

/*point the arrow upwards when the select box is open (active):*/
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

/*style the items (options), including the selected item:*/
.select-items div,
.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}

/*style items (options):*/
.select-items {
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

/*hide the items when the select box is closed:*/
.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 10%;
  padding: 10px;
}
.columnbtn {
  float: left;
  width: 30%;
  padding: 10px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}

* {
  box-sizing: border-box;
}

.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon {
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}

/* Set a style for the submit button */
.btn {
  background-color: dodgerblue;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}

h1,
h2 {
  font-weight: normal;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
