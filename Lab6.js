// Constructor Function for generating Objects
function User(firstName, lastName, age, phone, email) {
    this.firstName = firstName; // String
    this.lastName = lastName; // String
    this.age = age; // Number
    this.phone = phone; // Number
    this.email = email; // String
}

// Array to contain our users objects that will be created through the constructor
const users = [];

function initializeUsers() {
    // Constructor way adding new objects and pushing them into our array users
    users.push(new User('Mathew ', 'Smith ', 23, `${555}-${123}-${4567}`, ' msmith@example.com'));
    users.push(new User('Lisa ', 'Ivory ', 20, `${555}-${234}-${5678}`, ' livory@example.com'));
    users.push(new User('Howard ', 'White ', 31, `${555}-${345}-${6789}`, ' hwhite@example.com'));
    users.push(new User('Karen ', 'Smith ', 27, `${555}-${456}-${7890}`, ' ksmith@example.com'));
}

// Call the Functions when the page loads on load to display the users
initializeUsers();
displayUsers();

// Output to the Webpage through this function
function displayUsers() {
    const theDiv = document.getElementById('usersOutput'); // The output Div
    theDiv.innerHTML = ''; // Clear previous elements always important in the dropdown display

    // Loop through array
    for (let i = 0; i < users.length; i++) {
        const tempUser = users[i]; // Instead of typing users[i] every time, we can assign to a variable and use that to refer
        // to the properties in our object instead
        // The above method is easier as there's like kinda less code
        // used `${i + 1}:`  in order to display from 1 index but not usual starting 0
        const tempEL = document.createElement('p');
        tempEL.innerText += `${i + 1}: ${tempUser.firstName.charAt(0)}.${tempUser.lastName}`;
        // I though first we should display all the data of the user ${tempUser.age}${tempUser.phone}${tempUser.email}`;
        // Using .charAt(0) dot notation built in function to display only first character
        // Append to the Div through the .appendChild in built function method for the .createElement of the DOM we just created
        theDiv.appendChild(tempEL);
    } // end for loop
} // End of the function displayUsers

// Tried using an arrow function  to diversify my code and come up with a different solution
const addUser = ev => {
    ev.preventDefault(); // to stop the form from submitting by itself with built in function .preventDefault()

    users.push( // adding new users to the array
        new User( //Through the new special keyword creating new instances for the object by getting the values through DOM   
            document.getElementById('userFirst').value,
            document.getElementById('userLast').value,
            document.getElementById('userAge').value,
            document.getElementById('userPhone').value,
            document.getElementById('userEmail').value
        )
    );

    // Calling our displayUsers function will help us to display all the users
    // So after the new user has been added, It will display it along with the previous 4 users in the object or array of users
    displayUsers();

    // saving to localStorage and converting values into a string
    localStorage.setItem('MyUsers', JSON.stringify(users));
    document.forms[0].reset(); // to clear the form for the next entries
    // First I was clearing it here immediately but as the LAB wants us do it onclick event I made another function externally
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addUser);
}); // This helps us to led the DOM content load first and EventListener for the click of the button addUser

function formReset() {
    document.forms[0].reset(); // to clear the form for the next entries
    // document.querySelector('form').reset(); Also could be done in this way
}

function showUserDetails() {
    const notify = parseInt(prompt('Enter the user index number please!', 1));
    const user = notify - 1;
    //So that the entry goes minus 1 so it starts from 1 but not 0 
    if (notify > users.length) {
        alert('You entered an invalid index, please try again!');
        // First we're evaluating the false condition and then else for the true part kind of
    } else {
        document.getElementById('userFirst').value = users[user].firstName;
        document.getElementById('userLast').value = users[user].lastName;
        document.getElementById('userAge').value = users[user].age;
        document.getElementById('userPhone').value = users[user].phone;
        document.getElementById('userEmail').value = users[user].email;
    }
}

// Targeting the form elements input areas in order to perform some validation on it
const userFirst = document.getElementById('userFirst');
const userLast = document.getElementById('userLast');
const userAge = document.getElementById('userAge');
const userPhone = document.getElementById('userPhone');
const email = document.getElementById('userEmail');

// FUNCTIONS to validate the Form on change event

function validateEmail(emails) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emails);
}

function numberValidation(numbers) {
    const hasNumber = /\d/;
    return hasNumber.test(numbers);
}

function validateForm() {
    if (userFirst.value.length < 6) {
        alert('Name is too too short. The Name must be 6+ characters.');
        userFirst.focus();
    } else if (userLast.value.length < 7) {
        alert('Lastname is too too short. The Lastname must be 7+ characters at least.');
        userLast.focus();
    } else if (userAge.value.length < 2) {
        alert('Age should contain two digits or numbers');
        userAge.focus();
    } else if (userPhone.value.length < 6) {
        alert('Number is too short. Number must be 6+ characters.');
        userPhone.focus();
    } else if (!numberValidation(userPhone.value)) {
        alert('Phone number does not include a number. It must include at least 1 number.');
    } else if (!email.value) {
        alert('Enter email.');
        email.focus();
    } else if (validateEmail !== email.value) {
        // This is easier way to understand as !== strictly not equals although just throwing !before the function name is a bit lesser code to write
        alert('Invalid email entered.');
        email.focus();
    }
}