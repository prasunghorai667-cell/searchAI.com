import { aiTools } from "./data.js";

const stopWords = ["the", "best", "for", "is", "which", "a", "an", "and", "or", "ai", "can", "i", "you", "what", "how", "to", "with", "my", "make", "create", "use"];

const allKeywords = [...new Set(
    aiTools.flatMap(tool => [
        ...tool.tags,
        tool.name.split(" ").filter(w => w.length > 2)
    ].flat())
)].filter(k => k.length > 2);

const newsData = [
    { id: 1, type: "breaking", category: "OpenAI", headline: "OpenAI Unveils GPT-5 with Human-Level Reasoning", shortDesc: "Revolutionary AI model achieves AGI milestone...", fullContent: "OpenAI has officially announced...", author: "Sarah Chen", publishDate: "March 30, 2026", timeAgo: "2 hours ago", readTime: "5 min read", tags: ["AI", "OpenAI", "GPT-5"], externalLink: "https://openai.com/blog/gpt-5", sourceName: "OpenAI Blog" },
    { id: 2, type: "trending", category: "Google", headline: "Google Gemini Dominates Multimodal AI Benchmark", shortDesc: "Gemini outperforms all competitors...", author: "Michael Torres", publishDate: "March 30, 2026", timeAgo: "4 hours ago", readTime: "3 min read", tags: ["Google", "Gemini"], externalLink: "https://blog.google/technology/ai/gemini-update/", sourceName: "Google Blog" },
    { id: 3, type: "must-read", category: "Anthropic", headline: "Claude 3.5 Sets New Standard for AI Safety", shortDesc: "Latest Claude achieves 98% safety score...", author: "Emma Rodriguez", publishDate: "March 30, 2026", timeAgo: "6 hours ago", readTime: "4 min read", tags: ["Anthropic", "Claude"], externalLink: "https://www.anthropic.com/news/claude-3-5-sonnet", sourceName: "Anthropic News" },
    { id: 4, type: "analysis", category: "Healthcare", headline: "How AI is Transforming Healthcare in 2026", shortDesc: "AI revolutionizes patient care...", author: "Dr. James Liu", publishDate: "March 30, 2026", timeAgo: "8 hours ago", readTime: "7 min read", tags: ["Healthcare", "AI"], externalLink: "https://www.healthcareitnews.com/ai-healthcare", sourceName: "Healthcare IT News" },
    { id: 5, type: "guide", category: "Development", headline: "Top 10 AI Tools Every Developer Should Use", shortDesc: "Complete guide to AI tools...", author: "Alex Thompson", publishDate: "March 30, 2026", timeAgo: "10 hours ago", readTime: "6 min read", tags: ["Development", "Tools"], externalLink: "https://dev.to/best-ai-tools-for-developers", sourceName: "Dev.to" },
    { id: 6, type: "new", category: "Video AI", headline: "Sora Video AI Now Available for Everyone", shortDesc: "OpenAI launches public access to Sora...", author: "Maria Santos", publishDate: "March 30, 2026", timeAgo: "12 hours ago", readTime: "3 min read", tags: ["Sora", "Video AI"], externalLink: "https://openai.com/sora", sourceName: "OpenAI Sora" },
    { id: 7, type: "breaking", category: "Robotics", headline: "Boston Dynamics Unveils Humanoid AI Robot", shortDesc: "Next-gen robot with GPT-5 brain...", author: "David Park", publishDate: "March 29, 2026", timeAgo: "1 day ago", readTime: "5 min read", tags: ["Robotics", "Boston Dynamics"], externalLink: "https://www.bostondynamics.com/atlas", sourceName: "Boston Dynamics" },
    { id: 8, type: "trending", category: "Startups", headline: "AI Startup Funding Reaches $50B in Q1 2026", shortDesc: "Record investment in AI companies...", author: "Jennifer Wu", publishDate: "March 29, 2026", timeAgo: "1 day ago", readTime: "4 min read", tags: ["Startups", "Funding"], externalLink: "https://techcrunch.com/ai-startup-funding-2026", sourceName: "TechCrunch" }
];

