import { aiTools } from "./data.js";

const stopWords = ["the", "best", "for", "is", "which", "a", "an", "and", "or", "ai", "can", "i", "you", "what", "how", "to", "with", "my", "make", "create", "use"];

function extractKeywords(query) {
    return query.toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(" ")
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

function calculateScore(tool, keywords) {
    if (keywords.length === 0) return 0;
    
    let score = 0;
    const toolName = tool.name.toLowerCase();
    const toolDesc = tool.description.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());

    keywords.forEach(keyword => {
        if (toolName.includes(keyword)) score += 10;
        toolTags.forEach(tag => {
            if (tag.includes(keyword)) score += 5;
        });
        if (toolDesc.includes(keyword)) score += 3;
    });

    return score;
}

function getMatchReasons(tool, keywords) {
    const reasons = [];
    const toolName = tool.name.toLowerCase();
    const toolDesc = tool.description.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());

    keywords.forEach(keyword => {
        if (toolName.includes(keyword)) {
            reasons.push(tool.name);
        }
        toolTags.forEach(tag => {
            if (tag.includes(keyword) && !reasons.includes(tag)) {
                reasons.push(tag);
            }
        });
    });

    return [...new Set(reasons)].slice(0, 3);
}

function searchAI() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    if (!query) {
        resultsDiv.innerHTML = '<p class="no-results">Please enter a search term</p>';
        return;
    }

    const keywords = extractKeywords(query);
    
    if (keywords.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">Please enter more specific keywords</p>';
        return;
    }

    const scored = aiTools.map(tool => ({
        tool,
        score: calculateScore(tool, keywords),
        matchReasons: getMatchReasons(tool, keywords)
    }));

    const filtered = scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (filtered.length === 0) {
        resultsDiv.innerHTML = `<p class="no-results">No AI tools found for "${query}"</p>`;
        return;
    }

    resultsDiv.innerHTML = `<p class="results-count">Found ${filtered.length} AI tool${filtered.length !== 1 ? 's' : ''}</p>`;

    filtered.forEach(item => {
        const tool = item.tool;
        const reasonsHtml = item.matchReasons.length > 0 
            ? `<p class="match-reason">Matched: ${item.matchReasons.join(', ')}</p>` 
            : '';

        resultsDiv.innerHTML += `
            <div class="card result-card">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                ${reasonsHtml}
                <button onclick="window.open('${tool.link}', '_blank')">
                    Open AI
                </button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchAI();
        }
    });
});
