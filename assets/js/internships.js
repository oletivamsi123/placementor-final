function saveItem(item){

    let saved =
    JSON.parse(localStorage.getItem("savedItems")) || [];

    const exists = saved.some(savedItem =>
        savedItem.title === item.title &&
        savedItem.role === item.role &&
        savedItem.company === item.company
    );

    if(exists){
        alert("Already Saved");
        return;
    }

    saved.push(item);

    localStorage.setItem(
        "savedItems",
        JSON.stringify(saved)
    );

    alert(item.type + " Saved Successfully");

}

fetch("../assets/data/internships.json")
.then(response => response.json())
.then(internships => {

const container =
document.getElementById(
"internshipsContainer"
);

internships.forEach(internship => {

container.innerHTML += `
<div class="job-card">

<div class="company">
${internship.company}
</div>

<h2>${internship.title}</h2>

<p>${internship.location}</p>

<div class="skills">
${internship.skills.map(skill =>
`<span>${skill}</span>`
).join("")}
</div>

<div class="job-footer">

<h3>
₹${internship.stipend}
</h3>

<div class="actions">

<button
onclick='saveItem(${JSON.stringify(internship)})'>
Save
</button>

<a href="${internship.link}"
target="_blank"
class="apply-btn">
Apply
</a>

</div>

</div>

</div>
`;
});

})
.catch(error => {
console.error(error);
});