const toolDetails = [
    { name: "ChatGPT", company: "OpenAI", founded: "2015", founders: ["Sam Altman", "Elon Musk", "Greg Brockman"], headquarters: "San Francisco, USA", userCount: "100M+", pricing: "Free | $20/mo", pros: ["Versatile for conversations, coding, writing", "Strong multi-language support", "Regular updates & improvements", "Excellent for brainstorming", "API access for developers", "Free tier available"], cons: ["Knowledge cutoff limitations", "Can generate incorrect information", "Rate limits on free version", "Requires internet connection", "Not always up-to-date", "Can be overly verbose"] },
    { name: "Claude", company: "Anthropic", founded: "2021", founders: ["Dario Amodei", "Daniela Amodei"], headquarters: "San Francisco, USA", userCount: "50M+", pricing: "Free | $20/mo", pros: ["Exceptional for long-form content", "Strong reasoning capabilities", "200K token context window", "Excellent safety focus", "Great for document summarization", "Helpful coding assistance"], cons: ["Knowledge cutoff limitations", "Can be overly cautious", "Less known than competitors", "Occasional verbosity", "Limited multimodal features", "Mobile app relatively new"] },
    { name: "Gemini", company: "Google", founded: "2023", founders: ["Google DeepMind Team"], headquarters: "Mountain View, USA", userCount: "80M+", pricing: "Free | $19.99/mo", pros: ["Native multimodal AI", "2M token context window", "Integrated with Google ecosystem", "Real-time internet access", "Strong coding capabilities", "Available in Google products"], cons: ["Can be inconsistent", "Some features still rolling out", "Requires Google account", "Privacy concerns", "Advanced features need paid tier", "Still maturing"] },
    { name: "Midjourney", company: "Midjourney, Inc.", founded: "2022", founders: ["David Holz"], headquarters: "San Francisco, USA", userCount: "25M+", pricing: "$10-30/mo", pros: ["Stunning artistic images", "Excellent for conceptual art", "Active community", "Regular improvements", "Great for abstract styles", "Strong style consistency"], cons: ["Requires Discord to use", "No free tier available", "Can be slow at peak times", "Limited control over outputs", "Copyright concerns", "Steep learning curve"] },
    { name: "Runway", company: "Runway AI, Inc.", founded: "2018", founders: ["Cristóbal Valenzuela", "Anastasis Germanidis"], headquarters: "New York, USA", userCount: "15M+", pricing: "$12-35/mo", pros: ["Professional video editing", "Text-to-video generation", "Green screen features", "Collaboration tools", "Regular new features", "Used in Hollywood"], cons: ["Credit-based expensive", "Video generation time varies", "Learning curve required", "Needs powerful GPU", "Export quality varies", "Occasional failures"] },
    { name: "Sora", company: "OpenAI", founded: "2024", founders: ["OpenAI Team"], headquarters: "San Francisco, USA", userCount: "10M+", pricing: "$20-200/mo", pros: ["High-quality video generation", "Up to 60-second videos", "Photorealistic output", "Motion consistency", "Multiple aspect ratios", "Edit videos with text"], cons: ["Limited access currently", "Expensive for heavy use", "Only up to 60 seconds", "Deepfake concerns", "Requires creative direction", "Still in development"] },
    { name: "Cursor", company: "Cursor", founded: "2022", founders: ["Aman Sanger", "Michael Truell"], headquarters: "San Francisco, USA", userCount: "8M+", pricing: "Free | $20/mo", pros: ["AI-first code editor", "Excellent code completion", "Natural language to code", "Works with existing projects", "Great for pair programming", "Privacy mode available"], cons: ["Limited language support", "Can suggest outdated solutions", "Needs context for best results", "Sometimes generates bugs", "Less powerful than IDEs", "Free tier limited"] },
    { name: "GitHub Copilot", company: "GitHub (Microsoft)", founded: "2021", founders: ["GitHub & OpenAI"], headquarters: "San Francisco, USA", userCount: "20M+", pricing: "$10/mo", pros: ["Deep IDE integration", "Context-aware suggestions", "Many languages supported", "Learns your code style", "Enterprise security", "Documentation generation"], cons: ["Subscription required", "Can suggest insecure code", "Not always accurate", "Privacy concerns", "Needs internet for best results", "Complex architecture issues"] },
    { name: "Perplexity", company: "Perplexity AI", founded: "2022", founders: ["Aravind Srinivas", "Denis Yarats"], headquarters: "San Francisco, USA", userCount: "30M+", pricing: "Free | $20/mo", pros: ["Real-time web search", "Cites sources in responses", "Great for research", "Clean modern interface", "Multiple AI models", "Excellent for fact-checking"], cons: ["Can provide outdated info", "Source quality varies", "Less creative", "Rate limits on free tier", "Not ideal long-form", "Occasional hallucinations"] },
    { name: "Suno", company: "Suno AI", founded: "2022", founders: ["Mikey Shulman", "Kellan Crosby"], headquarters: "Cambridge, USA", userCount: "12M+", pricing: "$10/mo", pros: ["Complete songs with vocals", "Multiple genres & styles", "Royalty-free music", "Simple text-to-music", "Custom lyrics support", "High-quality audio"], cons: ["No free tier", "Credit system limiting", "Voice cloning limits", "Copyright unclear", "Occasional audio artifacts", "Less control"] },
    { name: "DALL-E", company: "OpenAI", founded: "2021", founders: ["OpenAI Team"], headquarters: "San Francisco, USA", userCount: "18M+", pricing: "$15-120/mo", pros: ["Excellent text-to-image", "Variations & inpainting", "Safe content filtering", "Regular improvements", "API access available", "Good for commercial use"], cons: ["Credit-based pricing", "Limited free usage", "Complex prompt struggles", "Resolution limits", "Less creative than others", "Copyright concerns"] },
    { name: "ElevenLabs", company: "ElevenLabs", founded: "2022", founders: ["Mati Staniszewski", "Piotr Dąbkowski"], headquarters: "New York, USA", userCount: "6M+", pricing: "Free | $5-22/mo", pros: ["Natural voice synthesis", "Voice cloning capability", "Multi-language support", "Emotion control", "API for developers", "Great for audiobooks"], cons: ["Voice cloning ethics", "Premium voices paid", "Complex text struggles", "Limited emotions", "Quality varies by language", "Best voices not free"] }
];

