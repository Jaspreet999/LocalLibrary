var mongoose = require('mongoose');

const {DateTime}  = require('luxon')
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
 
  lifetime_string = this.date_of_birth?DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED):"No Data";

  if(lifetime_string != "No Data"){
    lifetime_string += ' - ';
    lifetime_string += 
    this.date_of_death?DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED):"Still Alive";
  }
  
  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return "/catalog/author/" + this._id;
});

AuthorSchema
.virtual('dateofbirth')
.get(function(){
  return DateTime.fromJSDate(this.date_of_birth).toISODate()
})

AuthorSchema
.virtual('dateofdeath')
.get(function(){
  return DateTime.fromJSDate(this.date_of_death).toISODate()
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
