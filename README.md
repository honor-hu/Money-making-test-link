**Description**: Wealth-making Talent Test (搞钱天赋测试) - A 50-question personality assessment to discover ideal money-making strategies, featuring a clean, Jony Ive inspired UI and detailed result analysis.
**Files**:
- index.html: Main entry point containing the layout for intro, quiz, and result screens. Refs: TailwindCSS, Lucide, Chart.js.
- style.css: Custom CSS for minimal aesthetics and smooth transitions.
- main.js: Core logic handling state transitions, quiz progression, and result calculation.
- questions.js: Contains the 50 multiple-choice questions data.
- results.js: Contains the logic and data for rendering the detailed result analysis and recommendations.
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>搞钱天赋测试 - 发现你的财富密码</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col items-center">
    <div id="app" class="w-full max-w-2xl px-4 py-12 md:py-20 flex-1 flex flex-col">
        
        <!-- Intro Screen -->
        <div id="screen-intro" class="screen active flex flex-col items-center text-center space-y-8 mt-10">
            <div class="w-20 h-20 bg-black text-white rounded-2xl shadow-xl flex items-center justify-center mb-4">
                <i data-lucide="compass" class="w-10 h-10"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">搞钱天赋测试</h1>
            <p class="text-lg text-gray-500 max-w-md">通过50道深度心理学与行为学测试题，精准定位你的性格到底适合靠什么赚钱。发掘你的潜在财富基因。</p>
            <button id="btn-start" class="mt-8 px-8 py-4 bg-black text-white rounded-xl font-medium text-lg shadow-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center space-x-2">
                <span>开始测试</span>
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
            <div class="text-sm text-gray-400 mt-8 flex items-center space-x-2">
                <i data-lucide="clock" class="w-4 h-4"></i>
                <span>预计耗时 5-8 分钟</span>
            </div>
        </div>

        <!-- Quiz Screen -->
        <div id="screen-quiz" class="screen flex flex-col w-full max-w-xl mx-auto hidden pt-10">
            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-8">
                <div id="progress-bar" class="bg-black h-1.5 rounded-full transition-all duration-300 w-0"></div>
            </div>
            <div class="flex justify-between items-center mb-8">
                <span class="text-sm font-medium text-gray-400 tracking-wider uppercase">Question <span id="q-current">1</span> / 50</span>
            </div>
            <h2 id="question-text" class="text-2xl md:text-3xl font-bold leading-tight mb-10 text-gray-800"></h2>
            <div id="options-container" class="space-y-4 flex-1">
                <!-- Options injected here -->
            </div>
        </div>

        <!-- Loading Screen -->
        <div id="screen-loading" class="screen hidden flex flex-col items-center justify-center text-center space-y-6 mt-32">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <h2 class="text-xl font-semibold text-gray-700">正在生成你的专属财富基因报告...</h2>
            <p class="text-gray-400">正在分析 50 项维度数据</p>
        </div>

        <!-- Result Screen -->
        <div id="screen-result" class="screen hidden flex flex-col w-full max-w-2xl mx-auto pt-6 pb-20">
            <div class="text-center space-y-4 mb-12">
                <span class="text-sm font-semibold text-gray-500 tracking-widest uppercase">你的核心财富天赋</span>
                <h1 id="result-title" class="text-4xl md:text-5xl font-extrabold text-gray-900 pb-2"></h1>
                <p id="result-subtitle" class="text-xl text-gray-500"></p>
            </div>

            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 border border-gray-100">
                <canvas id="radar-chart" class="w-full max-w-md mx-auto"></canvas>
            </div>

            <div class="space-y-8">
                <div class="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i data-lucide="brain" class="w-6 h-6 mr-3 text-gray-700"></i>
                        性格与财富解析
                    </h3>
                    <p id="result-desc" class="text-gray-600 leading-relaxed space-y-4"></p>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-green-50/50 p-6 rounded-3xl border border-green-100">
                        <h3 class="text-lg font-bold mb-3 text-green-800">搞钱优势</h3>
                        <ul id="result-strengths" class="space-y-2 text-green-700 list-disc list-inside"></ul>
                    </div>
                    <div class="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                        <h3 class="text-lg font-bold mb-3 text-orange-800">避坑指南</h3>
                        <ul id="result-weaknesses" class="space-y-2 text-orange-700 list-disc list-inside"></ul>
                    </div>
                </div>

                <div class="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i data-lucide="target" class="w-6 h-6 mr-3 text-gray-700"></i>
                        推荐搞钱路径
                    </h3>
                    <div id="result-paths" class="space-y-4"></div>
                </div>
            </div>

            <div class="mt-12 text-center">
                <button onclick="location.reload()" class="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-medium shadow-sm hover:bg-gray-200 transition-colors flex items-center space-x-2 mx-auto">
                    <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
                    <span>重新测试</span>
                </button>
            </div>
        </div>

    </div>

    <script type="module" src="main.js"></script>
</body>
</html>