let newsHistory = [];
let historyIndex = -1;
let isSearchActive = false;
let activeToolIndex = 0;

const trendingTools = [
    { name: "ChatGPT", description: "Advanced AI chatbot", link: "https://chat.openai.com", icon: "🤖", userCount: "100M+" },
    { name: "Claude", description: "AI assistant for reasoning", link: "https://claude.ai", icon: "🧠", userCount: "50M+" },
    { name: "Gemini", description: "Google's multimodal AI", link: "https://gemini.google.com", icon: "✨", userCount: "80M+" },
    { name: "Midjourney", description: "AI image generation", link: "https://www.midjourney.com", icon: "🎨", userCount: "25M+" },
    { name: "Runway", description: "AI video editing", link: "https://runwayml.com", icon: "🎬", userCount: "15M+" },
    { name: "Sora", description: "Text-to-video AI", link: "https://openai.com/sora", icon: "🎥", userCount: "10M+" },
    { name: "Cursor", description: "AI code editor", link: "https://cursor.com", icon: "💻", userCount: "8M+" },
    { name: "GitHub Copilot", description: "AI pair programmer", link: "https://github.com/features/copilot", icon: "⚡", userCount: "20M+" },
    { name: "Perplexity", description: "AI search engine", link: "https://perplexity.ai", icon: "🔍", userCount: "30M+" },
    { name: "Suno", description: "AI music generation", link: "https://suno.ai", icon: "🎵", userCount: "12M+" },
    { name: "DALL-E", description: "AI image generation", link: "https://openai.com/dall-e-3", icon: "🖼️", userCount: "18M+" },
    { name: "ElevenLabs", description: "AI voice synthesis", link: "https://elevenlabs.io", icon: "🎙️", userCount: "6M+" }
];

