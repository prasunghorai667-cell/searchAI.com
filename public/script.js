import { aiTools } from "./data.js";

const stopWords = ["the", "best", "for", "is", "which", "a", "an", "and", "or", "ai", "can", "i", "you", "what", "how", "to", "with", "my", "make", "create", "use"];

const allKeywords = [...new Set(
    aiTools.flatMap(tool => [
        ...tool.tags,
        tool.name.split(" ").filter(w => w.length > 2)
    ].flat())
)].filter(k => k.length > 2);

const allToolNames = aiTools.map(tool => tool.name);
const allDescriptions = aiTools.map(tool => tool.description);

const newsData = [
    {
        id: 1,
        type: "breaking",
        category: "OpenAI",
        headline: "OpenAI Unveils GPT-5 with Human-Level Reasoning",
        shortDesc: "Revolutionary AI model achieves AGI milestone with unprecedented problem-solving capabilities...",
        fullContent: `OpenAI has officially announced the release of GPT-5, marking what many experts are calling the most significant advancement in artificial intelligence to date. The new model demonstrates capabilities that, for the first time, consistently match or exceed human performance on a wide range of cognitive tasks.

Key features of GPT-5 include:

• **Advanced Reasoning**: GPT-5 can solve complex mathematical proofs, write production-quality code, and engage in multi-step scientific reasoning that rivals PhD-level expertise.

• **True Understanding**: Unlike previous models, GPT-5 shows genuine comprehension of context, nuance, and implied meaning, enabling more natural and meaningful conversations.

• **Multimodal Mastery**: Seamlessly processes and generates text, images, audio, and video while maintaining coherent understanding across all modalities.

• **Self-Improvement**: The model can identify gaps in its own knowledge and主动 seek to fill them, demonstrating a form of learning that wasn't possible before.

• **Safety First**: Built with Constitutional AI principles, GPT-5 shows dramatic improvements in refusing harmful requests while maintaining helpfulness.

OpenAI CEO Sam Altman stated, "GPT-5 represents our biggest leap forward. We've focused not just on capability, but on building an AI that truly understands and respects human values."

Industry analysts predict this release will accelerate AI adoption across healthcare, scientific research, education, and creative industries. Several Fortune 500 companies have already announced partnerships for enterprise deployment.`,
        author: "Sarah Chen",
        publishDate: "March 30, 2026",
        timeAgo: "2 hours ago",
        readTime: "5 min read",
        tags: ["AI", "OpenAI", "GPT-5", "AGI", "Machine Learning"],
        externalLink: "https://openai.com/blog/gpt-5",
        sourceName: "OpenAI Blog"
    },
    {
        id: 2,
        type: "trending",
        category: "Google",
        headline: "Google Gemini Dominates Multimodal AI Benchmark",
        shortDesc: "Gemini outperforms all competitors in text, image, audio, and video understanding tests...",
        fullContent: `Google's Gemini Ultra has claimed the top spot on the comprehensive MMLU-Pro benchmark, decisively outperforming all other AI models across text, image, audio, and video understanding tasks.

The benchmark, considered the industry standard for measuring AI capabilities, evaluates models across 25 different domains including science, mathematics, humanities, and professional fields like medicine and law.

What sets Gemini apart:

• **Multimodal Integration**: Unlike competitors that process modalities separately, Gemini naturally weaves together information from text, images, audio, and video in real-time.

• **Context Window**: With a 2M token context window, Gemini can process entire books, codebases, or video libraries while maintaining coherent understanding.

• **Reasoning Chain**: Gemini's reasoning capabilities allow it to break down complex problems step-by-step, showing its work and enabling better error detection.

• **Real-Time Learning**: The model can incorporate new information during conversations, making it ideal for research and analysis tasks.

Google's DeepMind team revealed that Gemini was trained on a proprietary dataset that includes interleaved modalities - examples where text, images, and audio appear together naturally, teaching the model how humans actually perceive information.

The achievement signals a shift in the AI race, with Google now leading in the crucial multimodal category that will define next-generation AI applications.`,
        author: "Michael Torres",
        publishDate: "March 30, 2026",
        timeAgo: "4 hours ago",
        readTime: "3 min read",
        tags: ["Google", "Gemini", "Benchmark", "Multimodal"],
        externalLink: "https://blog.google/technology/ai/gemini-update/",
        sourceName: "Google Blog"
    },
    {
        id: 3,
        type: "must-read",
        category: "Anthropic",
        headline: "Claude 3.5 Sets New Standard for AI Safety",
        shortDesc: "Latest Claude release achieves 98% safety score while maintaining top-tier performance...",
        fullContent: `Anthropic has released Claude 3.5, establishing new records for both AI capability and safety metrics. The model achieves a 98% score on the Comprehensive AI Safety Evaluation (CAISE), while simultaneously ranking among the top performers on capability benchmarks.

This breakthrough addresses the long-standing tension between safety and performance, proving that highly capable AI can also be highly responsible.

Key Safety Innovations:

• **Constitutional AI 2.0**: Claude 3.5 embeds ethical guidelines directly into its reasoning process, not just as post-training filters.

• **Uncertainty Detection**: The model accurately identifies when it's uncertain about information, clearly communicating limitations to users.

• **Bias Mitigation**: Extensive testing shows 94% reduction in harmful bias compared to previous generations across all demographic categories.

• **Transparency Reports**: Claude 3.5 can generate detailed reasoning traces, helping users understand how it reaches conclusions.

• **Helpful Refusals**: When declining requests, Claude provides constructive alternatives when possible.

Anthropic's safety team emphasized that Claude 3.5 was developed using their "responsible scaling" framework, which proactively addresses potential risks before they materialize.

The release has been welcomed by enterprise customers who have been cautious about AI adoption due to safety concerns. Major financial institutions and healthcare organizations have already announced pilot programs.`,
        author: "Emma Rodriguez",
        publishDate: "March 30, 2026",
        timeAgo: "6 hours ago",
        readTime: "4 min read",
        tags: ["Anthropic", "Claude", "AI Safety", "Ethics"],
        externalLink: "https://www.anthropic.com/news/claude-3-5-sonnet",
        sourceName: "Anthropic News"
    },
    {
        id: 4,
        type: "analysis",
        category: "Healthcare",
        headline: "How AI is Transforming Healthcare in 2026",
        shortDesc: "From diagnosis to drug discovery, AI revolutionizes patient care across major hospitals...",
        fullContent: `The healthcare industry is experiencing a fundamental transformation driven by artificial intelligence. In hospitals worldwide, AI systems are assisting doctors, accelerating research, and improving patient outcomes in ways that seemed like science fiction just five years ago.

Diagnostic Breakthroughs:

AI-powered diagnostic tools have achieved remarkable accuracy rates:

• **Radiology**: AI systems now detect early-stage cancers with 99.2% accuracy, outperforming human specialists in identifying subtle patterns.

• **Pathology**: Digital pathology AI reduces diagnosis time from days to hours for complex cancer cases.

• **Rare Diseases**: AI successfully identifies rare conditions that affect fewer than 1 in a million people, often missed by general practitioners.

Drug Discovery Revolution:

The traditional drug development process takes 10-15 years and costs billions. AI is dramatically accelerating this:

• **Protein Folding**: AlphaFold 3 has predicted structures for over 200 million proteins, unlocking new therapeutic targets.

• **Clinical Trial Design**: AI optimizes trial recruitment, reducing failed trials by 40%.

• **Side Effect Prediction**: Machine learning models predict adverse reactions before human trials begin.

Patient Care Transformation:

• **Remote Monitoring**: AI-powered wearable devices detect health issues before symptoms appear.

• **Treatment Personalization**: Genomic AI tailors treatment plans to individual patients.

• **Administrative Automation**: NLP systems handle 80% of routine administrative tasks, freeing doctors to focus on care.

The result? Studies show a 35% improvement in patient outcomes at hospitals that have fully integrated AI systems, with emergency room wait times reduced by half.`,
        author: "Dr. James Liu",
        publishDate: "March 30, 2026",
        timeAgo: "8 hours ago",
        readTime: "7 min read",
        tags: ["Healthcare", "AI", "Diagnosis", "Innovation"],
        externalLink: "https://www.healthcareitnews.com/ai-healthcare",
        sourceName: "Healthcare IT News"
    },
    {
        id: 5,
        type: "guide",
        category: "Development",
        headline: "Top 10 AI Tools Every Developer Should Use",
        shortDesc: "Complete guide to integrating AI into your development workflow for maximum productivity...",
        fullContent: `The landscape of software development has fundamentally changed. Developers who embrace AI tools are seeing 3-5x productivity gains. Here's your comprehensive guide to the essential AI tools every developer should be using in 2026.

1. **GitHub Copilot X** - The Evolution of Autocomplete
Beyond simple code completion, Copilot X understands your entire codebase, writes tests, explains code, and even generates documentation. Average productivity gain: 55%.

2. **Cursor** - AI-First IDE
Built from the ground up with AI, Cursor offers intelligent refactoring, natural language code generation, and real-time collaboration with AI pair programmers.

3. **Amazon CodeWhisperer** - Security-First Coding
With built-in security scanning, CodeWhisperer identifies vulnerabilities as you code, not after deployment. Saves an average of 2 hours per week on security reviews.

4. **Tabnine Enterprise** - Private & Compliant
For organizations with strict data policies, Tabnine offers on-premise deployment with all the benefits of AI coding assistance.

5. **v0 by Vercel** - UI Generation
Transform natural language descriptions into production-ready React components. Perfect for rapid prototyping and frontend development.

6. **Bolt.new** - Full-Stack AI
Build entire full-stack applications from a single prompt. Includes frontend, backend, database, and deployment.

7. **Phind** - AI Search for Developers
Get instant answers to technical questions with context-aware search that understands code, documentation, and Stack Overflow discussions.

8. **Mintlify** - AI Documentation
Automatically generate and maintain documentation. Just point it at your codebase.

9. **CodiumAI** - Testing Automation
AI-powered test generation that understands your code's intent and creates comprehensive test suites.

10. **Mutable AI** - Production-Quality Code
Go from prototype to production with AI that handles optimization, security, and best practices.

Integration Tips:
• Start with one tool and master it
• Use AI for boilerplate, focus creativity on architecture
• Always review AI-generated code
• Combine tools for maximum effect`,
        author: "Alex Thompson",
        publishDate: "March 30, 2026",
        timeAgo: "10 hours ago",
        readTime: "6 min read",
        tags: ["Development", "Tools", "Productivity", "Coding"],
        externalLink: "https://dev.to/best-ai-tools-for-developers",
        sourceName: "Dev.to"
    },
    {
        id: 6,
        type: "new",
        category: "Video AI",
        headline: "Sora Video AI Now Available for Everyone",
        shortDesc: "OpenAI launches public access to Sora video generation with enhanced quality and speed...",
        fullContent: `OpenAI has opened Sora, its revolutionary text-to-video AI, to the general public with a completely redesigned interface and dramatically improved capabilities.

New Features in Public Release:

• **4K Quality**: Generate professional-quality videos at up to 4K resolution
• **60-Second Duration**: Create videos up to one minute long in a single prompt
• **Motion Consistency**: Dramatically improved character and object consistency throughout videos
• **Style Control**: Fine-tune the visual style from photorealistic to artistic
• **Storyboard Mode**: Create complex multi-scene videos with visual storyboarding

How It Works:

1. **Describe**: Type your video concept in natural language
2. **Customize**: Adjust motion, style, and duration
3. **Generate**: AI creates your video in 2-3 minutes
4. **Edit**: Make adjustments with natural language commands

Pricing:
• Free tier: 50 video credits/month
• Plus: $20/month for 500 credits
• Pro: $50/month for unlimited generation

Use Cases Already Trending:

• **Marketing**: Small businesses creating professional commercials
• **Education**: Teachers generating illustrative videos for lessons
• **Entertainment**: Independent creators producing short films
• **Prototyping**: Filmmakers storyboarding before production

OpenAI has implemented robust safety measures, including:
- Content filters preventing harmful material
- Watermarking all AI-generated videos
- Detection tools for identifying AI videos

Early users report the quality is indistinguishable from professionally shot footage for many applications, democratizing video production like never before.`,
        author: "Maria Santos",
        publishDate: "March 30, 2026",
        timeAgo: "12 hours ago",
        readTime: "3 min read",
        tags: ["Sora", "Video AI", "OpenAI", "Generation"],
        externalLink: "https://openai.com/sora",
        sourceName: "OpenAI Sora"
    },
    {
        id: 7,
        type: "breaking",
        category: "Robotics",
        headline: "Boston Dynamics Unveils Humanoid AI Robot",
        shortDesc: "Next-generation robot with GPT-5 brain can perform complex tasks autonomously...",
        fullContent: `Boston Dynamics has revealed Atlas 2.0, a humanoid robot powered by a GPT-5 brain that demonstrates unprecedented autonomous capabilities in real-world environments.

Technical Specifications:

• **Height**: 5'9" (170 cm)
• **Weight**: 165 lbs (75 kg)
• **Battery Life**: 4 hours continuous operation
• **Movement Speed**: 5 mph walking, 8 mph running
• **Payload Capacity**: 50 lbs (23 kg)

Intelligence Features:

Atlas 2.0's integration with GPT-5 enables:

• **Natural Language Interaction**: Communicate with Atlas using voice commands in any language
• **Task Understanding**: Break down complex instructions into executable steps
• **Environmental Awareness**: Navigate unpredictable spaces with human-like adaptability
• **Learning**: Improve performance through experience and user feedback
• **Problem-Solving**: Handle unexpected obstacles without human intervention

Real-World Applications:

Boston Dynamics has announced partnerships for:
- **Manufacturing**: Atlas 2.0 will work alongside humans in BMW and Toyota factories
- **Healthcare**: Deploying in hospitals for patient care assistance
- **Construction**: Site monitoring and material handling
- **Disaster Response**: Search and rescue operations in dangerous environments

Safety Features:

• Collision avoidance with millimeter precision
• Gentle touch mode for working with humans
• Emergency stop via voice command
• Continuous monitoring by human supervisors

CEO Robert Playter stated, "Atlas 2.0 represents the convergence of advanced robotics and frontier AI. It's not just a robot—it's a helpful partner that learns and adapts."

Pre-orders are now open for enterprise customers, with general availability expected in Q4 2026.`,
        author: "David Park",
        publishDate: "March 29, 2026",
        timeAgo: "1 day ago",
        readTime: "5 min read",
        tags: ["Robotics", "Boston Dynamics", "Atlas", "AI"],
        externalLink: "https://www.bostondynamics.com/atlas",
        sourceName: "Boston Dynamics"
    },
    {
        id: 8,
        type: "trending",
        category: "Startups",
        headline: "AI Startup Funding Reaches $50B in Q1 2026",
        shortDesc: "Record investment in AI companies signals continued boom in artificial intelligence sector...",
        fullContent: `Venture capital investment in artificial intelligence startups has shattered all previous records, with $50 billion flowing into the AI sector during the first quarter of 2026 alone.

Record-Breaking Deals:

• **Foundation Models**: $15B invested in companies developing large language models and multimodal AI
• **Enterprise AI**: $12B for AI solutions targeting business automation and decision-making
• **Healthcare AI**: $10B for medical AI applications, the fastest-growing segment
• **AI Infrastructure**: $8B for chips, cloud platforms, and developer tools
• **Consumer AI**: $5B for AI-powered apps and services

Top Funded Categories:

1. **AI Agents**: Autonomous AI systems that complete complex tasks
2. **AI Safety**: Companies focused on making AI more reliable and trustworthy
3. **Vertical AI**: Industry-specific AI solutions for healthcare, legal, finance
4. **AI Hardware**: Next-generation chips optimized for AI workloads
5. **Creative AI**: Tools for video, music, and content generation

Notable Mega-Rounds:

• **Adept AI**: $3B Series D for autonomous AI agents
• **Runway**: $1.5B Series C for creative AI tools
• **Scale AI**: $2B Series F for AI training data infrastructure
• **Character.AI**: $1.2B Series B for conversational AI

Investor Sentiment:

"We haven't seen investment enthusiasm like this since the early internet boom," said Sarah Tavel, General Partner at Benchmark. "But unlike previous tech waves, AI is delivering real value today, not just promises."

Venture firms are expanding their AI teams, with Andreessen Horowitz, Sequoia, and NEA each dedicating over $1B specifically to AI investments.

Market analysts predict this momentum will continue through 2026, with total annual AI investment potentially exceeding $200B.`,
        author: "Jennifer Wu",
        publishDate: "March 29, 2026",
        timeAgo: "1 day ago",
        readTime: "4 min read",
        tags: ["Startups", "Funding", "Venture Capital", "Investment"],
        externalLink: "https://techcrunch.com/ai-startup-funding-2026",
        sourceName: "TechCrunch"
    }
];

