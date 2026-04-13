const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Endpoint للإحصائيات
app.get('/api/stats', (req, res) => {
    res.json({
        experience: 1,
        subscribers: 1250,
        projects: 50,
        rating: 100
    });
});

// API Endpoint للتواصل
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // هنا ممكن تضيف كود إرسال الإيميل أو حفظ في قاعدة بيانات
    console.log('New Contact:', { name, email, message });
    
    res.json({
        success: true,
        message: 'تم استلام رسالتك بنجاح!'
    });
});

// API Endpoint للطلبات
app.post('/api/order', (req, res) => {
    const { scriptType, customerName, customerPhone } = req.body;
    
    console.log('New Order:', { scriptType, customerName, customerPhone });
    
    res.json({
        success: true,
        message: 'تم استلام طلبك! هنتواصل معاك في أقرب وقت'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🤖 𝐔𝐆𝐈 𝐁𝐓 - 𝐉𝐎𝐇𝐀 Platform`);
});