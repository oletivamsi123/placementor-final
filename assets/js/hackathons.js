fetch("../assets/data/hackathons.json")

.then(response => response.json())

.then(data => {

const container =
document.getElementById(
"hackathonsContainer"
);

data.forEach(hackathon => {

container.innerHTML += `

<div class="hackathon-card">

<div class="organizer">
${hackathon.organizer}
</div>

<h2>
${hackathon.title}
</h2>

<p>
${hackathon.description}
</p>

<div class="details">

<span>
Prize: ${hackathon.prize}
</span>

<span>
${hackathon.mode}
</span>

<span>
Deadline: ${hackathon.deadline}
</span>

</div>

<div class="actions">

<button
onclick='saveItem(${JSON.stringify(hackathon)})'>
Save
</button>

<a href="${hackathon.link}" target="_blank">
    <button>
        Register
    </button>
</a>

</div>

</div>

`;

});

});
function saveItem(item){

    let saved =
    JSON.parse(localStorage.getItem("savedItems")) || [];

    // add type
    item.type = "Event";

    // Prevent duplicates
    const exists = saved.some(savedItem =>
        (savedItem.title || savedItem.role) === (item.title || item.role)
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

    alert("Saved Successfully");

}