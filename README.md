# 🌟 English Friends - Học Tiếng Anh Vui Vẻ

Một ứng dụng web tương tác giúp học sinh tiểu học học giao tiếp tiếng Anh cơ bản thông qua AI bằng giọng nói với ElevenLabs Conversational AI.

## ✨ Tính năng

- 🎤 **Trò chuyện bằng giọng nói**: Giao tiếp trực tiếp với AI bằng tiếng Anh
- 🎯 **6 chủ đề học tập**: Chào hỏi, Gia đình, Màu sắc, Động vật, Số đếm, Trường học
- 👶 **Thân thiện với trẻ em**: Giao diện đầy màu sắc và dễ sử dụng
- 🤖 **AI thông minh**: Phản hồi phù hợp với lứa tuổi và trình độ
- 💪 **Khuyến khích tích cực**: Động viên và khích lệ học sinh liên tục
- 📱 **Responsive**: Hoạt động tốt trên cả máy tính và điện thoại

## 🎯 Chủ đề học tập

| Chủ đề | Mô tả | Từ vựng mẫu |
|--------|--------|-------------|
| 👋 **Chào hỏi** | Học cách chào hỏi và giao tiếp cơ bản | Hello, Hi, Good morning, How are you |
| 👨‍👩‍👧‍👦 **Gia đình** | Từ vựng về thành viên gia đình | Mom, Dad, Sister, Brother, Family |
| 🌈 **Màu sắc** | Nhận biết và nói tên các màu | Red, Blue, Green, Yellow, Purple |
| 🐶 **Động vật** | Tên các loài động vật quen thuộc | Cat, Dog, Bird, Fish, Elephant |
| 🔢 **Số đếm** | Đếm số từ 1 đến 20 | One, Two, Three, Count to ten |
| 🎒 **Trường học** | Từ vựng liên quan đến trường học | Teacher, Book, Pen, Classroom |

## 🚀 Cài đặt và Sử dụng

### Bước 1: Chuẩn bị môi trường

```bash
# Clone repository
git clone [repository-url]
cd elevenlabs-english-learning

# Cài đặt dependencies
npm install
```

### Bước 2: Cấu hình ElevenLabs

