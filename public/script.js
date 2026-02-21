import { aiTools } from "./data.js";

function searchAI() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    const filtered = aiTools.filter(tool =>
        tool.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = "<p>No AI Found</p>";
        return;
    }

    filtered.forEach(tool => {
        resultsDiv.innerHTML += `
            <div class="card">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <button onclick="window.open('${tool.link}', '_blank')">
                    Open AI
                </button>
            </div>
        `;
    });
}