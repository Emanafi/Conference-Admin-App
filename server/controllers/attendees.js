import Attendee from '../models/Attendee.js';
import { generateSort } from '../helpers/helper.js';
/**
 * Refine queries to take into account the current year
 *   - this is to avoid pulling previous years attendees
 */ 

export const getAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        const attendee = await Attendee.findById(id);

        res.status(200).json({ attendee });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}

export const getAttendees = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
        const formattedSort = Boolean(sort) ? generateSort(sort) : {};

        const attendees = await Attendee.find({
            $or: [
                { firstName: { $regex: new RegExp(search, 'i') }},
                { lastName: { $regex: new RegExp(search, 'i') }}
            ]
        })
        .sort(formattedSort)
        .skip(page * pageSize)
        .limit(pageSize);

        const totalDocuments = await Attendee.countDocuments({
            $or: [
                { firstName: { $regex: new RegExp(search, 'i') }},
                { lastName: { $regex: new RegExp(search, 'i') }}
            ]
        })

        res.status(200).json({ attendees, totalDocuments });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}