1. **Đăng ký tài khoản ElevenLabs**:
   - Truy cập [ElevenLabs.io](https://elevenlabs.io)
   - Tạo tài khoản miễn phí

2. **Tạo Agent**:
   - Vào phần "Conversational AI" → "Agents"
   - Nhấn "Create Agent"
   - Đặt tên: `English Teacher for Kids`
   - Mô tả: `Friendly English teacher for elementary school students`
   - Chọn giọng nói phù hợp (khuyến nghị: giọng nữ, nhẹ nhàng)

3. **Lấy API Key và Agent ID**:
   - Copy API Key từ Settings
   - Copy Agent ID từ Agent vừa tạo

### Bước 3: Cấu hình Environment Variables

```bash
# Tạo file .env từ template
cp env-example.txt .env

# Chỉnh sửa file .env
ELEVENLABS_API_KEY=your_api_key_here
AGENT_ID=your_agent_id_here
PORT=3001
```

### Bước 4: Chạy ứng dụng

```bash
# Chạy cả frontend và backend
npm run dev

# Hoặc chạy riêng lẻ
npm run dev:backend  # Chạy server (port 3001)
npm run dev:frontend # Chạy frontend (port 5173)
```

### Bước 5: Truy cập ứng dụng

Mở trình duyệt và truy cập: `http://localhost:5173`

## 📖 Hướng dẫn sử dụng

### Cho Học sinh:

1. **🎯 Chọn chủ đề**: Nhấn vào một trong 6 chủ đề học tập
2. **🎤 Cho phép microphone**: Khi được yêu cầu, nhấn "Allow" để cấp quyền ghi âm
3. **🚀 Bắt đầu**: Nhấn nút "Bắt đầu trò chuyện"
4. **💬 Nói chuyện**: Nói tiếng Anh với AI và lắng nghe phản hồi
5. **⏹️ Kết thúc**: Nhấn "Kết thúc" khi hoàn thành

### Cho Giáo viên/Phụ huynh:

- **Giám sát**: Theo dõi tiến trình học tập của trẻ
- **Khuyến khích**: Động viên trẻ thực hành thường xuyên
- **Đa dạng**: Khuyến khích trẻ thử nhiều chủ đề khác nhau
- **Thời gian**: Giới hạn 15-20 phút mỗi phiên để tránh mệt mỏi

## 🎨 Tính năng Giao diện

- **Màu sắc tươi sáng**: Thu hút sự chú ý của trẻ em
- **Emoji và Icon**: Làm cho việc học trở nên vui vẻ hơn
- **Hiệu ứng động**: Tạo sự tương tác hấp dẫn
- **Responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Thông báo khuyến khích**: Liên tục động viên và khen ngợi

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **"Không thể kết nối"**:
   - Kiểm tra kết nối internet
   - Xác minh API Key và Agent ID
   - Đảm bảo backend đang chạy (port 3001)

2. **"Microphone không hoạt động"**:
   - Cấp quyền microphone cho trình duyệt
   - Sử dụng HTTPS hoặc localhost
   - Thử trình duyệt khác (Chrome khuyến nghị)

3. **"Agent không phản hồi"**:
   - Kiểm tra Agent ID có đúng không
   - Xác minh Agent đã được kích hoạt
   - Kiểm tra quota API còn lại

### Trình duyệt được hỗ trợ:
- ✅ Chrome (khuyến nghị)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (không hỗ trợ)

## 🎓 Mẹo học tập hiệu quả

### Cho trẻ em:
- **Nói chậm và rõ ràng**: AI sẽ hiểu bạn tốt hơn
- **Không sợ sai**: Mắc lỗi là bình thường khi học
- **Thực hành hàng ngày**: 15-20 phút mỗi ngày
- **Thử tất cả chủ đề**: Mỗi chủ đề sẽ dạy từ vựng mới

### Cho giáo viên:
- **Chuẩn bị trước**: Xem qua từ vựng của từng chủ đề
- **Tạo nhóm học**: Cho trẻ học theo cặp hoặc nhóm nhỏ
- **Theo dõi tiến độ**: Ghi chú những từ vựng trẻ đã học
- **Mở rộng**: Sử dụng từ vựng đã học trong các hoạt động khác

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề:
1. Kiểm tra phần Troubleshooting ở trên
2. Xem logs trong Developer Console (F12)
3. Đảm bảo tất cả dependencies đã được cài đặt
4. Liên hệ hỗ trợ kỹ thuật

## 🔄 Phiên bản tương lai

- 🎵 Thêm bài hát tiếng Anh
- 🎮 Mini games tương tác
- 📊 Theo dõi tiến trình học tập
- 🏆 Hệ thống điểm và thành tích
- 🔊 Nhiều giọng nói AI khác nhau
- 📚 Thêm chủ đề học tập nâng cao

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🔧 Cấu hình môi trường (Environment Configuration)

### Tạo file .env

1. Sao chép file `env-example.txt` thành `.env`:
```bash
cp env-example.txt .env
```

2. Cập nhật các giá trị trong file `.env`:
```env
# ElevenLabs Configuration
ELEVENLABS_AGENT_ID=agent_01jydcakccesgstrkpemnj0a7n
ELEVENLABS_API_KEY=your_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Lấy thông tin ElevenLabs

1. **Agent ID**: Đã được cung cấp sẵn trong file `env-example.txt`
2. **API Key**: 
   - Đăng ký tại [ElevenLabs.io](https://elevenlabs.io)
   - Vào **Profile** → **API Keys**
   - Tạo API key mới và copy vào file `.env`

### Kiểm tra cấu hình

Sau khi cấu hình xong, bạn có thể kiểm tra bằng cách:

```bash
# Khởi động server
npm run dev

# Kiểm tra cấu hình qua API
curl http://localhost:3000/api/config
```

**Lưu ý**: File `.env` chứa thông tin nhạy cảm, không được commit lên Git. File này đã được thêm vào `.gitignore`.

---

**🌟 Chúc các bạn nhỏ học tiếng Anh vui vẻ và hiệu quả! 🌟** 