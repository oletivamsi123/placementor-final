fetch("../assets/data/jobs.json")
.then(response => response.json())
.then(jobs => {

    const container =
    document.getElementById("jobsContainer");

    container.innerHTML = "";

    jobs.forEach(job => {

        container.innerHTML += `

        <div class="job-card">

            <div class="company">
                ${job.company}
            </div>

            <h2>${job.role}</h2>

            <p>${job.location}</p>

            <div class="skills">
                <span>${job.skills}</span>
            </div>

            <div class="job-footer">

                <h3>${job.salary}</h3>

<div class="actions">
    <button onclick='saveItem(${JSON.stringify(job)})'>
        Save
    </button>

    <a href="${job.link}" target="_blank">
        <button>Apply</button>
    </a>
</div>
            </div>

        </div>

        `;
    });

});
function applyJob(id){

fetch("../assets/data/jobs.json")

.then(res => res.json())

.then(jobs => {

const selectedJob =
jobs.find(job => job.id === id);

localStorage.setItem(
"selectedJob",
JSON.stringify(selectedJob)
);

window.location.href =
"job-apply.html";

});

}
function saveItem(item){

    let saved =
    JSON.parse(
    localStorage.getItem("savedItems")
    ) || [];

    const alreadySaved = saved.some(savedItem =>
        savedItem.role === item.role &&
        savedItem.company === item.company
    );

    if(alreadySaved){

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