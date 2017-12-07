//In a constant for ease of future export.
const formatDate = function() {
  //Use the Date() 
  const date = new Date();
  //Because String Template Literals are bae.
  let formattedDate = `${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}`;
  return formattedDate;
};
//Uncomment below and you can run this for testing purposes
//console.log(formatDate())
module.exports = formatDate;
