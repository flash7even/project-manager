const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');


async function makePostRequest(project_data) {

    let res = await axios.post('http://localhost:5000/api/project/', project_data);

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data.JSON}`);
    return res

}

function getProject(){
  const url = 'http://localhost:5000/api/project/getproject';
  alert('Get URL: ' + url)

  axios.get(url)
  .then(res => {
      alert('GET Project Done')
      const cryptos = res.data.message
      alert(cryptos.toLocaleString('en'))
      alert('Axios Done')
  })
}

async function sendAddProjectForm(event) {
    event.preventDefault() // stop the form from submitting
    let project_name = document.getElementById("project_name").value;
    let description = document.getElementById("description").value;
    let myheader = document.getElementById("myheader").value;

    alert('Inside sendAddProjectForm')
    alert('project name is' + project_name)

    var project_data = {
      'project_name': project_name,
      'description': description
    }
    
    let data = await makePostRequest(project_data);
    alert(JSON.stringify(data.data))

    message = data.data['message']
    alert(message)
    var todoList = document.getElementById('todoList')
    todoList.innerHTML = message
}





