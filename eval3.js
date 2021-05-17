var list = document.getElementById("list");

/* Ajouter un nouvel employé a la liste */ 
function btnAdd() {

    var name = document.getElementById("addName").value;
    var lastName = document.getElementById("addLastName").value;
    var jobTitle = document.getElementById("addJobTitle").value;
    var email = document.getElementById("addEmail").value;

    const params = {
        name:name,
        last_name:lastName,
        job_title:jobTitle,
        email:email
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(params));
    alert(" Nouvel employé ajouté! ")
    document.getElementById('listForm').reset();
    location.reload(2);
}

/* Affichage de la Liste de tous les employés*/
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        listingEmployees(JSON.parse(this.responseText));
    };
};
xhttp.open("GET", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/", true);
xhttp.send();

function listingEmployees(employees) {
    for (var i = 0; i < employees.length; i++) {
        list.innerHTML +=
            '<div>' + employees[i].name + '</div>' +
            '<div>' + employees[i].last_name + '</div>' +
            '<div><button type="button" id="viewMoreInfo' + employees[i].id + '" onclick=btnInfo(' + employees[i].id + ') class="btn btn-primary" data-toggle="modal" data-target="#modalInfo">View More Info</button></div>';
    };
};

/* Affichage de la boite modal contenant les informations sur l'employé, avec les possibilités de modifications */

function btnInfo(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            dataEmployees(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
    xhttp.send();
};


/* Affichage des informations définies sur l'employé & édition des boutons sauvegarde/supprimer/fermer */

function dataEmployees(employees) {
    document.getElementById("modalName").value = employees.name;
    document.getElementById("modalLastName").value = employees.last_name;
    document.getElementById("modalJobTitle").value = employees.job_title;
    document.getElementById("modalEmail").value = employees.email;

    var modalFooter = document.getElementById("modalFooter");
    modalFooter.innerHTML = 
    '<div><button type="button" class="btn btn-success" onclick="btnEdit(' + employees.id + ')">Save</button><div><br>' + 
    '<div><button type="button" id="btnDelete" class="btn btn-danger" onclick = btnDelete(' + employees.id + ',this) >Delete</button></div><br>' + 
    '<div><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>';
};
/* Modification des informations de l'employé ou suppression */

function btnEdit(id) {

    var name = document.getElementById("modalName").value;
    var lastName = document.getElementById("modalLastName").value;
    var jobTitle = document.getElementById("modalJobTitle").value;
    var email = document.getElementById("modalEmail").value;
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("PUT", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("name=" + name + "&last_name=" + lastName + "&job_title=" + jobTitle + "&email=" + email);
    alert(" Information modifiées ! ")
    document.getElementById('modalForm').reset();
    location.reload(1);
};

function btnDelete(id, event) {

    if (confirm("Do you want to remove the employee from the list?")) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                listingEmployees(JSON.parse(this.responseText));
                event.parentElement.parentElement.remove();
                alert("Employé supprimer de la liste");
                document.getElementById('listForm').reset();
                location.reload(2);
            }
        };
        xhttp.open("DELETE", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
        xhttp.send();
    };
};