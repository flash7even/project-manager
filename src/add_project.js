const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

function postProject(project_data){
  const url = 'http://localhost:5000/api/project/';
  alert('URL: ' + url)
  alert('project_data: ' + JSON.stringify(project_data))

  axios.post(url, project_data)
  .then(function(response){
    console.log('saved successfully')
    alert('Response received')
  });  
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

function sendAddProjectForm(event) {
    event.preventDefault() // stop the form from submitting
    let project_name = document.getElementById("project_name").value;
    let description = document.getElementById("description").value;

    var project_data = {
      'project_name': project_name,
      'description': description
    }

    //getProject()
    //alert('Returned from get project')
    postProject(project_data)
    alert('Returned from post project')

    //var window = remote.getCurrentWindow();
    //window.close();
    //ipc.send('form-submission', firstname)
}