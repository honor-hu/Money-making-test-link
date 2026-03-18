import { questionsData } from './questions.js';
import { resultProfiles } from './results.js';

let currentQuestionIndex = 0;
const scores = {
    steady: 0,
    innovative: 0,
    professional: 0,
    resourceful: 0
};

const DOMElements = {
    intro: document.getElementById('screen-intro'),
    quiz: document.getElementById('screen-quiz'),
    loading: document.getElementById('screen-loading'),
    result: document.getElementById('screen-result'),
    btnStart: document.getElementById('btn-start'),
    qCurrent: document.getElementById('q-current'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container')
};

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        setTimeout(() => s.style.display = 'none', 400);
    });
    const target = document.getElementById(screenId);
    setTimeout(() => {
        target.style.display = 'flex';

        void target.offsetWidth;
        target.classList.add('active');
    }, 400);
}

function renderQuestion() {
    const q = questionsData[currentQuestionIndex];
    DOMElements.qCurrent.innerText = currentQuestionIndex + 1;
    DOMElements.progressBar.style.width = `${((currentQuestionIndex) / 50) * 100}%`;
    DOMElements.questionText.innerText = q.question;
    DOMElements.optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn group';
        btn.innerHTML = `
            <span class="option-letter group-hover:bg-black group-hover:text-white transition-colors">${letters[idx]}</span>
            <span>${opt.text}</span>
        `;
        btn.onclick = () => handleAnswer(opt.trait);
        DOMElements.optionsContainer.appendChild(btn);
    });
}

function handleAnswer(trait) {
    scores[trait]++;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questionsData.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    switchScreen('screen-loading');
    setTimeout(() => {
        generateResultView();
        switchScreen('screen-result');
        lucide.createIcons();
    }, 2000);
}

function generateResultView() {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTrait = sortedScores[0][0];
    const profile = resultProfiles[topTrait];

    document.getElementById('result-title').innerText = profile.title;
    document.getElementById('result-subtitle').innerText = profile.subtitle;
    
    let descHtml = profile.desc.split('。').filter(Boolean).map(s => `<p>${s}。</p>`).join('');
    document.getElementById('result-desc').innerHTML = descHtml;

    document.getElementById('result-strengths').innerHTML = profile.strengths.map(s => `<li>${s}</li>`).join('');
    document.getElementById('result-weaknesses').innerHTML = profile.weaknesses.map(w => `<li>${w}</li>`).join('');
    
    document.getElementById('result-paths').innerHTML = profile.paths.map(p => `
        <div class="border-l-4 border-black pl-4 py-1">
            <h4 class="font-bold text-gray-900">${p.name}</h4>
            <p class="text-sm text-gray-600 mt-1">${p.desc}</p>
        </div>
    `).join('');

    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels:['稳健执行', '创新开拓', '专业技能', '资源整合'],
            datasets:[{
                label: '天赋维度',
                data: [scores.steady, scores.innovative, scores.professional, scores.resourceful],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(0, 0, 0, 0.05)' },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    pointLabels: {
                        font: { family: "'Inter', sans-serif", size: 14, weight: '600' },
                        color: '#374151'
                    },
                    ticks: { display: false, beginAtZero: true }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    DOMElements.btnStart.addEventListener('click', () => {
        switchScreen('screen-quiz');
        renderQuestion();
    });
});
