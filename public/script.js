import { aiTools } from "./data.js";

const stopWords = ["the", "best", "for", "is", "which", "a", "an", "and", "or", "ai", "can", "i", "you", "what", "how", "to", "with", "my", "make", "create", "use"];

const allKeywords = [...new Set(
    aiTools.flatMap(tool => [
        ...tool.tags,
        tool.name.split(" ").filter(w => w.length > 2)
    ].flat())
)].filter(k => k.length > 2);

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

function getLogoUrl(link) {
    try {
        const url = new URL(link);
        const domain = url.hostname.replace('www.', '');
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
        return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>';
    }
}

function showSuggestions(query) {
    const suggestionsDiv = document.getElementById("suggestions");
    const input = document.getElementById("searchInput");
    
    if (query.length < 1) {
        suggestionsDiv.innerHTML = "";
        suggestionsDiv.style.display = "none";
        return;
    }

    const queryLower = query.toLowerCase();
    const matches = allKeywords.filter(k => k.toLowerCase().includes(queryLower));
    
    const toolMatches = aiTools.filter(tool => 
        tool.name.toLowerCase().includes(queryLower)
    ).slice(0, 3);

    if (matches.length === 0 && toolMatches.length === 0) {
        suggestionsDiv.style.display = "none";
        return;
    }

    let html = "";

    if (toolMatches.length > 0) {
        html += '<div class="suggestion-section">Tools</div>';
        toolMatches.forEach(tool => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${tool.name.replace(/'/g, "\\'")}')">
                <img src="${getLogoUrl(tool.link)}" alt="" class="suggestion-logo" onerror="this.style.display='none'">
                <span>${tool.name}</span>
            </div>`;
        });
    }

    const uniqueMatches = [...new Set(matches)].slice(0, 8);
    if (uniqueMatches.length > 0) {
        html += '<div class="suggestion-section">Keywords</div>';
        uniqueMatches.forEach(match => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${match}')">
                <span class="suggestion-icon">🔍</span> ${match}
            </div>`;
        });
    }

    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = "block";
}

function selectSuggestion(value) {
    document.getElementById("searchInput").value = value;
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
    searchAI();
}

window.selectSuggestion = selectSuggestion;

function searchAI() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("results");

    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";

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

    resultsDiv.innerHTML = `
        <div class="results-header">
            <p class="results-count">Found ${filtered.length} AI tool${filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="results-grid">
    `;

    filtered.forEach(item => {
        const tool = item.tool;
        const logoUrl = getLogoUrl(tool.link);
        
        resultsDiv.innerHTML += `
            <div class="card result-card">
                <div class="card-header">
                    <img src="${logoUrl}" alt="${tool.name}" class="tool-logo" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>'">
                    <div class="tool-title">
                        <h3>${tool.name}</h3>
                        <a href="${tool.link}" target="_blank" class="tool-link">Visit Website →</a>
                    </div>
                </div>
                <p class="tool-description">${tool.description}</p>
                <div class="best-for">
                    <span class="best-for-label">⭐ Best For:</span>
                    <span class="best-for-text">${tool.bestFor}</span>
                </div>
                <div class="match-tags">
                    ${item.matchReasons.map(r => `<span class="tag">${r}</span>`).join('')}
                </div>
            </div>
        `;
    });

    resultsDiv.innerHTML += '</div>';

    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchAI();
        }
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            document.getElementById("suggestions").style.display = "none";
        }, 200);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            showSuggestions(searchInput.value);
        }
    });
});

window.searchAI = searchAI;
