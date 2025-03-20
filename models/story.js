const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    reel_url: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // يحدد تلقائيًا وقت الحذف بعد 24 ساعة
    }
}, { timestamps: true });

// ضبط TTL Index لحذف البيانات تلقائيًا بعد الوقت المحدد
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Story = mongoose.model('Story', StorySchema);

module.exports = { Story };