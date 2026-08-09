import { aiTools } from "./data.js";

const stopWords = ["the", "best", "for", "is", "which", "a", "an", "and", "or", "ai", "can", "i", "you", "what", "how", "to", "with", "my", "make", "create", "use"];

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

function jsEscape(str) {
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function highlightMatch(text, query) {
    const str = String(text);
    if (!query) return escapeHtml(str);
    const idx = str.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(str);
    return escapeHtml(str.slice(0, idx)) +
        '<b>' + escapeHtml(str.slice(idx, idx + query.length)) + '</b>' +
        escapeHtml(str.slice(idx + query.length));
}

const HISTORY_KEY = 'searchAI_history';
const MAX_HISTORY = 8;

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
}

function addToHistory(query) {
    const q = query.trim();
    if (!q) return;
    const history = [q, ...getHistory().filter(h => h.toLowerCase() !== q.toLowerCase())].slice(0, MAX_HISTORY);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

function clearHistory() {
    try { localStorage.removeItem(HISTORY_KEY); } catch {}
    showSuggestions(document.getElementById("searchInput").value);
}

const trendingSearches = [
    "best AI for video",
    "AI image generator",
    "AI coding assistant",
    "AI voice generator",
    "AI presentation maker",
    "free AI writing tools"
];

const categoryChips = [
    { label: "All", match: null },
    { label: "Chat", match: ["chat", "conversation", "assistant", "gpt", "llm", "emotional", "support"] },
    { label: "Video", match: ["video", "text-to-video", "animation", "avatar", "film", "shorts", "reels"] },
    { label: "Image", match: ["image", "art", "illustration", "text-to-image", "photorealistic", "typography", "background"] },
    { label: "Coding", match: ["coding", "programming", "code", "ide", "autocomplete", "github", "deployment"] },
    { label: "Writing", match: ["writing", "content", "copy", "blog", "grammar", "paraphrasing", "proofreading"] },
    { label: "Audio", match: ["audio", "music", "voice", "speech", "tts", "vocals", "soundtrack"] },
    { label: "Research", match: ["research", "academic", "papers", "science", "pdf", "transcription", "literature"] },
    { label: "Design", match: ["design", "ui", "mockup", "logo", "branding", "presentation", "slides", "prototype"] },
    { label: "Marketing", match: ["marketing", "social media", "seo", "sales", "email", "hashtags", "crm"] }
];

const allKeywords = [...new Set(
    aiTools.flatMap(tool => [
        ...tool.tags,
        tool.name.split(" ").filter(w => w.length > 2)
    ].flat())
)].filter(k => k.length > 2);

const allTags = [...new Set(aiTools.flatMap(t => t.tags.map(tag => tag.toLowerCase())))];

const tagToolMap = {};
aiTools.forEach(tool => {
    tool.tags.forEach(tag => {
        const key = tag.toLowerCase();
        if (!tagToolMap[key]) tagToolMap[key] = [];
        tagToolMap[key].push(tool);
    });
});

function levenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : Math.min(dp[i - 1][j - 1] + 1, dp[i][j - 1] + 1, dp[i - 1][j] + 1);
        }
    }
    return dp[m][n];
}

function stem(word) {
    if (word.length < 4) return word;
    let w = word;
    if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.endsWith('ves')) return w.slice(0, -3) + 'f';
    if (w.endsWith('es') && !w.endsWith('ss')) return w.slice(0, -2);
    if (w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
    if (w.endsWith('ing')) return w.slice(0, -3);
    if (w.endsWith('ed')) return w.slice(0, -2);
    if (w.endsWith('er')) return w.slice(0, -2);
    if (w.endsWith('ly')) return w.slice(0, -2);
    return w;
}

function generateNGrams(word, minLen = 3) {
    const ngrams = new Set();
    for (let j = minLen; j <= Math.min(word.length, 8); j++) {
        ngrams.add(word.slice(0, j));
    }
    return [...ngrams];
}

function expandKeywords(keywords) {
    const expanded = new Set();
    keywords.forEach(kw => {
        expanded.add(kw);
        const stemmed = stem(kw);
        if (stemmed !== kw) expanded.add(stemmed);
        generateNGrams(kw, 3).forEach(ng => expanded.add(ng));
    });
    return [...expanded];
}

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

