# 🧪 Test Logic - English Friends

## ✅ Checklist kiểm tra tính năng

### 🔧 Kiểm tra cơ bản
- [ ] Ứng dụng khởi động thành công
- [ ] Tất cả 6 topic cards hiển thị đúng
- [ ] Keyboard hints (1-6) hiển thị trên từng card
- [ ] Chọn topic bằng click hoạt động
- [ ] UI cập nhật khi chọn topic (selected state)
- [ ] Auto-select "Chào hỏi" sau 3 giây

### 🎤 Kiểm tra microphone
- [ ] Browser yêu cầu quyền microphone
- [ ] Thông báo lỗi khi từ chối microphone
- [ ] Thông báo lỗi với browser không hỗ trợ

### 🤖 Kiểm tra AI Connection
- [ ] Kết nối thành công với ElevenLabs
- [ ] Status hiển thị đúng: "Đang kết nối..." → "Đã kết nối"
- [ ] Agent status cập nhật theo mode: nghe/nói/sẵn sàng
- [ ] Mic character thay đổi icon và màu sắc

### 🔄 Kiểm tra chuyển đổi topic realtime
- [ ] **TRƯỚC khi bắt đầu**: Chọn topic hoạt động bình thường
- [ ] **SAU khi kết nối**: Topic cards vẫn clickable
- [ ] **Chuyển đổi realtime**: Click topic khác khi đang conversation
- [ ] **Keyboard shortcuts**: Phím 1-6 chuyển topic khi đang nói chuyện
- [ ] **UI feedback**: Status cập nhật khi chuyển topic
- [ ] **Encouragement**: Thông báo khuyến khích khi chuyển topic

### 📊 Kiểm tra trạng thái conversation
- [ ] `isConversationActive` = true khi kết nối
- [ ] `isConversationActive` = false khi ngắt kết nối
- [ ] Topic cards opacity thay đổi theo trạng thái
- [ ] Button states đúng (start disabled khi connected)

---

## 🚀 Các tình huống test

### Test Case 1: Quy trình cơ bản
1. Mở ứng dụng
2. Chờ 3 giây → "Chào hỏi" được chọn tự động
3. Click "Bắt đầu trò chuyện"
4. Cho phép microphone
5. Kiểm tra kết nối thành công
6. Nói "Hello" → kiểm tra AI phản hồi

### Test Case 2: Chuyển đổi topic trong conversation
1. Hoàn thành Test Case 1
2. Click vào topic "Màu sắc" (hoặc nhấn phím 3)
3. Kiểm tra:
   - Status cập nhật: "học Màu sắc"
   - Encouragement message hiển thị
   - UI topic card được highlight
4. Nói về màu sắc → kiểm tra AI phản hồi đúng chủ đề

### Test Case 3: Keyboard shortcuts
1. Kết nối conversation với topic bất kỳ
2. Nhấn phím 1 → chuyển sang "Chào hỏi"
3. Nhấn phím 4 → chuyển sang "Động vật"
4. Kiểm tra UI và status cập nhật đúng

### Test Case 4: Error handling
1. Thử kết nối không có Agent ID
2. Thử kết nối không có internet
3. Từ chối microphone permission
4. Kiểm tra error messages thân thiện

---

## 🔍 Debug checklist

### Console logs cần kiểm tra:
```javascript
// Khi chọn topic
"📚 Một số ví dụ cho chủ đề [TÊN]: [EXAMPLES]"

// Khi chuyển topic realtime
"🔄 Switching topic to: [TOPIC]"
"📝 New prompt: [PROMPT]"

// Khi conversation events
"🎉 Connected to ElevenLabs AI!"
"🎯 Mode changed: [MODE]"
"👤 User said: [MESSAGE]"
"🤖 AI said: [MESSAGE]"
```

### Network requests cần kiểm tra:
- GET `http://localhost:3001/api/get-signed-url`
- WebSocket connection đến ElevenLabs
- Không có lỗi CORS
- Response codes 200 OK

### LocalStorage/Variables cần kiểm tra:
- `selectedTopic`: string (greetings, family, etc.)
- `isConversationActive`: boolean
- `conversation`: object hoặc null

---

## ⚠️ Các lỗi thường gặp và cách fix

### 1. Topic không chuyển được realtime
**Nguyên nhân**: ElevenLabs API có thể không hỗ trợ thay đổi prompt mid-conversation

**Fix tạm thời**: Restart conversation với topic mới
```javascript
// Trong switchTopicRealtime function
await conversation.endSession();
// Khởi tạo lại với topic mới
```

### 2. Keyboard shortcuts không hoạt động
**Nguyên nhân**: Event listener chỉ hoạt động khi `isConversationActive = true`

**Kiểm tra**: 
- Console log trong keydown event
- Giá trị `isConversationActive`

### 3. UI không cập nhật khi chuyển topic
**Nguyên nhân**: `updateTopicUI()` không được gọi

**Fix**: Đảm bảo gọi `updateTopicUI(topic)` trong `handleTopicSelection()`

---

## 📋 Performance checklist

- [ ] Animations mượt mà (transitions 0.3s)
- [ ] Không có memory leaks khi chuyển topic
- [ ] Event listeners được cleanup đúng cách
- [ ] Console logs không spam quá nhiều
- [ ] Topic switching < 1 giây response time

---

## 🎯 Kết quả mong đợi

✅ **Thành công**: Người dùng có thể chuyển đổi chủ đề học tập mượt mà trong khi đang trò chuyện với AI, tạo trải nghiệm học tập linh hoạt và thú vị.

🎉 **Bonus features hoạt động**:
- Keyboard shortcuts (1-6)
- Visual feedback khi chuyển topic
- Encouragement messages
- Status updates với tên topic hiện tại 