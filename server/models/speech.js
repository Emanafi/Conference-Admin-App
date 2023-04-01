import mongoose from 'mongoose';

const SpeechSchema = new mongoose.Schema(
    {
        attendeeId: {
            type: String,
            required: true,
        },
        timeSlot: {
            type: Date,
            required: true,
        },
        conferenceId: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
            min: 5,
            max: 75,
        },
    },
    { timestamps: true }
)

const Speech = mongoose.model('Speech', SpeechSchema);
export default Speech;