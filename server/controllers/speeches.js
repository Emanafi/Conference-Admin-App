import Speech from '../models/speech.js';
import { generateSort } from '../helpers/helper.js';
/**
 * Refine queries to take into account the current year
 *   - this is to avoid pulling previous years speeches
 */ 

export const getSpeech = async (req, res) => {
    try {
        const { id } = req.params;
        const speech = await Speech.findById(id);

        res.status(200).json({ speech });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}

export const getSpeeches = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
        const formattedSort = Boolean(sort) ? generateSort(sort) : {};

        const speeches = await Speech.find({
            $or: [
                { topic: { $regex: new RegExp(search, 'i') }},
                { attendeeId: { $regex: search } }
            ]
        })
        .sort(formattedSort)
        .skip(page * pageSize)
        .limit(pageSize);

        const totalDocuments = await Speech.countDocuments({
            $or: [
                { topic: { $regex: new RegExp(search, 'i') }}
            ]
        })

        res.status(200).json({ speeches, totalDocuments });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}

export const updateSpeech = async (req, res) => {
      try {
        const { topic , timeSlot } = req.body;
        const { id } = req.params;

        const updatedSpeech = await Speech.findOneAndUpdate(
            {
                _id: id
            },
            { 
                topic: topic, 
                timeSlot: timeSlot 
            },
            { new: true }
        );

        res.status(200).json({ updatedSpeech })
    } catch(error) {
        res.status(404).json({ message: error })
    }
}