let newsHistory = [];
let historyIndex = -1;
let isSearchActive = false;

const trendingTools = [
    { name: "ChatGPT", description: "Advanced AI chatbot for conversation, coding, writing", link: "https://chat.openai.com", icon: "🤖", userCount: "100M+ users" },
    { name: "Claude", description: "AI assistant for reasoning, analysis & writing", link: "https://claude.ai", icon: "🧠", userCount: "50M+ users" },
    { name: "Gemini", description: "Google's multimodal AI for text, images, video", link: "https://gemini.google.com", icon: "✨", userCount: "80M+ users" },
    { name: "Midjourney", description: "AI image generation for stunning artwork", link: "https://www.midjourney.com", icon: "🎨", userCount: "25M+ users" },
    { name: "Runway", description: "AI-powered video editing & generation", link: "https://runwayml.com", icon: "🎬", userCount: "15M+ users" },
    { name: "Sora", description: "Text-to-video AI by OpenAI", link: "https://openai.com/sora", icon: "🎥", userCount: "10M+ users" },
    { name: "Cursor", description: "AI-first code editor for developers", link: "https://cursor.com", icon: "💻", userCount: "8M+ users" },
    { name: "GitHub Copilot", description: "AI pair programmer by GitHub", link: "https://github.com/features/copilot", icon: "⚡", userCount: "20M+ users" },
    { name: "Perplexity", description: "AI-powered search engine with answers", link: "https://perplexity.ai", icon: "🔍", userCount: "30M+ users" },
    { name: "Suno", description: "AI music generation with vocals", link: "https://suno.ai", icon: "🎵", userCount: "12M+ users" },
    { name: "DALL-E", description: "AI image generation by OpenAI", link: "https://openai.com/dall-e-3", icon: "🖼️", userCount: "18M+ users" },
    { name: "ElevenLabs", description: "AI voice synthesis & voice cloning", link: "https://elevenlabs.io", icon: "🎙️", userCount: "6M+ users" }
];

