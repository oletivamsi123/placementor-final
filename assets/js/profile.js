const user =
JSON.parse(
localStorage.getItem(
"loggedInUser"
)
);

const profile =
JSON.parse(
localStorage.getItem(
"profile"
)
) || {};

if(user){

document.getElementById(
"studentName"
).innerText =
user.firstName + " " +
user.lastName;

document.getElementById(
"studentEmail"
).innerText =
user.email;

}

document.getElementById(
"college"
).innerText =
profile.college || "Not Added";

document.getElementById(
"branch"
).innerText =
profile.branch || "Not Added";

document.getElementById(
"cgpa"
).innerText =
profile.cgpa || "Not Added";

document.getElementById(
"skills"
).innerText =
profile.skills || "Not Added";
  


function saveProfile(){

const profileData = {

college:
document.getElementById(
"collegeInput"
).value,

branch:
document.getElementById(
"branchInput"
).value,

cgpa:
document.getElementById(
"cgpaInput"
).value,

skills:
document.getElementById(
"skillsInput"
).value

};

localStorage.setItem(
"profile",
JSON.stringify(profileData)
);

location.reload();

}

window.saveProfile =
saveProfile;
let complete = 0;

if(profile.college) complete += 25;
if(profile.branch) complete += 25;
if(profile.cgpa) complete += 25;
if(profile.skills) complete += 25;

document.getElementById(
"completion"
).innerText =
complete + "%";