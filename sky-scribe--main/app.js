const createNewUserButton = document.getElementById("creare-user-submit");
const userFirstNameInput = document.getElementById("input-first-name");
const userLastNameInput = document.getElementById("input-last-name");
const usernameInput = document.getElementById("input-username");
const userEmailInput = document.getElementById("input-email");
const usersContainer = document.querySelector(".users-container");
const modalMainContainer = document.querySelector(".modal-container");
const modalDeleteUserWindow = document.querySelector(".delete-user-modal");
const modalEditeUserWindow = document.querySelector(".edit-user-modal");
let usersDB = {};
const endPointUrl = "https://sky-scribe-8adda-default-rtdb.firebaseio.com/";

// Create a new user
createNewUserButton.addEventListener("click", () => {
    let firstName = userFirstNameInput.value;
    let lastName = userLastNameInput.value;
    let username = usernameInput.value;
    let email = userEmailInput.value;

    let newUserObject = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        mail: email,
    };

    if (firstName && lastName && username && email) {
        fetch(`${endPointUrl}/users.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserObject),
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse);
            location.reload();
        })
        .catch((error) => console.error(error));

        // Clear input values
        userFirstNameInput.value = "";
        userLastNameInput.value = "";
        usernameInput.value = "";
        userEmailInput.value = "";
    } else {
        console.warn("** Check Input Values **");
    }
});

// Load users on window load
window.addEventListener("load", () => {
    usersContainer.insertAdjacentHTML("beforeend", `<p>Loading... </p>`);
    fetch(`${endPointUrl}/users.json`, { method: "GET" })
        .then((response) => response.ok ? response.json() : null)
        .then((JSONResponse) => {
            if (JSONResponse) {
                usersDB = JSONResponse;
                generateUsersList(Object.entries(usersDB));
            } else {
                usersDB = {};
                console.log("No users found.");
            }
        })
        .catch((error) => console.error(error));
});

// Generate the list of users
function generateUsersList(usersList) {
    usersContainer.innerHTML = "";
    usersList.forEach((user) => {
        let userDetail = user[1];
        let userTemplateString = `                   
            <div class="user">
                <div class="information">
                    <div class="names">
                        <div class="first">${userDetail.first_name}</div>
                        <div class="last">${userDetail.last_name}</div>
                    </div>
                    <div class="account">
                        <div class="username">@${userDetail.username}</div>
                        <div class="email">${userDetail.mail}</div>
                    </div>
                </div>
                <div class="action">
                    <div class="button-container">
                        <input
                            type="button"
                            value="edit"
                            onclick="openEditUserModal('${user[0]}')"
                        />
                        <input
                            type="button"
                            value="delete"
                            onclick="openDeleteUserModal('${user[0]}')"
                        />
                    </div>
                </div>
            </div>
        `;
        usersContainer.insertAdjacentHTML("beforeend", userTemplateString);
    });
}

// Open edit user modal
function openEditUserModal(ID) {
    console.log("Open edit modal", ID);

    handleModal(true, false, true);

    const closeButton = document.querySelector("#close");
    const saveButton = document.querySelector("#save");

    let selectedUser = Object.entries(usersDB).find((u) => u[0] === ID);

    let fname = document.querySelector(".edit-user-modal #input-first-name");
    let lname = document.querySelector(".edit-user-modal #input-last-name");
    let uname = document.querySelector(".edit-user-modal #input-username");
    let email = document.querySelector(".edit-user-modal #input-email");

    fname.value = selectedUser[1].first_name;
    lname.value = selectedUser[1].last_name;
    uname.value = selectedUser[1].username;
    email.value = selectedUser[1].mail;

    closeButton.addEventListener("click", () => handleModal(false, false, false));
    saveButton.addEventListener("click", () => {
        handleModal(false, false, false);

        if (fname.value && lname.value && uname.value && email.value) {
            let userNewData = {
                first_name: fname.value,
                last_name: lname.value,
                username: uname.value,
                mail: email.value,
            };
            fetch(`${endPointUrl}/users/${ID}.json`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userNewData),
            })
            .then((response) => response.json())
            .then(() => location.reload())
            .catch((error) => console.error(error));
        } else {
            console.warn("Check User Edit INPUT");
        }
    });
}

// Open delete user modal
function openDeleteUserModal(ID) {
    console.log("Open delete modal", ID);
    handleModal(true, true, false);

    const noButton = document.querySelector("#no");
    const yesButton = document.querySelector("#yes");
    const usernameContainer = document.querySelector(".delete-user-modal .username");

    let selectedUser = Object.entries(usersDB).find((u) => u[0] === ID);
    usernameContainer.textContent = `@${selectedUser[1].username}`;

    noButton.addEventListener("click", () => handleModal(false, false, false));
    yesButton.addEventListener("click", () => {
        handleModal(false, false, false);
        fetch(`${endPointUrl}/users/${ID}.json`, { method: "DELETE" })
            .then((response) => response.json())
            .then(() => location.reload())
            .catch((error) => console.error(error));
    });
}

// Handle modal visibility
function handleModal(modalContainer, deleteModal, editModal) {
    modalMainContainer.style.display = modalContainer ? "flex" : "none";
    modalDeleteUserWindow.style.display = deleteModal ? "flex" : "none";
    modalEditeUserWindow.style.display = editModal ? "flex" : "none";
}
