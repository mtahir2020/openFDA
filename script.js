const drugInfo = document.getElementById('drug-info');
const form = document.getElementById('form');
const search = document.getElementById('search');
const clear = document.getElementById('clear');
const drugBox = document.getElementById('drug-box')


////////////////

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  console.log(searchTerm);

  if (!searchTerm) {
    alert('Please enter search term')
  } else {
    getDrugs(searchTerm);
  }
})

///////////////////

function getDrugs(drugName){

  const request = new XMLHttpRequest();
  request.open('GET', `https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:"${drugName}"&limit=5`)
  // request.open('GET', `https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:"${drugName}"`)
request.send();

 //----Reset results-----
 clear.addEventListener('click', function(e){
  e.preventDefault()
  form.reset();
  drugInfo.innerHTML = `<h3 class="message">Search results cleared</h3>`
})

request.addEventListener('load', function(){
  // console.log(this.responseText);

  const {results} = JSON.parse(this.responseText)
  console.log(results);

  // if/else to see if drug exists
  if (!results) {
    // console.log('Nothing found');
    drugInfo.innerHTML = `<h3 class="message">No drug was found. Please try again.</h3>`
  } else {
  let output = '';

  results.forEach((drug) => {

    output += `
    <li class="drug-box">
      <h3>Drug Name:</h3> <p>${drug.products[0].brand_name}</p>
      <h3>Dosage Form:</h3> <p>${drug.products[0].dosage_form}</p>
      <h3>Manufacturer:</h3> <p>${drug.sponsor_name}</p>
    </li>
    `
  })

  drugInfo.innerHTML = `
  <ol>
    ${output}
  </ol>
  `
  }
})


}

// getDrugs('Ibuprofen')
// getDrugs('Cetirizine')
