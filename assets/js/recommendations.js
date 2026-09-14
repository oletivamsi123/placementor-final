const atsScore =
parseInt(
localStorage.getItem("atsScore")
) || 0;

const jobsDiv =
document.getElementById(
"jobsRecommendation"
);

const internshipDiv =
document.getElementById(
"internshipRecommendation"
);

const hackathonDiv =
document.getElementById(
"hackathonRecommendation"
);

if(atsScore >= 80){

jobsDiv.innerHTML = `
<span class="tag">Software Engineer</span>
<span class="tag">Java Developer</span>
<span class="tag">Backend Developer</span>
<span class="tag">Full Stack Developer</span>
`;

internshipDiv.innerHTML = `
<span class="tag">Amazon Intern</span>
<span class="tag">Google Intern</span>
<span class="tag">Microsoft Internship</span>
`;

hackathonDiv.innerHTML = `
<span class="tag">Smart India Hackathon</span>
<span class="tag">Hack India 2026</span>
`;

}
else{

jobsDiv.innerHTML = `
<span class="tag">Frontend Developer</span>
<span class="tag">Web Developer</span>
`;

internshipDiv.innerHTML = `
<span class="tag">Frontend Internship</span>
<span class="tag">Web Internship</span>
`;

hackathonDiv.innerHTML = `
<span class="tag">Campus Hackathon</span>
`;

}