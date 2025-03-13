const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async () => {
    console.log('Connected to MongoDB');
  
    // حفظ عنصر في المخطط الذي سيتم حذفه بعد يوم
    const tempItem = new ExpiringModel({
      data: "سيتم حذفه بعد يوم",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // حذف بعد 24 ساعة
    });
  
    await tempItem.save();
  
  
    // حفظ عنصر في المخطط الدائم (لن يُحذف)
    const permanentItem = new PermanentModel({
      data: "لن يتم حذفه"
    });
  
    await permanentItem.save();
   
  
  }).catch(err => console.error(err));
