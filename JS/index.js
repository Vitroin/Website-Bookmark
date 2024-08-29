var userNameInput = document.getElementById("nameInput");
var userUrlInput = document.getElementById("urlInput");
var modalController = document.getElementById("modalController");
var website = [];

if (localStorage.getItem('websiteLinks') !== null) {
    website = JSON.parse(localStorage.getItem('websiteLinks'));
    display(website);
}


function addWebsite() {
    var websiteInfo = {
        SiteName: userNameInput.value,
        SiteUrl: userUrlInput.value
    }

    if (userNameInput.value == "" || userUrlInput.value == "") {
        modalController.classList.remove("d-none");
        modalController.classList.add("d-flex");
        empty()
    } else {
        if (validation(userNameInput) == true && validation(userUrlInput) == true) {
            website.push(websiteInfo);
            localStorage.setItem('websiteLinks', JSON.stringify(website));
            display(website);
            empty();
        } else {
            modalController.classList.remove("d-none");
            modalController.classList.add("d-flex");
            empty();
        }
    }
    document.getElementById("nameInput").classList.remove('is-valid');
    document.getElementById("nameInput").classList.remove('is-invalid');
    document.getElementById("urlInput").classList.remove('is-invalid');
    document.getElementById("urlInput").classList.remove('is-valid');
}



function display(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartona += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${website[i].SiteName}</td>
                <td><button type="button" onclick="visitWebsite(${i})" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button type="button" onclick="deleteWebsite(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can  pe-2"></i>Delete</button></td>
            </tr>
        `
    }
    document.getElementById('addWebsite').innerHTML = cartona;
}



function visitWebsite(index) {
    window.open(`${website[index].SiteUrl}`, '_blank', 'noopener=true');
}




var validationElement;
function validation(element) {
    var regex = {
        urlInput: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
        nameInput: /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/


    }

    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return true
    } else {
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        return false
    }

}

function closeModal() {
    modalController.classList.add("d-none");
    modalController.classList.remove("d-flex");
}

function empty() {
    userNameInput.value = null;
    userUrlInput.value = null;
}


function deleteWebsite(index) {
    website.splice(index, 1);
    localStorage.setItem('websiteLinks', JSON.stringify(website));
    display(website);
}