function getToolLogoUrl(link) {
    try {
        const url = new URL(link);
        const domain = url.hostname.replace('www.', '');
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch { return ''; }
}

function renderTrendingTools() {
    const carousel = document.getElementById('trendingCarousel');
    if (!carousel) return;
    carousel.innerHTML = trendingTools.map(tool => `
        <a href="${tool.link}" target="_blank" class="trending-tool-card">
            <div class="trending-tool-logo">
                <img src="${getToolLogoUrl(tool.link)}" alt="${tool.name}" onerror="this.parentElement.innerHTML='<span class=\\'trending-tool-icon\\'>${tool.icon}</span>'">
            </div>
            <div class="trending-tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <span class="trending-user-count">👥 ${tool.userCount}</span>
            </div>
        </a>
    `).join('');
}

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
                <div class="news-meta">
                    <span class="news-time">${news.timeAgo}</span>
                    <span class="news-read">${news.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showSuggestions(query) {
    const suggestionsDiv = document.getElementById("suggestions");
    if (query.length < 1) {
        suggestionsDiv.innerHTML = "";
        suggestionsDiv.style.display = "none";
        return;
    }

    const queryLower = query.toLowerCase();
    
    const toolMatches = aiTools.filter(tool => 
        tool.name.toLowerCase().includes(queryLower) || 
        tool.description.toLowerCase().includes(queryLower)
    ).slice(0, 5);

    const keywordMatches = allKeywords.filter(k => k.toLowerCase().includes(queryLower)).slice(0, 8);
    
    const popularSearches = getPopularSearches(queryLower);

    if (toolMatches.length === 0 && keywordMatches.length === 0 && popularSearches.length === 0) {
        suggestionsDiv.style.display = "none";
        return;
    }

    let html = "";

    if (popularSearches.length > 0) {
        html += '<div class="suggestion-section">🔥 Popular Searches</div>';
        popularSearches.forEach(term => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${term.replace(/'/g, "\\'")}')">
                <span class="suggestion-icon">🔥</span> ${term}
            </div>`;
        });
    }

    if (toolMatches.length > 0) {
        html += '<div class="suggestion-section">🤖 AI Tools</div>';
        toolMatches.forEach(tool => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${tool.name.replace(/'/g, "\\'")}')">
                <img src="${getToolLogoUrl(tool.link)}" alt="" class="suggestion-logo" onerror="this.style.display='none'">
                <span>${tool.name}</span>
                <span class="suggestion-category">${tool.tags[0]}</span>
            </div>`;
        });
    }

    if (keywordMatches.length > 0) {
        html += '<div class="suggestion-section">🔍 Related Keywords</div>';
        keywordMatches.forEach(match => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${match}')">
                <span class="suggestion-icon">🔍</span> ${match}
            </div>`;
        });
    }

    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = "block";
}

function getPopularSearches(query) {
    const popularTerms = [
        "best AI for video editing",
        "free AI image generator",
        "AI coding assistant",
        "text to video AI",
        "AI chatbot for writing",
        "music generation AI",
        "AI presentation maker",
        "voice cloning AI",
        "AI logo generator",
        "AI for research papers"
    ];
    return popularTerms.filter(term => term.toLowerCase().includes(query)).slice(0, 3);
}

function selectSuggestion(value) {
    document.getElementById("searchInput").value = value;
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
    searchAI();
}

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
    try {
        const url = new URL(link);
        const domain = url.hostname.replace('www.', '');
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
        return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>';
    }
}

function showOriginalContent() {
    const trendingSection = document.getElementById('trendingTools');
    const newsSection = document.getElementById('latestNews');
    const videosSection = document.querySelector('.videos');
    const backBtn = document.getElementById('backBtn');
    
    trendingSection.style.display = 'block';
    newsSection.style.display = 'block';
    videosSection.style.display = 'block';
    backBtn.style.display = 'none';
    isSearchActive = false;
}

function hideOriginalContent() {
    const trendingSection = document.getElementById('trendingTools');
    const newsSection = document.getElementById('latestNews');
    const videosSection = document.querySelector('.videos');
    const backBtn = document.getElementById('backBtn');
    
    trendingSection.style.display = 'none';
    newsSection.style.display = 'none';
    videosSection.style.display = 'none';
    backBtn.style.display = 'flex';
    isSearchActive = true;
}

function goHome() {
    clearSearch();
}

function searchAI() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    const suggestionsDiv = document.getElementById("suggestions");

    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.display = "none";

    if (!query) {
        resultsDiv.innerHTML = '';
        showOriginalContent();
        return;
    }

    hideOriginalContent();

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

    const filtered = scored.filter(item => item.score > 0).sort((a, b) => b.score - a.score);

    if (filtered.length === 0) {
        resultsDiv.innerHTML = `<p class="no-results">No AI tools found for "${query}"</p>
            <button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button>`;
        return;
    }

    resultsDiv.innerHTML = `
        <div class="results-header">
            <p class="results-count">Found ${filtered.length} AI tool${filtered.length !== 1 ? 's' : ''} for "${query}"</p>
            <button class="clear-search-btn" onclick="clearSearch()">← Back to Home</button>
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

function clearSearch() {
    document.getElementById("searchInput").value = '';
    document.getElementById("results").innerHTML = '';
    showOriginalContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openNewsModal(newsId, addToHistory = true) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;
    
    if (addToHistory) {
        if (historyIndex < newsHistory.length - 1) newsHistory = newsHistory.slice(0, historyIndex + 1);
        newsHistory.push(newsId);
        historyIndex = newsHistory.length - 1;
    }
    
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('newsModalBody');
    
    const relatedNews = newsData.filter(n => n.id !== newsId && (n.category === news.category || n.tags.some(tag => news.tags.includes(tag)))).slice(0, 4);
    
    modalBody.innerHTML = `
        <div class="modal-article">
            <div class="modal-header-bar">
                <button class="modal-back-btn" onclick="goBackInHistory()" ${historyIndex <= 0 ? 'disabled' : ''}>← Back</button>
                <span class="modal-history-count">${historyIndex + 1} of ${newsHistory.length}</span>
            </div>
            <div class="modal-header">
                <span class="modal-category ${news.type}">${getTypeEmoji(news.type)} ${news.category}</span>
                <span class="modal-date">${news.publishDate}</span>
            </div>
            <h1 class="modal-headline">${news.headline}</h1>
            <div class="modal-meta">
                <span class="modal-author">By ${news.author}</span>
                <span class="modal-readtime">${news.readTime}</span>
                <span class="modal-time">${news.timeAgo}</span>
            </div>
            <div class="modal-tags">${news.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}</div>
            <div class="modal-body">${news.fullContent.split('\n\n').map(para => {
                if (para.startsWith('•')) return `<ul>${para.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('')}</ul>`;
                else if (para.startsWith('**')) return `<h3>${para.replace(/\*\*/g, '')}</h3>`;
                return `<p>${para}</p>`;
            }).join('')}</div>
            <div class="modal-source-section">
                <a href="${news.externalLink}" target="_blank" class="modal-source-link">📖 Read Full Article on ${news.sourceName} →</a>
            </div>
            ${relatedNews.length > 0 ? `
                <div class="modal-related">
                    <h2 class="related-title">📰 Related News</h2>
                    <div class="related-grid">${relatedNews.map(r => `
                        <div class="related-card ${r.type}" onclick="openNewsModal(${r.id})">
                            <span class="related-badge">${getTypeEmoji(r.type)} ${r.type.replace('-', ' ')}</span>
                            <h4>${r.headline}</h4>
                            <div class="related-meta"><span>${r.category}</span><span>${r.timeAgo}</span></div>
                        </div>
                    `).join('')}</div>
                </div>
            ` : ''}
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function goBackInHistory() {
    if (historyIndex > 0) {
        historyIndex--;
        const prevNewsId = newsHistory[historyIndex];
        const news = newsData.find(n => n.id === prevNewsId);
        if (news) {
            updateModalContent(prevNewsId);
        }
    }
}

function updateModalContent(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;
    
    const modalBody = document.getElementById('newsModalBody');
    const relatedNews = newsData.filter(n => n.id !== newsId && (n.category === news.category || n.tags.some(tag => news.tags.includes(tag)))).slice(0, 4);
    
    modalBody.innerHTML = `
        <div class="modal-article">
            <div class="modal-header-bar">
                <button class="modal-back-btn" onclick="goBackInHistory()" ${historyIndex <= 0 ? 'disabled' : ''}>← Back</button>
                <span class="modal-history-count">${historyIndex + 1} of ${newsHistory.length}</span>
            </div>
            <div class="modal-header">
                <span class="modal-category ${news.type}">${getTypeEmoji(news.type)} ${news.category}</span>
                <span class="modal-date">${news.publishDate}</span>
            </div>
            <h1 class="modal-headline">${news.headline}</h1>
            <div class="modal-meta">
                <span class="modal-author">By ${news.author}</span>
                <span class="modal-readtime">${news.readTime}</span>
                <span class="modal-time">${news.timeAgo}</span>
            </div>
            <div class="modal-tags">${news.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}</div>
            <div class="modal-body">${news.fullContent.split('\n\n').map(para => {
                if (para.startsWith('•')) return `<ul>${para.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('')}</ul>`;
                else if (para.startsWith('**')) return `<h3>${para.replace(/\*\*/g, '')}</h3>`;
                return `<p>${para}</p>`;
            }).join('')}</div>
            <div class="modal-source-section">
                <a href="${news.externalLink}" target="_blank" class="modal-source-link">📖 Read Full Article on ${news.sourceName} →</a>
            </div>
            ${relatedNews.length > 0 ? `
                <div class="modal-related">
                    <h2 class="related-title">📰 Related News</h2>
                    <div class="related-grid">${relatedNews.map(r => `
                        <div class="related-card ${r.type}" onclick="openNewsModal(${r.id})">
                            <span class="related-badge">${getTypeEmoji(r.type)} ${r.type.replace('-', ' ')}</span>
                            <h4>${r.headline}</h4>
                            <div class="related-meta"><span>${r.category}</span><span>${r.timeAgo}</span></div>
                        </div>
                    `).join('')}</div>
                </div>
            ` : ''}
        </div>
    `;
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    newsHistory = [];
    historyIndex = -1;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNewsModal();
});

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
    
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
        if (e.target.value.trim() === '') {
            document.getElementById("results").innerHTML = '';
            showOriginalContent();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchAI();
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => { document.getElementById("suggestions").style.display = "none"; }, 200);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) showSuggestions(searchInput.value);
    });
});
