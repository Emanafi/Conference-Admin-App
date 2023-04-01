import User from '../models/User.js';
import { generateSort } from '../helpers/helper.js';

/**
 * Refine queries to take into account the only active admin users
 *   - this is to avoid pulling inactive/disabled users
 */ 

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json({ user });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}

export const getUsers = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
        const formattedSort = Boolean(sort) ? generateSort(sort) : {};

        const users = await User.find({
            $or: [
                { firstName: { $regex: new RegExp(search, 'i') }},
                { lastName: { $regex: new RegExp(search, 'i') }}
            ]
        })
        .sort(formattedSort)
        .skip(page * pageSize)
        .limit(pageSize);

        const totalDocuments = await User.countDocuments({
            $or: [
                { firstName: { $regex: new RegExp(search, 'i') }},
                { lastName: { $regex: new RegExp(search, 'i') }}
            ]
        })

        res.status(200).json({ users, totalDocuments });
    } catch(error) {
        res.status(404).json({ message: error })
    }
}