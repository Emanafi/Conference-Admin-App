import mongoose from 'mongoose';

const AttendeeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phoneNumber: String,
        country: String,
    },
    { timestamps: true }
)

const Attendee = mongoose.model('Attendee', AttendeeSchema);
export default Attendee;