function getToolLogoUrl(link) {
    try {
        const url = new URL(link);
        return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch { return ''; }
}

function renderTrendingTools() {
    const carousel = document.getElementById('trendingCarousel');
    if (!carousel) return;
    carousel.innerHTML = trendingTools.map(tool => `
        <a href="${tool.link}" target="_blank" class="trending-tool-card">
            <div class="trending-tool-logo">
                <img src="${getToolLogoUrl(tool.link)}" alt="${tool.name}" onerror="this.parentElement.innerHTML='<span class="trending-tool-icon">${tool.icon}</span>'">
            </div>
            <div class="trending-tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <span class="trending-user-count">👥 ${tool.userCount}</span>
            </div>
        </a>
    `).join('');
}

function renderToolDetails() {
    const container = document.getElementById('toolDetailsContainer');
    const tabs = document.getElementById('toolTabs');
    if (!container || !tabs) return;
    
    tabs.innerHTML = toolDetails.map((tool, index) => `
        <button class="tool-tab ${index === activeToolIndex ? 'active' : ''}" onclick="switchTool(${index})">
            ${tool.name}
        </button>
    `).join('');
    
    renderToolDetail(toolDetails[activeToolIndex]);
}

function renderToolDetail(tool) {
    const container = document.getElementById('toolDetailsContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="tool-detail-card">
            <div class="tool-detail-header">
                <img src="${getToolLogoUrl(trendingTools.find(t => t.name === tool.name)?.link || '')}" alt="${tool.name}" class="tool-detail-logo" onerror="this.style.display='none'">
                <div class="tool-detail-title">
                    <h3>${tool.name}</h3>
                    <p class="tool-detail-company">${tool.company}</p>
                </div>
            </div>
            
            <div class="tool-detail-meta">
                <div class="meta-item"><span class="meta-icon">🏢</span><div><span class="meta-label">Headquarters</span><span class="meta-value">${tool.headquarters}</span></div></div>
                <div class="meta-item"><span class="meta-icon">📅</span><div><span class="meta-label">Founded</span><span class="meta-value">${tool.founded}</span></div></div>
                <div class="meta-item"><span class="meta-icon">👥</span><div><span class="meta-label">Users</span><span class="meta-value">${tool.userCount}</span></div></div>
                <div class="meta-item"><span class="meta-icon">💰</span><div><span class="meta-label">Pricing</span><span class="meta-value">${tool.pricing}</span></div></div>
            </div>
            
            <div class="tool-detail-section">
                <h4>👨‍💼 Founders</h4>
                <p>${tool.founders.join(", ")}</p>
            </div>
            
            <div class="tool-detail-section">
                <h4>✅ Advantages</h4>
                <ul class="pros-list">${tool.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
            </div>
            
            <div class="tool-detail-section">
                <h4>⚠️ Disadvantages</h4>
                <ul class="cons-list">${tool.cons.map(con => `<li>${con}</li>`).join('')}</ul>
            </div>
        </div>
    `;
}

function switchTool(index) {
    activeToolIndex = index;
    renderToolDetails();
}

window.switchTool = switchTool;

function getTypeEmoji(type) {
    const emojis = { 'breaking': '🔥', 'trending': '📈', 'must-read': '⚡', 'analysis': '🎯', 'guide': '💡', 'new': '🚀' };
    return emojis[type] || '📰';
}

function renderNewsCards() {
    const carousel = document.getElementById('newsCarousel');
    if (!carousel) return;
    carousel.innerHTML = newsData.map(news => `
        <div class="news-card ${news.type}" onclick="openNewsModal(${news.id})">
            <div class="news-badge-top">${getTypeEmoji(news.type)} ${news.type.replace('-', ' ').toUpperCase()}</div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3>${news.headline}</h3>
                <p>${news.shortDesc}</p>
                <div class="news-meta"><span class="news-time">${news.timeAgo}</span><span class="news-read">${news.readTime}</span></div>
            </div>
        </div>
    `).join('');
}

function showSuggestions(query) {
    const suggestionsDiv = document.getElementById("suggestions");
    if (query.length < 1) { suggestionsDiv.innerHTML = ""; suggestionsDiv.style.display = "none"; return; }

    const queryLower = query.toLowerCase();
    const toolMatches = aiTools.filter(tool => tool.name.toLowerCase().includes(queryLower) || tool.description.toLowerCase().includes(queryLower)).slice(0, 5);
    const keywordMatches = allKeywords.filter(k => k.toLowerCase().includes(queryLower)).slice(0, 8);
    const popularSearches = ["best AI for video", "free AI image generator", "AI coding assistant"].filter(term => term.toLowerCase().includes(queryLower));

    if (toolMatches.length === 0 && keywordMatches.length === 0 && popularSearches.length === 0) { suggestionsDiv.style.display = "none"; return; }

    let html = "";
    if (popularSearches.length > 0) {
        html += '<div class="suggestion-section">🔥 Popular Searches</div>';
        popularSearches.forEach(term => { html += `<div class="suggestion-item" onclick="selectSuggestion('${term}')"><span class="suggestion-icon">🔥</span> ${term}</div>`; });
    }
    if (toolMatches.length > 0) {
        html += '<div class="suggestion-section">🤖 AI Tools</div>';
        toolMatches.forEach(tool => { html += `<div class="suggestion-item" onclick="selectSuggestion('${tool.name}')"><img src="${getToolLogoUrl(tool.link)}" alt="" class="suggestion-logo"><span>${tool.name}</span><span class="suggestion-category">${tool.tags[0]}</span></div>`; });
    }
    if (keywordMatches.length > 0) {
        html += '<div class="suggestion-section">🔍 Keywords</div>';
        keywordMatches.forEach(match => { html += `<div class="suggestion-item" onclick="selectSuggestion('${match}')"><span class="suggestion-icon">🔍</span> ${match}</div>`; });
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

function extractKeywords(query) {
    return query.toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(word => word.length > 2 && !stopWords.includes(word));
}

function calculateScore(tool, keywords) {
    if (keywords.length === 0) return 0;
    let score = 0;
    const toolName = tool.name.toLowerCase();
    const toolDesc = tool.description.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());
    keywords.forEach(keyword => {
        if (toolName.includes(keyword)) score += 10;
        toolTags.forEach(tag => { if (tag.includes(keyword)) score += 5; });
        if (toolDesc.includes(keyword)) score += 3;
    });
    return score;
}

function getMatchReasons(tool, keywords) {
    const reasons = [];
    const toolName = tool.name.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());
    keywords.forEach(keyword => {
        if (toolName.includes(keyword)) reasons.push(tool.name);
        toolTags.forEach(tag => { if (tag.includes(keyword) && !reasons.includes(tag)) reasons.push(tag); });
    });
    return [...new Set(reasons)].slice(0, 3);
}

function getLogoUrl(link) {
    try { return `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=64`; }
    catch { return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>'; }
}

function showOriginalContent() {
    document.getElementById('trendingTools').style.display = 'block';
    document.getElementById('latestNews').style.display = 'block';
    document.getElementById('toolDetailsSection').style.display = 'block';
    document.querySelector('.videos').style.display = 'block';
    document.getElementById('backBtn').style.display = 'none';
    isSearchActive = false;
}

function hideOriginalContent() {
    document.getElementById('trendingTools').style.display = 'none';
    document.getElementById('latestNews').style.display = 'none';
    document.getElementById('toolDetailsSection').style.display = 'none';
    document.querySelector('.videos').style.display = 'none';
    document.getElementById('backBtn').style.display = 'flex';
    isSearchActive = true;
}

function goHome() { clearSearch(); }

function searchAI() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
    if (!query) { resultsDiv.innerHTML = ''; showOriginalContent(); return; }
    hideOriginalContent();
    const keywords = extractKeywords(query);
    if (keywords.length === 0) { resultsDiv.innerHTML = '<p class="no-results">Please enter more specific keywords</p>'; return; }
    const filtered = aiTools.map(tool => ({ tool, score: calculateScore(tool, keywords), matchReasons: getMatchReasons(tool, keywords) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
    if (filtered.length === 0) { resultsDiv.innerHTML = `<p class="no-results">No AI tools found for "${query}"</p><button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button>`; return; }
    resultsDiv.innerHTML = `<div class="results-header"><p class="results-count">Found ${filtered.length} AI tools for "${query}"</p><button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button></div><div class="results-grid">`;
    filtered.forEach(item => {
        const tool = item.tool;
        resultsDiv.innerHTML += `<div class="card result-card"><div class="card-header"><img src="${getLogoUrl(tool.link)}" alt="${tool.name}" class="tool-logo"><div class="tool-title"><h3>${tool.name}</h3><a href="${tool.link}" target="_blank" class="tool-link">Visit Website →</a></div></div><p class="tool-description">${tool.description}</p><div class="best-for"><span class="best-for-label">⭐ Best For:</span><span class="best-for-text">${tool.bestFor}</span></div><div class="match-tags">${item.matchReasons.map(r => `<span class="tag">${r}</span>`).join('')}</div></div>`;
    });
    resultsDiv.innerHTML += '</div>';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearSearch() {
    document.getElementById("searchInput").value = '';
    document.getElementById("results").innerHTML = '';
    activeToolIndex = 0;
    showOriginalContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openNewsModal(newsId, addToHistory = true) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;
    if (addToHistory) { if (historyIndex < newsHistory.length - 1) newsHistory = newsHistory.slice(0, historyIndex + 1); newsHistory.push(newsId); historyIndex = newsHistory.length - 1; }
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('newsModalBody');
    modalBody.innerHTML = `<div class="modal-article"><div class="modal-header-bar"><button class="modal-back-btn" onclick="goBackInHistory()" ${historyIndex <= 0 ? 'disabled' : ''}>← Back</button><span class="modal-history-count">${historyIndex + 1} of ${newsHistory.length}</span></div><div class="modal-header"><span class="modal-category ${news.type}">${getTypeEmoji(news.type)} ${news.category}</span><span class="modal-date">${news.publishDate}</span></div><h1 class="modal-headline">${news.headline}</h1><div class="modal-meta"><span class="modal-author">By ${news.author}</span><span class="modal-readtime">${news.readTime}</span><span class="modal-time">${news.timeAgo}</span></div><div class="modal-tags">${news.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}</div><div class="modal-source-section"><a href="${news.externalLink}" target="_blank" class="modal-source-link">📖 Read Full Article on ${news.sourceName} →</a></div></div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function goBackInHistory() {
    if (historyIndex > 0) { historyIndex--; const news = newsData.find(n => n.id === newsHistory[historyIndex]); if (news) openNewsModal(news.id, false); }
}

function closeNewsModal() { document.getElementById('newsModal').classList.remove('active'); document.body.style.overflow = 'auto'; newsHistory = []; historyIndex = -1; }

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNewsModal(); });

window.selectSuggestion = selectSuggestion;
window.clearSearch = clearSearch;
window.goHome = goHome;
window.searchAI = searchAI;
window.openNewsModal = openNewsModal;
window.closeNewsModal = closeNewsModal;
window.goBackInHistory = goBackInHistory;

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingTools();
    renderNewsCards();
    renderToolDetails();
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => { showSuggestions(e.target.value); if (e.target.value.trim() === '') { document.getElementById("results").innerHTML = ''; showOriginalContent(); } });
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchAI(); });
    searchInput.addEventListener('blur', () => { setTimeout(() => { document.getElementById("suggestions").style.display = "none"; }, 200); });
    searchInput.addEventListener('focus', () => { if (searchInput.value.length > 0) showSuggestions(searchInput.value); });

    initWebSocket();
});

let ws = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const reconnectDelay = 3000;

function initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    function connect() {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("WebSocket connected");
            reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
            if (event.data === "pong") {
                ws.isAlive = true;
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            ws = null;
            if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                console.log(`Reconnecting... attempt ${reconnectAttempts}/${maxReconnectAttempts}`);
                setTimeout(connect, reconnectDelay);
            }
        };

        ws.onerror = () => {
            ws.close();
        };
    }

    connect();

    setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
        }
    }, 600000);
}
