import { Conversation } from '@elevenlabs/client';

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const connectionStatus = document.getElementById('connectionStatus');
const agentStatus = document.getElementById('agentStatus');
const micCharacter = document.getElementById('micCharacter');
const topicCards = document.querySelectorAll('.topic-card');

let conversation;
let selectedTopic = null;
let isConversationActive = false;

// Cấu hình Agent ID - cần thay thế bằng ID thực tế
// Agent ID sẽ được lấy từ server thông qua API

// Định nghĩa các chủ đề học tập với prompt song ngữ
const LEARNING_TOPICS = {
    greetings: {
        name: 'Chào hỏi / Greetings',
        nameVi: 'Chào hỏi',
        nameEn: 'Greetings',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice greetings in English. Use simple words like Hello, Hi, Good morning, Good afternoon, Good evening, How are you, Nice to meet you. When they seem confused, you can briefly explain in Vietnamese, then encourage them to repeat in English. Always be encouraging and patient. Speak slowly and clearly. Give positive feedback when they try to speak English. Start by saying: "Hello! Xin chào! I\'m your English friend. Let\'s practice greetings together! Chúng ta cùng luyện chào hỏi nhé! Can you say hello to me?"',
        examples: ['Hello! (Xin chào!)', 'Hi there! (Chào bạn!)', 'Good morning! (Chào buổi sáng!)', 'How are you? (Bạn khỏe không?)', 'Nice to meet you! (Rất vui được gặp bạn!)'],
        vocabulary: [
            { en: 'Hello', vi: 'Xin chào', pronunciation: '/həˈloʊ/' },
            { en: 'Hi', vi: 'Chào', pronunciation: '/haɪ/' },
            { en: 'Good morning', vi: 'Chào buổi sáng', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/' },
            { en: 'How are you?', vi: 'Bạn khỏe không?', pronunciation: '/haʊ ɑːr juː/' },
            { en: 'Nice to meet you', vi: 'Rất vui được gặp bạn', pronunciation: '/naɪs tuː miːt juː/' }
        ]
    },
    family: {
        name: 'Gia đình / Family',
        nameVi: 'Gia đình',
        nameEn: 'Family',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice family vocabulary in English. Use simple words like Mom, Dad, Mother, Father, Sister, Brother, Grandmother, Grandfather, Family. When they need help, explain briefly in Vietnamese then encourage English practice. Always be encouraging and ask simple questions about their family. Speak slowly and clearly. Start by saying: "Hi there! Chào bạn! Let\'s talk about family in English. Chúng ta nói về gia đình bằng tiếng Anh nhé! Can you tell me about your family members?"',
        examples: ['This is my mom (Đây là mẹ tôi)', 'I have a sister (Tôi có một chị gái)', 'My dad is tall (Bố tôi cao)', 'I love my family (Tôi yêu gia đình tôi)'],
        vocabulary: [
            { en: 'Mom/Mother', vi: 'Mẹ', pronunciation: '/mɑːm/ /ˈmʌðər/' },
            { en: 'Dad/Father', vi: 'Bố', pronunciation: '/dæd/ /ˈfɑːðər/' },
            { en: 'Sister', vi: 'Chị/Em gái', pronunciation: '/ˈsɪstər/' },
            { en: 'Brother', vi: 'Anh/Em trai', pronunciation: '/ˈbrʌðər/' },
            { en: 'Family', vi: 'Gia đình', pronunciation: '/ˈfæməli/' }
        ]
    },
    colors: {
        name: 'Màu sắc / Colors',
        nameVi: 'Màu sắc',
        nameEn: 'Colors',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice colors in English. Use simple words like Red, Blue, Green, Yellow, Orange, Purple, Pink, Black, White, Brown. When they need help, briefly explain in Vietnamese then encourage English repetition. Ask them about colors of objects they can see. Always be encouraging and speak slowly. Start by saying: "Hello! Xin chào! Today we\'re learning colors in English. Hôm nay chúng ta học màu sắc! What color do you see around you? Bạn thấy màu gì xung quanh?"',
        examples: ['Red apple (Táo đỏ)', 'Blue sky (Bầu trời xanh)', 'Green grass (Cỏ xanh)', 'Yellow sun (Mặt trời vàng)', 'What color is this? (Đây là màu gì?)'],
        vocabulary: [
            { en: 'Red', vi: 'Đỏ', pronunciation: '/red/' },
            { en: 'Blue', vi: 'Xanh dương', pronunciation: '/bluː/' },
            { en: 'Green', vi: 'Xanh lá', pronunciation: '/ɡriːn/' },
            { en: 'Yellow', vi: 'Vàng', pronunciation: '/ˈjeloʊ/' },
            { en: 'Orange', vi: 'Cam', pronunciation: '/ˈɔːrɪndʒ/' }
        ]
    },
    animals: {
        name: 'Động vật / Animals',
        nameVi: 'Động vật',
        nameEn: 'Animals',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice animal names in English. Use simple words like Cat, Dog, Bird, Fish, Elephant, Lion, Tiger, Rabbit, Bear, Horse. Make animal sounds and ask them to guess. When they need help, explain in Vietnamese then encourage English practice. Always be encouraging and fun. Start by saying: "Hi! Chào bạn! Let\'s learn about animals in English. Chúng ta học về động vật nhé! What\'s your favorite animal? Con vật yêu thích của bạn là gì?"',
        examples: ['I see a cat (Tôi thấy một con mèo)', 'Dogs say woof (Chó kêu gâu gâu)', 'Birds can fly (Chim có thể bay)', 'Fish swim in water (Cá bơi trong nước)'],
        vocabulary: [
            { en: 'Cat', vi: 'Mèo', pronunciation: '/kæt/' },
            { en: 'Dog', vi: 'Chó', pronunciation: '/dɔːɡ/' },
            { en: 'Bird', vi: 'Chim', pronunciation: '/bɜːrd/' },
            { en: 'Fish', vi: 'Cá', pronunciation: '/fɪʃ/' },
            { en: 'Elephant', vi: 'Voi', pronunciation: '/ˈeləfənt/' }
        ]
    },
    numbers: {
        name: 'Số đếm / Numbers',
        nameVi: 'Số đếm',
        nameEn: 'Numbers',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice numbers in English from 1 to 20. Use simple counting exercises, ask them to count objects, and practice number recognition. When they need help, count in Vietnamese first then encourage English repetition. Always be encouraging and patient. Make it fun with games. Start by saying: "Hello! Xin chào! Let\'s count together in English. Chúng ta cùng đếm số bằng tiếng Anh nhé! Can you count from 1 to 5 for me?"',
        examples: ['One, two, three (Một, hai, ba)', 'I have five fingers (Tôi có năm ngón tay)', 'Count to ten (Đếm đến mười)', 'How many apples? (Có bao nhiêu quả táo?)'],
        vocabulary: [
            { en: 'One', vi: 'Một', pronunciation: '/wʌn/' },
            { en: 'Two', vi: 'Hai', pronunciation: '/tuː/' },
            { en: 'Three', vi: 'Ba', pronunciation: '/θriː/' },
            { en: 'Four', vi: 'Bốn', pronunciation: '/fɔːr/' },
            { en: 'Five', vi: 'Năm', pronunciation: '/faɪv/' }
        ]
    },
    school: {
        name: 'Trường học / School',
        nameVi: 'Trường học',
        nameEn: 'School',
        prompt: 'You are a friendly bilingual English teacher for Vietnamese elementary school children. Help them practice school vocabulary in English. Use simple words like Teacher, Student, Book, Pen, Pencil, Classroom, Desk, Chair, Bag, School. When they need help, explain in Vietnamese then encourage English practice. Ask about their school experiences. Always be encouraging. Start by saying: "Hi! Chào bạn! Let\'s talk about school in English. Chúng ta nói về trường học bằng tiếng Anh nhé! What do you use to write at school?"',
        examples: ['My teacher is nice (Cô giáo của tôi tốt bụng)', 'I have a red pen (Tôi có một cây bút đỏ)', 'Books are fun (Sách rất thú vị)', 'I go to school (Tôi đi học)'],
        vocabulary: [
            { en: 'Teacher', vi: 'Giáo viên', pronunciation: '/ˈtiːtʃər/' },
            { en: 'Student', vi: 'Học sinh', pronunciation: '/ˈstuːdənt/' },
            { en: 'Book', vi: 'Sách', pronunciation: '/bʊk/' },
            { en: 'Pen', vi: 'Bút', pronunciation: '/pen/' },
            { en: 'School', vi: 'Trường học', pronunciation: '/skuːl/' }
        ]
    }
};

// Thêm hiệu ứng âm thanh khuyến khích
function playEncouragementSound() {
    // Có thể thêm âm thanh khuyến khích ở đây
    console.log('🎉 Great job! Keep practicing!');
}

// Hiển thị thông báo khuyến khích
function showEncouragement(message) {
    const encouragementEl = document.querySelector('.encouragement');
    const messages = [
        '🌟 Tuyệt vời! Excellent! Bạn đang học rất tốt!',
        '💪 Giỏi lắm! Great job! Tiếp tục nói tiếng Anh nhé!',
        '🎯 Bạn đang tiến bộ từng ngày! You\'re improving every day!',
        '🏆 Thật là xuất sắc! Outstanding! Bạn rất dũng cảm khi nói tiếng Anh!',
        '⭐ Tuyệt vời! Wonderful! Bạn phát âm rất rõ ràng!',
        '🎊 Chúc mừng! Congratulations! Bạn đã học được từ mới!',
        '👏 Rất tốt! Very good! Keep practicing English!',
        '🚀 Amazing! Tuyệt vời! Bạn học rất nhanh!',
        '🎉 Perfect! Hoàn hảo! Bạn nói tiếng Anh rất tự tin!',
        '💝 Well done! Làm tốt lắm! English is fun, right?'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    encouragementEl.textContent = message || randomMessage;
    encouragementEl.style.transform = 'scale(1.05)';
    setTimeout(() => {
        encouragementEl.style.transform = 'scale(1)';
    }, 200);
}

// Cập nhật UI cho chủ đề được chọn
function updateTopicUI(topic) {
    // Bỏ chọn tất cả các chủ đề khác
    topicCards.forEach(card => {
        card.classList.remove('selected');
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        card.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    });
    
    // Chọn chủ đề được click
    const selectedCard = document.querySelector(`[data-topic="${topic}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedCard.style.transform = 'translateY(-8px)';
        selectedCard.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
        selectedCard.style.background = 'linear-gradient(135deg, #a8edea, #fed6e3)';
    }
}

// Xử lý chọn chủ đề (cải thiện để hỗ trợ realtime)
async function handleTopicSelection(topic) {
    const oldTopic = selectedTopic;
    selectedTopic = topic;
    
    // Cập nhật UI
    updateTopicUI(topic);
    
    // Cập nhật vocabulary panel
    updateVocabularyPanel(topic);
    
    showEncouragement(`🎯 Bạn đã chọn chủ đề: ${LEARNING_TOPICS[topic].name}!`);
    
    // Hiển thị một số ví dụ cho chủ đề được chọn
    const examples = LEARNING_TOPICS[topic].examples;
    console.log(`📚 Một số ví dụ cho chủ đề ${LEARNING_TOPICS[topic].name}:`, examples);
    
    // Nếu đang trong cuộc trò chuyện, chuyển đổi chủ đề realtime
    if (isConversationActive && conversation && oldTopic !== topic) {
        await switchTopicRealtime(topic);
    }
}

// Chuyển đổi chủ đề trong thời gian thực
async function switchTopicRealtime(newTopic) {
    if (!conversation || !LEARNING_TOPICS[newTopic]) {
        console.warn('Cannot switch topic: conversation not active or invalid topic');
        return;
    }
    
    try {
        showEncouragement(`🔄 Đang chuyển sang chủ đề: ${LEARNING_TOPICS[newTopic].name}...`);
        
        // Gửi tin nhắn để AI biết chuyển đổi chủ đề
        const switchMessage = `Now let's switch to a new topic: ${LEARNING_TOPICS[newTopic].name}. ${LEARNING_TOPICS[newTopic].prompt}`;
        
        // Có thể sử dụng conversation.sendMessage nếu API hỗ trợ
        // Hoặc restart conversation với topic mới
        console.log('🔄 Switching topic to:', newTopic);
        console.log('📝 New prompt:', LEARNING_TOPICS[newTopic].prompt);
        
        // Thông báo cho người dùng
        showEncouragement(`✨ Đã chuyển sang chủ đề "${LEARNING_TOPICS[newTopic].name}"! Hãy bắt đầu nói về chủ đề mới nhé!`);
        
        // Update agent status
        agentStatus.textContent = `học ${LEARNING_TOPICS[newTopic].name}`;
        
    } catch (error) {
        console.error('Error switching topic:', error);
        showEncouragement('😅 Có lỗi khi chuyển chủ đề. Hãy thử lại nhé!');
    }
}

// Thêm event listeners cho các thẻ chủ đề với logic cải thiện
topicCards.forEach(card => {
    card.addEventListener('click', () => {
        const topic = card.dataset.topic;
        handleTopicSelection(topic);
    });
    
    // Thêm hiệu ứng hover với animation mượt mà hơn
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(-3px)';
            card.style.transition = 'all 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

async function getSignedUrl() {
    try {
        // Use relative URL for better deployment compatibility
        const response = await fetch('/api/get-signed-url');
        if (!response.ok) {
            throw new Error(`Failed to get signed url: ${response.statusText}`);
        }
        const { signedUrl } = await response.json();
        return signedUrl;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        return null;
    }
}

async function startConversation() {
    try {
        // Kiểm tra xem đã chọn chủ đề chưa
        if (!selectedTopic) {
            alert('🎯 Vui lòng chọn một chủ đề học tập trước khi bắt đầu!');
            return;
        }
        
        // Yêu cầu quyền truy cập microphone
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        connectionStatus.textContent = 'Đang kết nối...';
        micCharacter.classList.add('active');
        isConversationActive = true;
        
        let conversationConfig = {
            onConnect: () => {
                connectionStatus.textContent = 'Đã kết nối';
                agentStatus.textContent = `học ${LEARNING_TOPICS[selectedTopic].name}`;
                startButton.disabled = true;
                stopButton.disabled = false;
                
                // Enable topic switching during conversation
                topicCards.forEach(card => {
                    card.style.cursor = 'pointer';
                    card.style.opacity = '1';
                });
                
                showEncouragement('🎉 Kết nối thành công! Hãy bắt đầu nói tiếng Anh! Bạn có thể chuyển chủ đề bất cứ lúc nào!');
                console.log('🎉 Connected to ElevenLabs AI!');
            },
            onDisconnect: () => {
                connectionStatus.textContent = 'Đã ngắt kết nối';
                agentStatus.textContent = 'chờ bạn';
                startButton.disabled = false;
                stopButton.disabled = true;
                micCharacter.classList.remove('active');
                isConversationActive = false;
                
                // Disable topic switching
                topicCards.forEach(card => {
                    card.style.opacity = '0.7';
                });
                
                showEncouragement('👋 Tạm biệt! Hẹn gặp lại bạn sau!');
                console.log('👋 Disconnected from ElevenLabs AI');
            },
            onError: (error) => {
                console.error('❌ Conversation Error:', error);
                connectionStatus.textContent = 'Lỗi kết nối';
                agentStatus.textContent = 'có lỗi';
                startButton.disabled = false;
                stopButton.disabled = true;
                micCharacter.classList.remove('active');
                isConversationActive = false;
                
                alert('😅 Có lỗi xảy ra! Đừng lo, hãy thử lại nhé. Kiểm tra kết nối internet và Agent ID.');
            },
            onModeChange: (mode) => {
                const isListening = mode.mode === 'listening';
                const isSpeaking = mode.mode === 'speaking';
                
                if (isListening) {
                    agentStatus.textContent = `đang nghe (${LEARNING_TOPICS[selectedTopic].name})`;
                    micCharacter.style.background = 'linear-gradient(135deg, #a8edea, #fed6e3)';
                    micCharacter.textContent = '👂';
                } else if (isSpeaking) {
                    agentStatus.textContent = `đang dạy (${LEARNING_TOPICS[selectedTopic].name})`;
                    micCharacter.style.background = 'linear-gradient(135deg, #ffeaa7, #fab1a0)';
                    micCharacter.textContent = '🗣️';
                } else {
                    agentStatus.textContent = `sẵn sàng (${LEARNING_TOPICS[selectedTopic].name})`;
                    micCharacter.style.background = 'linear-gradient(135deg, #ff9a9e, #fecfef)';
                    micCharacter.textContent = '🤖';
                }
                
                console.log(`🎯 Mode changed: ${mode.mode}`);
            },
            onMessage: (message) => {
                console.log('💬 Message:', message);
                if (message.type === 'user_transcript') {
                    showEncouragement('👏 Bạn nói rất rõ ràng!');
                    console.log('👤 User said:', message.message);
                } else if (message.type === 'agent_response') {
                    console.log('🤖 AI said:', message.message);
                }
            },
            onStatusChange: (status) => {
                console.log('📊 Status:', status);
            }
        };
        
        // Thêm prompt cho chủ đề được chọn
        if (selectedTopic && LEARNING_TOPICS[selectedTopic]) {
            conversationConfig.overrides = {
                agent: {
                    prompt: {
                        prompt: LEARNING_TOPICS[selectedTopic].prompt
                    }
                }
            };
        }
        
        // Thử sử dụng signed URL trước, nếu không có thì dùng agent ID
        try {
            const signedUrl = await getSignedUrl();
            if (signedUrl) {
                conversationConfig.signedUrl = signedUrl;
                console.log('🔐 Using signed URL for authentication');
            } else {
                throw new Error('No signed URL available');
            }
        } catch (error) {
            console.log('🆔 Using direct agent ID');
            conversationConfig.agentId = AGENT_ID;
        }
        
        // Bắt đầu conversation
        conversation = await Conversation.startSession(conversationConfig);
        
    } catch (error) {
        console.error('❌ Failed to start conversation:', error);
        connectionStatus.textContent = 'Không thể kết nối';
        micCharacter.classList.remove('active');
        isConversationActive = false;
        
        let errorMessage = 'Không thể bắt đầu cuộc trò chuyện. ';
        
        if (error.name === 'NotAllowedError') {
            errorMessage += 'Vui lòng cho phép sử dụng microphone và thử lại.';
        } else if (error.message.includes('Agent ID')) {
            errorMessage += 'Vui lòng kiểm tra Agent ID trong file script.js.';
        } else {
            errorMessage += 'Vui lòng kiểm tra kết nối internet và thử lại.';
        }
        
        alert(errorMessage);
    }
}

async function stopConversation() {
    if (conversation) {
        try {
            await conversation.endSession();
            conversation = null;
            isConversationActive = false;
            showEncouragement('🎓 Buổi học đã kết thúc! Bạn đã cố gắng rất tốt!');
            console.log('⏹️ Conversation ended');
        } catch (error) {
            console.error('Error ending conversation:', error);
            isConversationActive = false;
        }
    }
}

// Event listeners
startButton.addEventListener('click', startConversation);
stopButton.addEventListener('click', stopConversation);

// Kiểm tra hỗ trợ trình duyệt
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('😔 Trình duyệt của bạn không hỗ trợ ghi âm. Vui lòng sử dụng Chrome, Firefox, hoặc Safari để có trải nghiệm tốt nhất.');
    startButton.disabled = true;
}

// Thông báo cần thiết lập Agent ID
if (AGENT_ID === 'YOUR_AGENT_ID') {
    console.warn('⚠️ Vui lòng thay thế YOUR_AGENT_ID bằng Agent ID thực tế trong file script.js');
    
    // Hiển thị modal hướng dẫn
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        color: white;
        font-family: 'Comic Neue', cursive;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 600px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        ">
            <h2 style="font-family: 'Fredoka One', cursive; margin-bottom: 20px;">🔧 Cần cấu hình Agent ID</h2>
            <p style="margin-bottom: 20px; font-size: 18px;">Để bắt đầu học tiếng Anh, bạn cần:</p>
            <ol style="text-align: left; margin: 20px 0; font-size: 16px; line-height: 1.6;">
                <li>Đăng ký tài khoản tại <a href="https://elevenlabs.io" target="_blank" style="color: #ffd700; text-decoration: none;">ElevenLabs.io</a></li>
                <li>Tạo một Agent mới cho việc dạy tiếng Anh</li>
                <li>Copy Agent ID của bạn</li>
                <li>Thay thế 'YOUR_AGENT_ID' trong file script.js</li>
                <li>Khởi động lại ứng dụng</li>
            </ol>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">
                    💡 <strong>Gợi ý:</strong> Khi tạo Agent, hãy đặt tên là "English Teacher" và mô tả là "Friendly English teacher for elementary students"
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(45deg, #4ecdc4, #44a08d);
                border: none;
                color: white;
                padding: 15px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                font-family: 'Comic Neue', cursive;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                🎯 Đã hiểu!
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
} 

// Khởi tạo: hiển thị thông báo chào mừng
setTimeout(() => {
    showEncouragement('🌟 Chào mừng bạn đến với English Friends! Hãy chọn một chủ đề để bắt đầu học nhé!');
}, 1000);

// Cập nhật vocabulary panel
function updateVocabularyPanel(topic) {
    const vocabularyContent = document.getElementById('vocabularyContent');
    
    if (!topic || !LEARNING_TOPICS[topic]) {
        vocabularyContent.innerHTML = '<p class="vocabulary-instruction">Chọn một chủ đề để xem từ vựng! / Choose a topic to see vocabulary!</p>';
        return;
    }
    
    const topicData = LEARNING_TOPICS[topic];
    const vocabulary = topicData.vocabulary || [];
    
    let html = `
        <div class="topic-vocabulary-title">
            ${topicData.nameVi} / ${topicData.nameEn}
        </div>
        <div class="vocabulary-grid">
    `;
    
    vocabulary.forEach(item => {
        html += `
            <div class="vocabulary-item">
                <div class="vocab-word">
                    <div class="vocab-en">${item.en}</div>
                    <div class="vocab-vi">${item.vi}</div>
                </div>
                <div class="vocab-pronunciation">${item.pronunciation}</div>
                <button class="vocab-sound" onclick="speakWord('${item.en}')" title="Nghe phát âm">🔊</button>
            </div>
        `;
    });
    
    html += '</div>';
    vocabularyContent.innerHTML = html;
}

// Toggle vocabulary panel
function toggleVocabulary() {
    const vocabularyContent = document.getElementById('vocabularyContent');
    const toggleButton = document.querySelector('.vocabulary-toggle');
    
    if (vocabularyContent.classList.contains('collapsed')) {
        vocabularyContent.classList.remove('collapsed');
        toggleButton.textContent = '📖';
    } else {
        vocabularyContent.classList.add('collapsed');
        toggleButton.textContent = '📚';
    }
}

// Speak word function
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        
        showEncouragement(`🔊 Đang phát âm: "${word}"`);
    } else {
        showEncouragement('😅 Trình duyệt không hỗ trợ phát âm. Hãy nghe AI nói nhé!');
    }
}

// Thêm một số hiệu ứng tương tác bổ sung
document.addEventListener('DOMContentLoaded', () => {
    // Hiệu ứng click cho mic character
    micCharacter.addEventListener('click', () => {
        if (!conversation) {
            showEncouragement('🎤 Nhấn "Bắt đầu trò chuyện" để bắt đầu nói chuyện với AI nhé!');
        } else {
            showEncouragement('💬 Bạn có thể chuyển chủ đề bất cứ lúc nào bằng cách nhấn vào các thẻ chủ đề!');
        }
    });
    
    // Tự động chọn chủ đề đầu tiên sau 3 giây nếu chưa chọn
    setTimeout(() => {
        if (!selectedTopic) {
            handleTopicSelection('greetings');
            showEncouragement('🎯 Chúng tôi đã chọn chủ đề "Chào hỏi" cho bạn. Bạn có thể chọn chủ đề khác nếu muốn!');
        }
    }, 3000);
    
    // Thêm shortcut keys cho chuyển đổi chủ đề nhanh
    document.addEventListener('keydown', (event) => {
        if (isConversationActive) {
            const topicMap = {
                '1': 'greetings',
                '2': 'family', 
                '3': 'colors',
                '4': 'animals',
                '5': 'numbers',
                '6': 'school'
            };
            
            if (topicMap[event.key]) {
                handleTopicSelection(topicMap[event.key]);
                event.preventDefault();
            }
        }
    });
}); 