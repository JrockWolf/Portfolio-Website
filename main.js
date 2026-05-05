// --- Matrix Terminal Animation ---

const terminalText = [
    "Hi, I'm Jared 🐺👋",
    "Welcome to my portfolio!",
    "Click the buttons above to learn more about me.",
    "Enjoy your visit! 😊",
    "LinkedIn: https://www.linkedin.com/in/jared-butler-0b1a4b1b2/",
    "GitHub: https://github.com/JrockWolf",
    "Email: JaredButler@workmail.com",
    "Feel free to reach out for collaboration or just to say hi! Would love to hear from you or just chat about tech.",
];

// Get terminal elements (div already exists in HTML)
let terminal = document.getElementById('terminal');
let terminalTextDiv = document.getElementById('terminal-text');

let line = 0, char = 0;

function typeLine() {
    if (line < terminalText.length) {
        if (char < terminalText[line].length) {
            terminalTextDiv.innerHTML += terminalText[line][char++];
            setTimeout(typeLine, 18);
        } else {
            terminalTextDiv.innerHTML += "<br>";
            line++; char = 0;
            setTimeout(typeLine, 250);
        }
    }
}

// Start typing animation after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    typeLine();
});

// --- Google Translate Initialization ---
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it,pt,zh-CN,ja,ko,ar,hi,ru',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
    );
}

// --- Popup Window Logic ---
const popups = {};

function openPopup(type) {
    if (popups[type]) return; // Prevent duplicate

    const popup = document.createElement('div');
    popup.className = 'window-popup';
    popup.innerHTML = `
        <div class="window-header" onmousedown="startDrag(event, this.parentElement)">
            <h3>${capitalize(type)}</h3>
            <button onclick="closePopup('${type}')">&times;</button>
        </div>
        <div class="window-content">${getPopupContent(type)}</div>
    `;
    document.getElementById('popup-container').appendChild(popup);
    popups[type] = popup;
    // Center popup
    popup.style.left = `50vw`;
    popup.style.top = `100px`;
}

