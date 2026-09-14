function saveItem(item){

    let saved =
    JSON.parse(localStorage.getItem("savedItems")) || [];

    item.type = "Event";

    const exists = saved.some(savedItem =>
        savedItem.link === item.link
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

    alert("Event Saved Successfully");

}

fetch("../assets/data/events.json")
.then(response => {

    if(!response.ok){
        throw new Error("Unable to load events.json");
    }

    return response.json();

})
.then(events => {

    const container =
    document.getElementById("eventsContainer");

    container.innerHTML = "";

    events.forEach(event => {

        container.innerHTML += `

        <div class="event-card">

            <div class="organizer">
                ${event.organizer}
            </div>

            <h2>${event.title}</h2>

            <p>${event.location}</p>

            <div class="details">
                <span>${event.date}</span>
            </div>

            <div class="actions">

                <button
                onclick='saveItem(${JSON.stringify(event)})'>
                Save
                </button>

                <a href="${event.link}" target="_blank">
                    <button>
                        Register
                    </button>
                </a>

            </div>

        </div>

        `;

    });

})
.catch(error => {

    console.error(error);

    document.getElementById("eventsContainer").innerHTML = `
        <h2 style="color:red;">
            Failed to load events.
        </h2>
    `;

});