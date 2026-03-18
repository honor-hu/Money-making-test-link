





const generateQuestions = () => {
    const templates =[
        "面对一个全新的商业机会，你通常的反应是？",
        "在团队合作中，你最常扮演的角色是？",
        "如果有一笔意外之财，你会如何处理？",
        "你理想的工作环境是怎样的？",
        "遇到工作中的难题，你的第一反应是？",
        "你认为赚钱最关键的因素是什么？",
        "在社交场合中，你通常的表现是？",
        "面对高风险高回报的投资，你的态度是？",
        "你最喜欢阅读或学习哪类知识？",
        "如果让你负责一个项目，你最关注的是什么？"
    ];

    const optionsList = [[
            { text: "先观望，分析风险和稳定性", trait: "steady" },
            { text: "立刻尝试，寻找突破口", trait: "innovative" },
            { text: "研究其背后的技术或专业逻辑", trait: "professional" },
            { text: "寻找合适的人脉一起合作", trait: "resourceful" }
        ],[
            { text: "默默执行，确保任务按时完成", trait: "steady" },
            { text: "提出新点子，打破常规", trait: "innovative" },
            { text: "提供专业意见，解决核心技术问题", trait: "professional" },
            { text: "协调各方，分配资源", trait: "resourceful" }
        ],[
            { text: "存入银行或买稳健理财", trait: "steady" },
            { text: "投资到自己的新项目中", trait: "innovative" },
            { text: "用于进修学习，提升技能", trait: "professional" },
            { text: "请客社交，拓展人脉圈", trait: "resourceful" }
        ],[
            { text: "规章制度完善，晋升路径清晰", trait: "steady" },
            { text: "充满未知，自由度极高", trait: "innovative" },
            { text: "能够专注专研，不被打扰", trait: "professional" },
            { text: "经常与不同行业的人交流", trait: "resourceful" }
        ],[
            { text: "查找以前的案例和流程", trait: "steady" },
            { text: "尝试用一种全新的方法解决", trait: "innovative" },
            { text: "深挖问题本质，提升自身能力", trait: "professional" },
            { text: "向认识的大佬或朋友求助", trait: "resourceful" }
        ]
    ];

    const questions =[];
    for (let i = 0; i < 50; i++) {
        const templateIdx = i % templates.length;
        const optionIdx = i % optionsList.length;
        questions.push({
            id: i + 1,
            question: `${i + 1}. ${templates[templateIdx]} (变体 ${Math.floor(i/10) + 1})`,
            options: optionsList[optionIdx]
        });
    }
    return questions;
};

export const questionsData = generateQuestions();