function closePopup(type) {
    if (popups[type]) {
        popups[type].remove();
        delete popups[type];
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPopupContent(type) {
    if (type === 'about') {
        return `
            <p>
            <strong>Hello there!</strong> I'm <b>Jared Butler</b>, a Black and Italian college student at Rider University, majoring in Computer Science with a minor in Cybersecurity. My passion for technology and IT drives me to constantly explore new tools and systems, always seeking to expand my knowledge and skills.

            I thrive on solving complex problems, whether it’s debugging code, optimizing network performance, or designing secure digital environments. I have hands-on experience maintaining and administering servers using a variety of Linux distributions, including Arch, Debian, and Fedora. This exposure has given me a strong command of system configuration, shell scripting, and troubleshooting across different operating systems.

            Beyond the classroom, I love tinkering with servers and networks, setting up virtual labs, and experimenting with new open-source technologies. My technical toolkit also includes proficiency in Windows and macOS environments, making me adaptable and versatile in any IT setting.

            I’m deeply committed to building innovative solutions that have a real impact within the tech community. Whether collaborating on group projects, contributing to open-source initiatives, or mentoring peers, I strive to make technology more accessible, secure, and meaningful for everyone.
            </p>
            <div class="os-grid">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" class="os-icon" title="Windows" alt="Windows">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" class="os-icon" title="Linux" alt="Linux">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" class="os-icon" title="macOS" alt="macOS">
            </div>
        `;
    }
    if (type === 'skills') {
        return `
            <div class="skill-grid">
                <div class="skill-chip">HTML</div>
                <div class="skill-chip">CSS</div>
                <div class="skill-chip">JavaScript</div>
                <div class="skill-chip">Java</div>
                <div class="skill-chip">C/C#</div>
                <div class="skill-chip">Python</div>
                <div class="skill-chip skill-chip-certified"><a href="https://www.linkedin.com/posts/jared-butler-04a04424a_certificate-of-completion-activity-7454239073839529984-w47n?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2V_zoBwYjMLaYtJc4IQ9dNZ5O-AaF3oLA" target="_blank" rel="noopener noreferrer" title="View Snowflake Certificate on LinkedIn">❄️ Snowflake 🏅</a></div>
            </div>
            <p>
                <b>Web:</b> Responsive layouts, interactive UI, modern CSS<br>
                <b>Programming:</b> OOP, scripting, automation, debugging<br>
                <b>IT:</b> Networking, virtualization, system administration, PC fixing/maintenance<br>
                <b>Tools:</b> Git, Docker, VS Code, Linux CLI, Windows PowerShell, VirtualBox, VMware, QEMU, TrueNAS, Proxmox, Snowflake<br>
                <b>Soft Skills:</b> Problem-solving, teamwork, communication, adaptability
            </p>
        `;
    }
    if (type === 'projects') {
        return `
            <div style="max-height: 70vh; overflow-y: auto; display: flex; flex-direction: column; gap: 18px; padding-right: 4px;">

                <!-- TrueNAS Card -->
                <div class="project-card">
                    <h4>🖥️ TrueNAS Server</h4>
                    <ul>
                        <li>4TB ZFS Raid1/Mirror Storage Array</li>
                        <li>Docker, VMs, Media Streaming</li>
                        <li>Automated Backups &amp; Snapshots</li>
                    </ul>
                    <p style="margin: 8px 0 0;">I run my own TrueNAS server for storage, virtualization, and media. Comfortable with advanced IT setups and troubleshooting.</p>
                </div>

                <!-- Log Analysis Card -->
                <div class="project-card">
                    <h4>🤖 Log Analysis Helper Bot</h4>
                    <img src="photo_1_2026-05-05_15-13-56.jpg" class="project-photo" alt="Log Analysis project screenshot" loading="lazy">
                    <p style="margin: 0 0 10px;">An LLM-powered log analysis assistant for security education and small SOCs. Analyzes security logs using AI to identify threats and generate actionable insights.</p>
                    <b>Key Features:</b>
                    <ul style="margin: 6px 0 10px 18px;">
                        <li><strong>Multi-Format Support:</strong> Parses text, JSON, and CSV log files</li>
                        <li><strong>AI-Powered Analysis:</strong> Integrates with OpenAI, Perplexity, Gemini, DeepSeek, or local HuggingFace models</li>
                        <li><strong>Security Event Detection:</strong> Identifies threats and suspicious activities</li>
                        <li><strong>Simulated Log Generator:</strong> Creates synthetic logs for testing and training</li>
                        <li><strong>Evaluation Metrics:</strong> Precision/recall/F1 testing harness</li>
                        <li><strong>Plain-Language Summaries:</strong> Human-readable security reports</li>
                    </ul>
                    <div class="skill-grid" style="margin-bottom: 12px;">
                        <div class="skill-chip">Python</div>
                        <div class="skill-chip">AI/LLM</div>
                        <div class="skill-chip">OpenAI API</div>
                        <div class="skill-chip">Cybersecurity</div>
                        <div class="skill-chip">Log Analysis</div>
                    </div>
                    <a href="https://github.com/JrockWolf/LogAnalysisBot" target="_blank" rel="noopener noreferrer" style="color: var(--neon-purple); text-decoration: none; font-weight: bold;">🔗 View on GitHub</a>
                </div>

            </div>
        `;
    }
    return '';
}

let dragData = null;

window.startDrag = function(e, popup) {
    dragData = {
        popup,
        offsetX: e.clientX - popup.offsetLeft,
        offsetY: e.clientY - popup.offsetTop
    };
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', stopDrag);
};

function dragMove(e) {
    if (!dragData) return;
    dragData.popup.style.left = `${e.clientX - dragData.offsetX}px`;
    dragData.popup.style.top = `${e.clientY - dragData.offsetY}px`;
}

function stopDrag() {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', stopDrag);
    dragData = null;
}