let suggestionItems = [];
let suggestionIndex = -1;
let currentQuery = '';
let currentKeywords = [];
let currentResults = [];
let activeChip = 'All';

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
                <img src="${getToolLogoUrl(tool.link)}" alt="${escapeHtml(tool.name)}" onerror="this.parentElement.innerHTML='<span class=&quot;trending-tool-icon&quot;>${tool.icon}</span>'">
            </div>
            <div class="trending-tool-info">
                <h3>${escapeHtml(tool.name)}</h3>
                <p>${escapeHtml(tool.description)}</p>
                <span class="trending-user-count">👥 ${tool.userCount}</span>
            </div>
        </a>
    `).join('');
}

function renderTrendingSearches() {
    const container = document.getElementById('trendingSearches');
    if (!container) return;
    container.innerHTML = `
        <span class="trending-searches-label">🔥 Trending:</span>
        ${trendingSearches.map(term => `
            <button class="trending-search-chip" onclick="searchQuery('${jsEscape(term)}')">${escapeHtml(term)}</button>
        `).join('')}
    `;
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
    const queryRaw = query.trim();
    const queryLower = queryRaw.toLowerCase();
    suggestionIndex = -1;
    suggestionItems = [];

    if (!queryLower) {
        const history = getHistory();
        if (history.length === 0) { suggestionsDiv.innerHTML = ""; suggestionsDiv.style.display = "none"; return; }
        suggestionItems = history.map(h => ({ value: h, icon: "🕘" }));
        let html = '<div class="suggestion-section">🕘 Recent Searches</div>';
        html += history.map(h => `<div class="suggestion-item" onclick="selectSuggestion('${jsEscape(h)}')"><span class="suggestion-icon">🕘</span><span>${escapeHtml(h)}</span></div>`).join('');
        html += '<div class="suggestion-clear" onclick="clearHistory()">🗑️ Clear history</div>';
        suggestionsDiv.innerHTML = html;
        suggestionsDiv.style.display = "block";
        return;
    }

    const historyMatches = getHistory().filter(h => h.toLowerCase().includes(queryLower)).slice(0, 3);
    const popularMatches = trendingSearches.filter(term => term.toLowerCase().includes(queryLower));
    const toolMatches = aiTools.filter(tool => tool.name.toLowerCase().includes(queryLower) || tool.description.toLowerCase().includes(queryLower)).slice(0, 5);
    const keywordMatches = allKeywords.filter(k => k.toLowerCase().includes(queryLower)).slice(0, 8);

    historyMatches.forEach(h => suggestionItems.push({ value: h, icon: "🕘" }));
    popularMatches.forEach(term => suggestionItems.push({ value: term, icon: "🔥" }));
    toolMatches.forEach(tool => suggestionItems.push({ value: tool.name, icon: "🤖" }));
    keywordMatches.forEach(k => suggestionItems.push({ value: k, icon: "🔍" }));

    if (suggestionItems.length === 0) { suggestionsDiv.style.display = "none"; return; }

    let html = "";
    if (historyMatches.length > 0) {
        html += '<div class="suggestion-section">🕘 Recent</div>';
        html += historyMatches.map(h => `<div class="suggestion-item" onclick="selectSuggestion('${jsEscape(h)}')"><span class="suggestion-icon">🕘</span><span>${highlightMatch(h, queryLower)}</span></div>`).join('');
    }
    if (popularMatches.length > 0) {
        html += '<div class="suggestion-section">🔥 Popular Searches</div>';
        html += popularMatches.map(term => `<div class="suggestion-item" onclick="selectSuggestion('${jsEscape(term)}')"><span class="suggestion-icon">🔥</span><span>${highlightMatch(term, queryLower)}</span></div>`).join('');
    }
    if (toolMatches.length > 0) {
        html += '<div class="suggestion-section">🤖 AI Tools</div>';
        html += toolMatches.map(tool => `<div class="suggestion-item" onclick="selectSuggestion('${jsEscape(tool.name)}')"><img src="${getToolLogoUrl(tool.link)}" alt="" class="suggestion-logo" onerror="this.style.display='none'"><span>${highlightMatch(tool.name, queryLower)}</span><span class="suggestion-category">${escapeHtml(tool.tags[0])}</span></div>`).join('');
    }
    if (keywordMatches.length > 0) {
        html += '<div class="suggestion-section">🔍 Keywords</div>';
        html += keywordMatches.map(k => `<div class="suggestion-item" onclick="selectSuggestion('${jsEscape(k)}')"><span class="suggestion-icon">🔍</span><span>${highlightMatch(k, queryLower)}</span></div>`).join('');
    }
    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = "block";
}

function moveSuggestion(dir) {
    const items = document.querySelectorAll('#suggestions .suggestion-item');
    if (items.length === 0) return;
    if (suggestionIndex >= 0 && suggestionIndex < items.length) items[suggestionIndex].classList.remove('active');
    suggestionIndex = (suggestionIndex + dir + items.length) % items.length;
    items[suggestionIndex].classList.add('active');
    items[suggestionIndex].scrollIntoView({ block: 'nearest' });
}

function selectSuggestion(value) {
    document.getElementById("searchInput").value = value;
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
    suggestionIndex = -1;
    suggestionItems = [];
    addToHistory(value);
    searchAI();
}

function extractKeywords(query) {
    return query.toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(word => word.length > 1 && !stopWords.includes(word));
}

function calculateScore(tool, keywords, expandedKeywords) {
    if (keywords.length === 0) return 0;
    let score = 0;
    const toolName = tool.name.toLowerCase();
    const toolDesc = tool.description.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());
    const nameWords = toolName.split(' ');
    let exactMatched = false;

    expandedKeywords.forEach(keyword => {
        if (nameWords.includes(keyword)) { score += 20; exactMatched = true; }
        else if (toolName.includes(keyword)) score += 10;
        if (toolTags.includes(keyword)) score += 8;
        else toolTags.forEach(tag => { if (tag.includes(keyword)) score += 4; });
        if (toolDesc.includes(keyword)) score += 2;
    });

    if (!exactMatched) {
        keywords.forEach(keyword => {
            const threshold = keyword.length <= 4 ? 1 : keyword.length <= 7 ? 2 : 3;
            const nameDist = levenshteinDistance(keyword, toolName);
            if (nameDist > 0 && nameDist <= threshold) score += Math.max(0, 15 - nameDist * 3);
            toolTags.forEach(tag => {
                const tagDist = levenshteinDistance(keyword, tag);
                if (tagDist > 0 && tagDist <= threshold) score += Math.max(0, 5 - tagDist);
            });
        });
    }
    return score;
}

function getMatchReasons(tool, keywords, expandedKeywords) {
    const reasons = [];
    const toolName = tool.name.toLowerCase();
    const toolTags = tool.tags.map(tag => tag.toLowerCase());
    const allQueryTerms = [...new Set([...keywords, ...expandedKeywords])];
    allQueryTerms.forEach(term => {
        if (toolName.includes(term)) reasons.push(tool.name);
        toolTags.forEach(tag => { if (tag.includes(term) && !reasons.includes(tag)) reasons.push(tag); });
    });
    return [...new Set(reasons)].slice(0, 4);
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
    const trendingRow = document.getElementById('trendingSearches');
    if (trendingRow) trendingRow.style.display = 'flex';
    isSearchActive = false;
}

function hideOriginalContent() {
    document.getElementById('trendingTools').style.display = 'none';
    document.getElementById('latestNews').style.display = 'none';
    document.getElementById('toolDetailsSection').style.display = 'none';
    document.querySelector('.videos').style.display = 'none';
    document.getElementById('backBtn').style.display = 'flex';
    const trendingRow = document.getElementById('trendingSearches');
    if (trendingRow) trendingRow.style.display = 'none';
    isSearchActive = true;
}

function goHome() { clearSearch(); }

function findDidYouMean(query, keywords) {
    const queryLower = query.toLowerCase().trim();
    const suggestions = [];
    aiTools.forEach(tool => {
        const name = tool.name.toLowerCase();
        const dist = levenshteinDistance(queryLower, name);
        if (dist > 0 && dist <= Math.min(3, Math.floor(name.length / 3) + 1)) {
            suggestions.push({ name: tool.name, dist });
        }
        keywords.forEach(kw => {
            if (kw.length >= 3) {
                const kwDist = levenshteinDistance(kw, name);
                if (kwDist > 0 && kwDist <= Math.min(2, Math.floor(name.length / 3))) {
                    suggestions.push({ name: tool.name, dist: kwDist });
                }
            }
        });
    });
    return [...new Map(suggestions.map(s => [s.name, s])).values()].sort((a, b) => a.dist - b.dist).slice(0, 3);
}

function findRelatedTools(keywords, maxResults = 8) {
    const matchedTags = new Set();
    const queryTerms = [...keywords, ...keywords.flatMap(k => generateNGrams(k, 3))];

    allTags.forEach(tag => {
        queryTerms.forEach(term => {
            if (tag.includes(term) || levenshteinDistance(term, tag) <= 2) matchedTags.add(tag);
        });
    });

    if (matchedTags.size === 0) return [];

    const scored = {};
    matchedTags.forEach(tag => {
        (tagToolMap[tag] || []).forEach(tool => {
            const key = tool.name;
            if (!scored[key]) scored[key] = { tool, overlap: 0 };
            scored[key].overlap += 1;
        });
    });

    return Object.values(scored).sort((a, b) => b.overlap - a.overlap).slice(0, maxResults);
}
function searchAI(opts = {}) {
    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    if (!opts.keepSuggestions) {
        document.getElementById("suggestions").innerHTML = "";
        document.getElementById("suggestions").style.display = "none";
    }
    if (!query) {
        resultsDiv.innerHTML = '';
        renderFilterChips([]);
        currentQuery = '';
        currentKeywords = [];
        currentResults = [];
        activeChip = 'All';
        showOriginalContent();
        return;
    }
    hideOriginalContent();
    const keywords = extractKeywords(query);
    if (keywords.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">Please enter more specific keywords</p>';
        renderFilterChips([]);
        currentQuery = query;
        currentKeywords = [];
        currentResults = [];
        activeChip = 'All';
        return;
    }
    const expandedKeywords = expandKeywords(keywords);

    currentQuery = query;
    currentKeywords = keywords;
    currentResults = aiTools.map(tool => ({
        tool,
        score: calculateScore(tool, keywords, expandedKeywords),
        matchReasons: getMatchReasons(tool, keywords, expandedKeywords)
    })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

    if (activeChip !== 'All') {
        const chip = categoryChips.find(c => c.label === activeChip);
        const chipHasTools = chip && currentResults.some(item => item.tool.tags.some(t => chip.match.includes(t.toLowerCase())));
        if (!chipHasTools) activeChip = 'All';
    }

    renderFilterChips(currentResults);
    renderResults(applyChipFilter());

    if (opts.scroll !== false) resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function applyChipFilter() {
    if (activeChip === 'All') return currentResults;
    const chip = categoryChips.find(c => c.label === activeChip);
    if (!chip) return currentResults;
    return currentResults.filter(item => item.tool.tags.some(t => chip.match.includes(t.toLowerCase())));
}

function renderFilterChips(results) {
    const chipsDiv = document.getElementById('filterChips');
    if (!chipsDiv) return;
    if (!results || results.length === 0) {
        chipsDiv.innerHTML = '';
        chipsDiv.style.display = 'none';
        return;
    }
    const available = new Set();
    results.forEach(item => {
        item.tool.tags.forEach(tag => {
            const t = tag.toLowerCase();
            categoryChips.forEach(c => { if (c.match && c.match.includes(t)) available.add(c.label); });
        });
    });
    chipsDiv.innerHTML = categoryChips.filter(c => c.label === 'All' || available.has(c.label))
        .map(c => `<button class="chip ${activeChip === c.label ? 'active' : ''}" onclick="setChip('${c.label}')">${c.label}</button>`).join('');
    chipsDiv.style.display = 'flex';
}

function setChip(label) {
    activeChip = label;
    renderFilterChips(currentResults);
    const resultsDiv = document.getElementById("results");
    const filtered = applyChipFilter();
    resultsDiv.innerHTML = buildResultsHTML(filtered);
    if (filtered.length === 0) {
        resultsDiv.innerHTML = `<div class="results-header"><p class="results-count">No tools in "${label}" match "${escapeHtml(currentQuery)}"</p><button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button></div>` + renderRelatedSearches();
    }
}

function toolCard(tool, matchReasons) {
    const reasons = Array.isArray(matchReasons) ? matchReasons : [matchReasons];
    return `<div class="card result-card"><div class="card-header"><img src="${getLogoUrl(tool.link)}" alt="${escapeHtml(tool.name)}" class="tool-logo"><div class="tool-title"><h3>${escapeHtml(tool.name)}</h3><a href="${tool.link}" target="_blank" class="tool-link">Visit Website →</a></div></div><p class="tool-description">${escapeHtml(tool.description)}</p><div class="best-for"><span class="best-for-label">⭐ Best For:</span><span class="best-for-text">${escapeHtml(tool.bestFor)}</span></div><div class="match-tags">${reasons.map(r => `<span class="tag">${escapeHtml(r)}</span>`).join('')}</div></div>`;
}

function buildResultsHTML(filtered) {
    if (filtered.length === 0) {
        const didYouMean = findDidYouMean(currentQuery, currentKeywords);
        const relatedTools = findRelatedTools(currentKeywords);
        let html = `<div class="results-header"><p class="results-count">No exact matches for "${escapeHtml(currentQuery)}"</p><button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button></div>`;

        if (didYouMean.length > 0) {
            html += `<div class="did-you-mean"><p>Did you mean:</p>${didYouMean.map(s => `<button class="did-you-mean-btn" onclick="searchQuery('${jsEscape(s.name)}')">${escapeHtml(s.name)}</button>`).join('')}</div>`;
        }

        if (relatedTools.length > 0) {
            html += `<div class="related-section"><h3>🔍 Recommended for you</h3><p class="related-subtitle">Based on your search for "${escapeHtml(currentQuery)}"</p><div class="results-grid">`;
            relatedTools.forEach(item => { html += toolCard(item.tool, ['Related']); });
            html += '</div></div>';
        }

        if (didYouMean.length === 0 && relatedTools.length === 0) {
            html += `<p class="no-results">No AI tools found for "${escapeHtml(currentQuery)}"</p>`;
        }

        html += renderRelatedSearches(true);
        return html;
    }

    let html = `<div class="results-header"><p class="results-count">Found ${filtered.length} AI tools for "${escapeHtml(currentQuery)}"</p><button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button></div><div class="results-grid">`;
    filtered.forEach(item => { html += toolCard(item.tool, item.matchReasons); });
    html += '</div>';

    html += renderRecommendations(filtered);
    html += renderRelatedNews();
    html += renderRelatedSearches(false);
    return html;
}

function renderResults(filtered) {
    document.getElementById("results").innerHTML = buildResultsHTML(filtered);
}

function renderRecommendations(filtered) {
    const visibleNames = new Set(filtered.map(item => item.tool.name));
    const topTools = filtered.slice(0, 3);
    const tagCounts = {};
    topTools.forEach(item => {
        item.tool.tags.forEach(tag => {
            const t = tag.toLowerCase();
            if (t.length < 3) return;
            (tagToolMap[t] || []).forEach(tool => {
                if (visibleNames.has(tool.name)) return;
                if (!tagCounts[tool.name]) tagCounts[tool.name] = { tool, overlap: 0 };
                tagCounts[tool.name].overlap += 1;
            });
        });
    });
    const recs = Object.values(tagCounts).sort((a, b) => b.overlap - a.overlap).slice(0, 4);
    if (recs.length === 0) return '';
    let html = `<div class="related-section"><h3>💡 Recommended for you</h3><p class="related-subtitle">Similar to what you searched for</p><div class="results-grid">`;
    recs.forEach(item => { html += toolCard(item.tool, ['Recommended']); });
    html += '</div></div>';
    return html;
}

function renderRelatedNews() {
    const terms = currentKeywords;
    const matches = newsData.filter(n => {
        const hay = `${n.headline} ${n.category} ${n.tags.join(' ')}`.toLowerCase();
        return terms.some(t => hay.includes(t));
    }).slice(0, 3);
    if (matches.length === 0) return '';
    return `<div class="related-section"><h3>📰 Related AI News</h3><p class="related-subtitle">Latest news matching your search</p><div class="related-news-grid">${matches.map(n => `
        <div class="news-card ${n.type}" onclick="openNewsModal(${n.id})">
            <div class="news-badge-top">${getTypeEmoji(n.type)} ${n.type.replace('-', ' ').toUpperCase()}</div>
            <div class="news-content">
                <span class="news-category">${escapeHtml(n.category)}</span>
                <h3>${escapeHtml(n.headline)}</h3>
                <p>${escapeHtml(n.shortDesc)}</p>
                <div class="news-meta"><span class="news-time">${n.timeAgo}</span><span class="news-read">${n.readTime}</span></div>
            </div>
        </div>`).join('')}</div></div>`;
}

function buildRelatedSearches(query, keywords) {
    const queries = [];
    const seen = new Set([query.toLowerCase()]);
    keywords.forEach(kw => {
        const cat = categoryChips.find(c => c.match && c.match.includes(kw));
        if (cat && cat.label !== 'All') {
            const phrase = `best ${cat.label.toLowerCase()} AI tools`;
            if (!seen.has(phrase)) { seen.add(phrase); queries.push(phrase); }
        }
        if (kw.length >= 3) {
            const phrase = `${kw} AI tools`;
            if (!seen.has(phrase)) { seen.add(phrase); queries.push(phrase); }
        }
    });
    currentResults.slice(0, 2).forEach(item => {
        const phrase = `${item.tool.name} alternatives`;
        if (!seen.has(phrase.toLowerCase())) { seen.add(phrase.toLowerCase()); queries.push(phrase); }
    });
    return queries.slice(0, 6);
}

function renderRelatedSearches(noResults) {
    const related = buildRelatedSearches(currentQuery, currentKeywords);
    if (related.length === 0) return '';
    return `<div class="related-searches"><h3>${noResults ? '🔗 Related Searches' : '🔗 People also search for'}</h3><div class="related-search-chips">${related.map(term => `<button class="related-search-chip" onclick="searchQuery('${jsEscape(term)}')">${escapeHtml(term)}</button>`).join('')}</div></div>`;
}

function searchQuery(value) {
    document.getElementById("searchInput").value = value;
    addToHistory(value);
    searchAI();
}

function clearSearch() {
    document.getElementById("searchInput").value = '';
    document.getElementById("results").innerHTML = '';
    activeToolIndex = 0;
    currentQuery = '';
    currentKeywords = [];
    currentResults = [];
    activeChip = 'All';
    renderFilterChips([]);
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNewsModal();
        const suggestionsDiv = document.getElementById("suggestions");
        if (suggestionsDiv) suggestionsDiv.style.display = "none";
        suggestionIndex = -1;
        return;
    }
    const suggestionsDiv = document.getElementById("suggestions");
    if (!suggestionsDiv || suggestionsDiv.style.display === 'none' || suggestionItems.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSuggestion(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveSuggestion(-1); }
    else if (e.key === 'Enter') {
        if (suggestionIndex >= 0) { e.preventDefault(); selectSuggestion(suggestionItems[suggestionIndex].value); }
    }
});

window.selectSuggestion = selectSuggestion;
window.clearSearch = clearSearch;
window.goHome = goHome;
window.searchAI = searchAI;
window.searchQuery = searchQuery;
window.openNewsModal = openNewsModal;
window.closeNewsModal = closeNewsModal;
window.goBackInHistory = goBackInHistory;
window.setChip = setChip;
window.clearHistory = clearHistory;

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingTools();
    renderNewsCards();
    renderToolDetails();
    renderTrendingSearches();
    const searchInput = document.getElementById('searchInput');

    const debouncedInstant = debounce((value) => {
        const trimmed = value.trim();
        if (trimmed.length >= 2 && trimmed !== currentQuery) {
            searchAI({ keepSuggestions: true, scroll: false });
        }
    }, 250);

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        showSuggestions(value);
        if (value.trim() === '') {
            document.getElementById("results").innerHTML = '';
            renderFilterChips([]);
            currentQuery = '';
            currentKeywords = [];
            currentResults = [];
            activeChip = 'All';
            showOriginalContent();
        } else {
            debouncedInstant(value);
        }
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const value = searchInput.value.trim();
            if (!value) return;
            document.getElementById("suggestions").style.display = "none";
            suggestionIndex = -1;
            addToHistory(value);
            searchAI();
        }
    });
    searchInput.addEventListener('blur', () => { setTimeout(() => { document.getElementById("suggestions").style.display = "none"; }, 200); });
    searchInput.addEventListener('focus', () => { showSuggestions(searchInput.value); });

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
